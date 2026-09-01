from fastapi import FastAPI

app = FastAPI(title="KITRO Product Dashboard")


@app.get("/health")
def health():
    return {"status": "ok"}
