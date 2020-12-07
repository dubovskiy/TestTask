import React, { useContext } from "react";
import { Context } from "./Context";

function EmployeesList({ letter }) {
  const { fullList } = useContext(Context);
  const getEmployeesList = (letter) => {
    const list = [];
    for (let item of fullList) {
      if (item.lastName[0].toUpperCase() === letter) {
        list.push(item);
      }
    }
    list.sort((a, b) => {
      const aItem = a.lastName.toLowerCase() + a.firstName.toLowerCase();
      const bItem = b.lastName.toLowerCase() + b.firstName.toLowerCase();
      return aItem.localeCompare(bItem);
    });

    return list;
  };

  const employeesList = getEmployeesList(letter);

  return (
    <div>
      {employeesList.length
        ? employeesList.map((employee) => (
            <Employee data={employee} key={employee.id} />
          ))
        : "----------"}
    </div>
  );
}

function Employee(props) {
  const { checkedIdsList, toggleEmployee } = useContext(Context);

  return (
    <label className="employee">
      {props.data.lastName} {props.data.firstName}
      <input
        type="checkbox"
        checked={checkedIdsList.indexOf(props.data.id) !== -1}
        onChange={() => toggleEmployee(props.data.id)}
      />
    </label>
  );
}

function EmployeesSection({ letter }) {
  return (
    <div className="employeesListItem">
      <h2>{letter}</h2>
      <EmployeesList letter={letter} />
    </div>
  );
}

function EmployeesBlocksList() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((letter) => <EmployeesSection letter={letter} key={letter} />);

  return (
    <div className="employeesList">
      <h1>Employees</h1>
      <div>{letters}</div>
    </div>
  );
}

export default EmployeesBlocksList;
