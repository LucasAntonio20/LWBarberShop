from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ['http://127.0.0.1:5500']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Schedule(BaseModel):
    id: Optional[str]
    customer: str
    date: str


schedules: List[Schedule] = []


@app.get('/schedules')
def list_schedules():
    return schedules


@app.get('/schedules/')
def list_schedules_date(schedule_date: str):
    schedules_in_day = []
    for schedule in schedules:
        if schedule.date == schedule_date:
            schedules_in_day.append(schedule)
    return schedules_in_day


@app.post('/schedules')
def create_schedule(schedule: Schedule):
    schedule.id = str(uuid4())
    schedules.append(schedule)
    return None


@app.delete("/schedules/{schedule_id}")
def delete_schedule(schedule_id: str):
    for index, a in enumerate(schedules):
        if a.id == schedule_id:
            del schedules[index]
            return {"message": "Agendamento excluído com sucesso"}
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")
