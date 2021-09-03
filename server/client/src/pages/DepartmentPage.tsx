import { useState } from "react";
import ResultTable from "../components/ResultTable";
import { getKey } from "../constant";
import { item, searchDepartment } from "../utils/API";

function DepartmentPage() {
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState<item[]>([]);
  const [deep, setDeep] = useState(false);
  const tableName = "Departments";

  function search() {
    searchDepartment({ departmentID, departmentName, location }).then(
      setResult,
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <>
      <br />
      Department ID
      <input
        value={departmentID}
        onChange={(evt) => {
          setDepartmentID(evt.target.value);
        }}
      />
      <br />
      Department Name
      <input
        value={departmentName}
        onChange={(evt) => {
          setDepartmentName(evt.target.value);
        }}
      />
      <br />
      Location
      <input
        value={location}
        onChange={(evt) => {
          setLocation(evt.target.value);
        }}
      />
      <br />
      Search Deep
      <input
        type="checkbox"
        checked={deep}
        onChange={(evt) => {
          setDeep(!deep);
        }}
      />
      <br />
      <button onClick={search}>search</button>
      <br />
      <ResultTable resultKey={getKey(tableName, deep)} result={result} deep />
    </>
  );
}

export default DepartmentPage;
