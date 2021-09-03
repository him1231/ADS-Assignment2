import { useState } from "react";
import ResultTable from "../components/ResultTable";
import { getKey } from "../constant";
import { item, searchStudent } from "../utils/API";

function StudentPage() {
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [result, setResult] = useState<item[]>([]);
  const tableName = "Students";

  function search() {
    searchStudent({ studentID, studentName }).then(setResult, (error) => {
      console.log(error);
    });
  }

  return (
    <>
      <br />
      Student ID
      <input
        value={studentID}
        onChange={(evt) => {
          setStudentID(evt.target.value);
        }}
      />
      <br />
      student Name{" "}
      <input
        value={studentName}
        onChange={(evt) => {
          setStudentName(evt.target.value);
        }}
      />
      <br />
      <button onClick={search}>search</button>
      <br />
      <ResultTable resultKey={getKey(tableName)} result={result} deep />
    </>
  );
}

export default StudentPage;
