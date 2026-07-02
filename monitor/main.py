import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import state
from database import db
from routes.history import router as history_router
from routes.metrics import router as metrics_router
from routes.services import router as services_router
from stats import get_stats


async def collect_metrics():

    while True:
        try:
            data = await asyncio.to_thread(get_stats)
            state.latest_metrics = data
        except Exception as e:
            print("error in colect_metrics", e)
        await asyncio.sleep(1)


@asynccontextmanager
async def lifespan(app: FastAPI):

    await db.connect()
    await db.initialize()

    metrics_task = asyncio.create_task(collect_metrics())
    database_task = asyncio.create_task(db.save_metrics())

    try:
        yield

    finally:
        metrics_task.cancel()
        database_task.cancel()
        await asyncio.gather(metrics_task, database_task, return_exceptions=True)
        await db.disconnect()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router, prefix="/api")
app.include_router(metrics_router, prefix="/api")
app.include_router(services_router, prefix="/api")
