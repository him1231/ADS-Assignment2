import { useState } from "react";
import ResultList from "../components/ResultList";
import { searchEnrolledStudentCount } from "../utils/API";

function EnrolledStudentCountPage() {
  const [departmentID, setDepartmentID] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<string[]>([]);

  function search() {
    searchEnrolledStudentCount({ departmentID, year }).then(
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

export default EnrolledStudentCountPage;
