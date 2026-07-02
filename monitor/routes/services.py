import json
import subprocess

from fastapi import APIRouter

router = APIRouter()


@router.get("/services")
async def router_services():
    result = subprocess.run(
        ["systemctl", "list-units", "--type=service", "--all", "--output=json"],
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)
