import './App.css';
import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  const [emloyeeList, setEmployeeList] = useState([]);
  const [newSalary, setNewSalary] = useState(0);
  const [isPending, setPending] = useState(false);


  useEffect(() => {
    getEmployees();
  }, []);


  const getEmployees = () => {

    setPending(true);
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
      setPending(false)
    });
  }

  const updateEmployeeSalary = (id) => {
    axios.put("http://localhost:3001/update", { salary: newSalary, id: id }).then((response) => {
      getEmployees();
    })
  }
  function deleteEmployee(id) {
    axios.delete("http://localhost:3001/delete/" + id).then((response) => {
      getEmployees()
    });

  };

  //if(isPending) {
  //  return "Loading...";
  // }

  return (
    <div className="App">
      <div className="information">
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.elements);
          const el = e.target.elements;
          axios.post("http://localhost:3001/create", {
            name: el.name.value,
            age: el.age.value,
            country: el.country.value,
            position: el.position.value,
            salary: el.salary.value,
          })
            .then(() => { getEmployees() })

        }}>
          <label>Name:</label>
          <input type="text" name="name" />
          <label>Age:</label>
          <input type="number" name="age" />
          <label>Position:</label>
          <input type="text" name="position" />
          <label>Country:</label>
          <input type="text" name="country" />
          <label>Salary (year):</label>
          <input type="number" name="salary" />
          <button type="submit">Add Employee</button>
        </form>



      </div>

      <div className="Emp">
        <button onClick={getEmployees}> Show Employee</button>
        {emloyeeList.map((employee) => {

          return <div key={employee.id} className="employee"> <div>
            <h3>name: {employee.name} </h3>
            <h3>age:{employee.age} </h3>
            <h3>position:{employee.position} </h3>
            <h3>country:{employee.country} </h3>
            <h3>salary:{employee.salary} </h3>
          </div>
            <div>
              <div className="delete">
                <button onClick={
                  function () {
                    // closure

                    deleteEmployee(employee.id);
                  }
                }>
                  DELETE
                </button>


              </div>
              <input
                type="text"
                placeholder="2000..."
                onChange={(event) => {
                  setNewSalary(event.target.value)
                }}
              />
              <button onClick={() => { updateEmployeeSalary(employee.id) }} > Update</button>
              {isPending ? 
                  <button>LOADING</button> : null }
            </div>
          </div>
        })}

      </div>

    </div>

  );
}

export default App;
