import "./App.css";
import React, { useEffect, useState } from "react";
import EmployeesBlocksList from "./EmployeesBlocksList";
import EmployeesBirthday from "./EmployeesBirthday";
import { Context } from "./Context";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const URL = "https://yalantis-react-school-api.yalantis.com/api/task0/users";

function requestFullList() {
  return fetch(URL)
    .then((result) => result.json())
    .catch((error) => {
      console.log("Fetch of employees failed: ", error);
    });
}

function requestCheckedIds() {
  return new Promise((resolve, reject) => {
    resolve(localStorage.employees ? JSON.parse(localStorage.employees) : []);
  });
}

function saveCheckedIds(checkedIdsList) {
  localStorage.employees = JSON.stringify(checkedIdsList);
}

function updateCheckedEmployees(fullList, checkedIdsList) {
  let checkedEmployeeList = {};
  fullList.forEach((employee) => {
    if (checkedIdsList.indexOf(employee.id) !== -1) {
      checkedEmployeeList = addCheckedEmployee(employee, checkedEmployeeList);
    }
  });
  return checkedEmployeeList;
}

const addCheckedEmployee = (employee, list) => {
  const monthId = new Date(employee.dob).getMonth();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][monthId];
  const checkedList = list;
  checkedList[month] = checkedList[month] || [];
  checkedList[month].push({ ...employee });
  checkedList[month].sort(
    (a, b) =>
      new Date(a.dob).setFullYear(2000) - new Date(b.dob).setFullYear(2000)
  );
  return checkedList;
};

function App() {
  const [fullList, setFullList] = useState([]);
  const [checkedIdsList, setCheckedIdsList] = useState([]);
  const [checkedEmployeeList, setCheckedEmployeeList] = useState({});

  function toggleEmployee(id) {
    if (checkedIdsList.indexOf(id) === -1) {
      setCheckedIdsList([...checkedIdsList, id]);
    } else {
      setCheckedIdsList([...checkedIdsList].filter((itemId) => itemId !== id));
    }
  }

  useEffect(() => {
    requestFullList().then((fullList) => {
      setFullList([...fullList]);
    });
    requestCheckedIds().then((checkedIdsList) => {
      setCheckedIdsList([...checkedIdsList]);
    });
  }, []);

  useEffect(() => {
    const checkedEmployeeList = updateCheckedEmployees(
      fullList,
      checkedIdsList
    );
    saveCheckedIds(checkedIdsList);
    setCheckedEmployeeList({ ...checkedEmployeeList });
  }, [fullList, checkedIdsList]);

  return (
    <Context.Provider
      value={{
        fullList,
        checkedIdsList,
        checkedEmployeeList,
        toggleEmployee,
      }}
    >
      <Router>
        <Switch>
          <Route path="/employees">
            <div className="App">
              <EmployeesBlocksList />
              <EmployeesBirthday />
            </div>
          </Route>
          <Route path="*">
            go to the <Link to="/employees">Employees Page</Link>
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
