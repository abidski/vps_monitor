from fastapi import APIRouter

from database import db

router = APIRouter()


@router.get("/history")
async def get_history(hours: int = 24):
    result = await db.get_history(hours)
    assert result is not None
    return [
        {
            "time": row[0].isoformat(),
            "cpu": row[1],
            "mem": row[2],
            "disk": row[3],
            "temp": row[4],
        }
        for row in result
    ]
