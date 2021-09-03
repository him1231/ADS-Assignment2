import { useState } from "react";
import ResultTable from "../components/ResultTable";
import { getKey } from "../constant";
import { item, searchOffer } from "../utils/API";

function OfferPage() {
  const [departmentID, setDepartmentID] = useState("");
  const [courseID, setCourseID] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<item[]>([]);
  const [deep, setDeep] = useState(false);
  const tableName = "Offer";

  function resultKey() {
    return ["DeptID", "CourseID"].concat(getKey(tableName, deep));
  }

  function search() {
    searchOffer({ departmentID, courseID, year }).then(setResult, (error) => {
      console.log(error);
    });
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
      Course ID
      <input
        value={courseID}
        onChange={(evt) => {
          setCourseID(evt.target.value);
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
      <ResultTable resultKey={resultKey()} result={result} deep />
    </>
  );
}

export default OfferPage;
