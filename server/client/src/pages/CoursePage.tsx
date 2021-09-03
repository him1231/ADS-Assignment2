import { useState } from "react";
import ResultTable from "../components/ResultTable";
import { getKey } from "../constant";
import { item, searchCourse } from "../utils/API";

function CoursePage() {
  const [courseID, setCourseID] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [result, setResult] = useState<item[]>([]);
  const [deep, setDeep] = useState(false);
  const tableName = "Courses";

  function search() {
    searchCourse({ courseID, title, level }).then(setResult, (error) => {
      console.log(error);
    });
  }

  return (
    <>
      <br />
      Course ID
      <input
        value={courseID}
        onChange={(evt) => {
          setCourseID(evt.target.value);
        }}
      />
      <br />
      Title
      <input
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value);
        }}
      />
      <br />
      Level
      <input
        value={level}
        onChange={(evt) => {
          setLevel(evt.target.value);
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

export default CoursePage;
