import asyncio
import os

import dotenv
import psycopg
import state
from psycopg import AsyncConnection

dotenv.load_dotenv()


class Database:
    def __init__(self):
        self._conn: AsyncConnection | None = None

    async def connect(self):

        self._conn = await psycopg.AsyncConnection.connect(
            dbname=os.getenv("DATABASE_NAME"),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            host=os.getenv("DATABASE_HOST"),
            port=os.getenv("DATABASE_PORT"),
            autocommit=True,
        )

    async def initialize(self):
        assert self._conn is not None
        try:
            async with self._conn.cursor() as cursor:
                await cursor.execute("""CREATE TABLE IF NOT EXISTS metrics (
                            id SERIAL PRIMARY KEY,
                            timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                            cpu FLOAT NOT NULL,
                            memory FLOAT NOT NULL,
                            disk FLOAT NOT NULL,
                            temperature FLOAT)
                                """)
                await cursor.execute("""CREATE INDEX IF NOT EXISTS idx_metrics_timestamp
                ON metrics(timestamp)""")

        except Exception as e:
            print(e, " :INITIALIZE")

    async def insert_metrics(self, cpu, memory, disk, temperature):

        assert self._conn is not None
        try:
            async with self._conn.cursor() as cursor:
                await cursor.execute(
                    """INSERT INTO metrics (cpu, memory, disk, temperature) 
                       VALUES (%s, %s, %s, %s)""",
                    (cpu, memory, disk, temperature),
                )

                # From Claude
                # delete anything older than 7 days
                await cursor.execute(
                    """DELETE FROM metrics
                       WHERE timestamp < NOW() - INTERVAL '7 days'"""
                )

        except Exception as e:
            print(e, " INSERT_METRICS")

    async def get_history(self, hours):
        assert self._conn is not None
        try:
            async with self._conn.cursor() as cursor:
                await cursor.execute(
                    """SELECT timestamp, cpu, memory, disk, temperature
                       FROM metrics
                       WHERE timestamp >= NOW() - make_interval(hours => %s)
                       ORDER BY timestamp ASC""",
                    (hours,),
                )

                result = await cursor.fetchall()
                return result

        except Exception as e:
            await self._conn.rollback()
            print(e, " GET_HISTORY")

    async def save_metrics(self):
        assert self._conn is not None

        try:
            while True:
                if state.latest_metrics is not None:
                    metrics = state.latest_metrics

                    await self.insert_metrics(
                        metrics["cpu"],
                        metrics["memory"],
                        metrics["disk"],
                        metrics["temp"],
                    )
                await asyncio.sleep(60)
        except Exception as e:
            print(e, " :SAVE_METRICS")

    @property
    def conn(self) -> psycopg.AsyncConnection:
        if self._conn is None:
            raise RuntimeError("Not connected — call connect() first")
        return self._conn

    async def disconnect(self):
        assert self._conn is not None
        await self._conn.close()


if __name__ == "__main__":
    db = Database()
    print(db.get_history(24))

db = Database()
