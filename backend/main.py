from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


conn = sqlite3.connect(
    "employee.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS employees(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id TEXT,
    name TEXT,
    department TEXT,
    email TEXT
)
""")

conn.commit()

class Employee(BaseModel):
    emp_id: str
    name: str
    department: str
    email: str


@app.get("/")
def home():
    return {"message":"Server Running"}


@app.post("/employees")
def add_employee(emp: Employee):

    cursor.execute(
        """
        INSERT INTO employees
        (emp_id,name,department,email)
        VALUES(?,?,?,?)
        """,
        (
            emp.emp_id,
            emp.name,
            emp.department,
            emp.email
        )
    )

    conn.commit()

    return {"message":"Employee Added"}


@app.get("/employees")
def get_employees():

    cursor.execute("SELECT * FROM employees")

    rows = cursor.fetchall()

    employees = []

    for row in rows:
        employees.append({
            "id": row[0],
            "emp_id": row[1],
            "name": row[2],
            "department": row[3],
            "email": row[4]
        })

    return employees


@app.delete("/employees/{id}")
def delete_employee(id: int):

    cursor.execute(
        "DELETE FROM employees WHERE id=?",
        (id,)
    )

    conn.commit()

    return {"message":"Employee Deleted"}

