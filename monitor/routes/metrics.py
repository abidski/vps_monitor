import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

import state

router = APIRouter()


@router.websocket("/ws")
async def socket_endpoint(socket: WebSocket):
    await socket.accept()
    try:
        while True:
            if state.latest_metrics:
                await socket.send_json(state.latest_metrics)
            await asyncio.sleep(1)

    except WebSocketDisconnect:
        print("socket disconnect")
    except Exception as e:
        print("websocket error:", e)
