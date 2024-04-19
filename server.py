from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app = FastAPI()
app.mount("/resource", StaticFiles(directory="resource"), name="resource")


@app.get("/")
def read_root():
    return FileResponse("index.html", media_type="text/html")


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", reload=True)

