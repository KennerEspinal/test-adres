from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="API de Asquisitions",
    description="API to register acquisitions of goods and services",
    version="0.1"
)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Acquisition(BaseModel):
    id: int
    presupuesto: float
    unidad: str
    tipoBienServicio: str
    cantidad: int
    valorUnitario: float
    valorTotal: float
    fechaAdquisicion: str
    proveedor: str
    documentacion: str
    estado: str = "activo"

acquisitions_data = []
acquisition_id_counter = 1

@app.post("/acquisitions", response_model=Acquisition, tags=["acquisitions"])
def create_acquisition(acquisition: Acquisition):
    global acquisition_id_counter
    acquisition.id = acquisition_id_counter
    acquisitions_data.append(acquisition)
    acquisition_id_counter += 1
    return acquisition

@app.get("/acquisitions", response_model=List[Acquisition], tags=["acquisitions"])
def get_acquisitions():
    return acquisitions_data

@app.get("/acquisitions/{id}", response_model=Acquisition, tags=["acquisitions"])
def get_acquisition(id: int):
    for acquisition in acquisitions_data:
        if acquisition.id == id:
            return acquisition
    raise HTTPException(status_code=404, detail="Acquisition not found")

@app.put("/acquisitions/{id}", response_model=Acquisition, tags=["acquisitions"])
def update_acquisition(id: int, updated_acquisition: Acquisition):
    for index, acquisition in enumerate(acquisitions_data):
        if acquisition.id == id:
            if updated_acquisition.id != id:
                raise HTTPException(status_code=400, detail="ID cannot be modified")
            acquisitions_data[index] = updated_acquisition
            return updated_acquisition
    raise HTTPException(status_code=404, detail="Acquisition not found")

@app.delete("/acquisitions/{id}", tags=["acquisitions"])
def delete_acquisition(id: int):
    for index, acquisition in enumerate(acquisitions_data):
        if acquisition.id == id:
            acquisition.estado = "inactivo"
            acquisitions_data[index] = acquisition
            return {"message": "Acquisition deleted successfully"}
    raise HTTPException(status_code=404, detail="Acquisition not found")
