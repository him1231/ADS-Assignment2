import { useState } from "react";
import ResultList from "../components/ResultList";
import { searchStudentEnrolledCourses } from "../utils/API";

function StudentEnrolledCoursesPage() {
  const [studentName, setStudentName] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<string[]>([]);

  function search() {
    searchStudentEnrolledCourses({ studentName, departmentID, year }).then(
      setResult,
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <>
      <br />
      Student Name
      <input
        value={studentName}
        onChange={(evt) => {
          setStudentName(evt.target.value);
        }}
      />
      <br />
      Department ID
      <input
        value={departmentID}
        onChange={(evt) => {
          setDepartmentID(evt.target.value);
        }}
      />
      <br />
      Year
      <input
        value={year}
        onChange={(evt) => {
          setYear(evt.target.value);
        }}
      />
      <br />
      <button onClick={search}>search</button>
      <br />
      <ResultList result={result} />
    </>
  );
}

export default StudentEnrolledCoursesPage;
