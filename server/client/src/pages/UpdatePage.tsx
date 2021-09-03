import { useState } from "react";
import {
  updateDepartment as updateDepartmentAPI,
  updateCourse as updateCourseAPI,
  updateOffer as updateOfferAPI,
  updateStudent as updateStudentAPI,
} from "../utils/API";

function UpdatePage() {
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [updateDepartmentMessage, setUpdateDepartmentMessage] = useState("");

  const [courseID, setCourseID] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [updateCourseMessage, setUpdateCourseMessage] = useState("");

  const [offerYear, setOfferYear] = useState("");
  const [classSize, setClassSize] = useState("");
  const [updateOfferMessage, setUpdateOfferMessage] = useState("");

  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [DOB, setDOB] = useState("");
  const [updateStudentMessage, setUpdateStudentMessage] = useState("");

  function updateDepartment() {
    setUpdateDepartmentMessage("");
    if (departmentID === "") {
      setUpdateDepartmentMessage("empty departmentID");
      return;
    }
    updateDepartmentAPI({ departmentID, departmentName, location }).then(
      (result) => {
        if (result.acknowledged) {
          setUpdateDepartmentMessage("success");
        } else {
          setUpdateDepartmentMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setUpdateDepartmentMessage(JSON.stringify(error));
      }
    );
  }

  function updateCourse() {
    setUpdateCourseMessage("");
    if (departmentID === "" || courseID === "") {
      setUpdateCourseMessage(
        "empty" +
          (departmentID === "" ? " departmentID" : " ") +
          (courseID === "" ? " courseID" : " ")
      );
      return;
    }
    updateCourseAPI({ courseID, title, level }).then(
      (result) => {
        if (result.acknowledged) {
          setUpdateCourseMessage("success");
        } else {
          setUpdateCourseMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setUpdateCourseMessage(JSON.stringify(error));
      }
    );
  }

  function updateOffer() {
    setUpdateOfferMessage("");
    if (offerYear === "" || courseID === "") {
      setUpdateOfferMessage(
        "empty" +
          (courseID === "" ? " courseID" : " ") +
          (offerYear === "" ? " offerYear" : " ")
      );
      return;
    }
    updateOfferAPI({ courseID, offerYear, classSize }).then(
      (result) => {
        if (result.acknowledged) {
          setUpdateOfferMessage("success");
        } else {
          setUpdateOfferMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setUpdateOfferMessage(JSON.stringify(error));
      }
    );
  }

  function updateStudent() {
    setUpdateStudentMessage("");
    if (studentID === "") {
      setUpdateStudentMessage(
        "empty" + (studentID === "" ? " studentID" : " ")
      );
      return;
    }
    updateStudentAPI({ studentID, studentName, DOB }).then(
      (result) => {
        if (result.acknowledged) {
          setUpdateStudentMessage("success");
        } else {
          setUpdateStudentMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setUpdateStudentMessage(JSON.stringify(error));
      }
    );
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
        </tbody>
      </table>
      <br /> <button onClick={updateDepartment}>update Department</button>
      <br /> {updateDepartmentMessage}
      <br />
      <table>
        <tbody>
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
              Course title
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
        </tbody>
      </table>
      <br /> <button onClick={updateCourse}>update Course</button>
      <br /> {updateCourseMessage}
      <br />
      <table>
        <tbody>
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
              Offer Year
              <input
                value={offerYear}
                onChange={(evt) => {
                  setOfferYear(evt.target.value);
                }}
              />
            </td>
            <td>
              Class Size
              <input
                value={classSize}
                onChange={(evt) => {
                  setClassSize(evt.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={updateOffer}>update Offer</button>
      <br /> {updateOfferMessage}
      <br />
      <table>
        <tbody>
          <tr>
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
              Student Name
              <input
                value={studentName}
                onChange={(evt) => {
                  setStudentName(evt.target.value);
                }}
              />
            </td>
            <td>
              Date of Birth
              <input
                type="date"
                value={DOB}
                onChange={(evt) => {
                  setDOB(evt.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={updateStudent}>update Student</button>
      <br /> {updateStudentMessage}
      <br />
      <br />
      <br />
    </>
  );
}

export default UpdatePage;
