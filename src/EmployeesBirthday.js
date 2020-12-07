import React, { useContext } from "react";
import { Context } from "./Context";
const listMonthes = [
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
];

function EmployeesBirthdayList({ employees }) {
  return (
    <ul>
      {employees.map((employee) => (
        <Employee data={employee} key={employee.id} />
      ))}
    </ul>
  );
}

function showDob(dob) {
  const date = new Date(dob);
  return `${date.getDate()} ${
    listMonthes[date.getMonth()]
  } ${date.getFullYear()} year`;
}

function Employee(props) {
  return (
    <li className="birthRecord">
      {props.data.lastName} {props.data.firstName} - {showDob(props.data.dob)}
    </li>
  );
}

function MonthSection({ month, employees }) {
  return (
    <div className="birthdayMonth">
      <h4>{month}</h4>
      <div>
        <EmployeesBirthdayList month={month} employees={employees} />
      </div>
    </div>
  );
}

function EmployeesBirthday() {
  const { checkedEmployeeList } = useContext(Context);
  const listUsedMonthes = listMonthes.filter(
    (month) => checkedEmployeeList[month]
  );
  const listByMonthes = listUsedMonthes.map((month) => (
    <MonthSection
      month={month}
      key={month}
      employees={checkedEmployeeList[month]}
    />
  ));

  return (
    <div className="employeesBirth">
      <h2> Employees birthday </h2>
      <div>
        {listUsedMonthes.length ? (
          listByMonthes
        ) : (
          <div className="noEmployee">'No selected employees'</div>
        )}
      </div>
    </div>
  );
}

export default EmployeesBirthday;
