from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from k8s_parser import get_gateway_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puoi specificare l'URL del frontend, come "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aggiungi questa variabile globale all'inizio del file
last_modified = None


@app.get("/map")
def get_map():
    global last_modified
    current_data = get_gateway_routes()
    # Genera un hash dei dati per verificare modifiche
    import hashlib
    data_hash = hashlib.md5(str(current_data).encode()).hexdigest()

    if last_modified != data_hash:
        last_modified = data_hash
        return {"data": current_data, "modified": True}
    return {"data": current_data, "modified": False}
