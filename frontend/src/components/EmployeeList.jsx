import {useEffect,useState} from "react";
import api from "../api";

function EmployeeList(){

  const [employees,setEmployees]=useState([]);

  const [empId,setEmpId]=useState("");
  const [name,setName]=useState("");
  const [department,setDepartment]=useState("");
  const [email,setEmail]=useState("");

  const loadEmployees = async()=>{

    const response =
    await api.get("/employees");

    setEmployees(response.data);
  };

  useEffect(()=>{
    loadEmployees();
  },[]);

  const addEmployee = async()=>{

    await api.post("/employees",{
      emp_id: empId,
      name: name,
      department: department,
      email: email
    });

    loadEmployees();

    setEmpId("");
    setName("");
    setDepartment("");
    setEmail("");
  };

  const deleteEmployee = async(id)=>{

    await api.delete(`/employees/${id}`);

    loadEmployees();
  };

  return(

    <div class="container">

      <h2>Employee Management</h2>

      <div class="form-section">
        <input
      placeholder="Employee ID"
      value={empId}
      onChange={(e)=>setEmpId(e.target.value)}
      />

      <input
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      placeholder="Department"
      value={department}
      onChange={(e)=>setDepartment(e.target.value)}
      />

      <input
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />

      <button onClick={addEmployee}>
        Add
      </button>

      </div>

      

      <hr/>
      <br/>


      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

        {
          employees.map((emp)=>(
            <tr key={emp.id}>
              <td>{emp.emp_id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>

              <td>
                <button
                onClick={()=>
                  deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeList;