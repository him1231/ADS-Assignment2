import { useState } from "react";
import ResultTable from "../components/ResultTable";
import { getKey } from "../constant";
import { item, searchDepartment } from "../utils/API";

function AllPage() {
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");

  const [courseID, setCourseID] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");

  const [offerYear, setOfferYear] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentYear, setStudentYear] = useState("");

  const [result, setResult] = useState<item[]>([]);
  const tableName = "Departments";

  function search() {
    searchDepartment({
      departmentID,
      departmentName,
      location,
      courseID,
      title,
      level,
      offerYear,
      studentID,
      studentYear,
    }).then(setResult, (error) => {
      console.log(error);
    });
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              Department ID
              <input
                value={departmentID}
                onChange={(evt) => {
                  setDepartmentID(evt.target.value);
                }}
              />
            </td>
            <td>
              Department Name
              <input
                value={departmentName}
                onChange={(evt) => {
                  setDepartmentName(evt.target.value);
                }}
              />
            </td>
            <td>
              Location
              <input
                value={location}
                onChange={(evt) => {
                  setLocation(evt.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Course ID
              <input
                value={courseID}
                onChange={(evt) => {
                  setCourseID(evt.target.value);
                }}
              />
            </td>
            <td>
              Course Title
              <input
                value={title}
                onChange={(evt) => {
                  setTitle(evt.target.value);
                }}
              />
            </td>
            <td>
              Level
              <input
                value={level}
                onChange={(evt) => {
                  setLevel(evt.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Offer Year
              <input
                value={offerYear}
                onChange={(evt) => {
                  setOfferYear(evt.target.value);
                }}
              />
            </td>
            <td>
              Student ID
              <input
                value={studentID}
                onChange={(evt) => {
                  setStudentID(evt.target.value);
                }}
              />
            </td>
            <td>
              Student Year
              <input
                value={studentYear}
                onChange={(evt) => {
                  setStudentYear(evt.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Search Deep
      <input
        type="checkbox"
        checked={deep}
        onChange={(evt) => {
          setDeep(!deep);
        }}
      /> */}
      <br />
      <button onClick={search}>search</button>
      <br />
      <ResultTable resultKey={getKey(tableName, true)} result={result} deep />
    </>
  );
}

export default AllPage;
