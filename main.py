from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from pymongo import MongoClient

# client = MongoClient('localhost', 27017)
#이거로 커넥션 맺음
client = MongoClient("mongodb://localhost:27017/")

db = client['memo-db'] # memo-db라는 이름의 데이터베이스에 접속

print(client.list_database_names()) 

class Memo(BaseModel):
    id: str
    content: str
    
memos=[]
    
app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return 'successfully done'

@app.get("/memos")
def read_memo():
    return memos
    
    
@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content=req_memo.content
            return 'success'
    return 'nothing like that'


@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index,memo in enumerate(memos):
        if memo.id == memo_id:
            memos.pop(index)
            return 'success'
    return 'nothing like that'

app.mount("/", StaticFiles(directory='static', html=True), name='static')
