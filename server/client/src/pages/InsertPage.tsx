import { useState } from "react";
import {
  addDepartment,
  addCourse,
  addOffer,
  addEnrolled,
  addStudent,
} from "../utils/API";

function InsertPage() {
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [insertDepartmentMessage, setInsertDepartmentMessage] = useState("");

  const [courseID, setCourseID] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [insertCourseMessage, setInsertCourseMessage] = useState("");

  const [offerYear, setOfferYear] = useState("");
  const [classSize, setClassSize] = useState("");
  const [insertOfferMessage, setInsertOfferMessage] = useState("");

  const [studentID, setStudentID] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [insertEnrolledMessage, setInsertEnrolledMessage] = useState("");

  const [studentName, setStudentName] = useState("");
  const [DOB, setDOB] = useState("");
  const [insertStudentMessage, setInsertStudentMessage] = useState("");

  function insertDepartment() {
    setInsertDepartmentMessage("");
    if (departmentID === "") {
      setInsertDepartmentMessage("empty departmentID");
      return;
    }
    addDepartment({ departmentID, departmentName, location }).then(
      (result) => {
        if (result.acknowledged) {
          setInsertDepartmentMessage("success");
        } else {
          setInsertDepartmentMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setInsertDepartmentMessage(JSON.stringify(error));
      }
    );
  }

  function insertCourse() {
    setInsertCourseMessage("");
    if (departmentID === "" || courseID === "") {
      setInsertCourseMessage(
        "empty" +
          (departmentID === "" ? " departmentID" : " ") +
          (courseID === "" ? " courseID" : " ")
      );
      return;
    }
    addCourse({ departmentID, courseID, title, level }).then(
      (result) => {
        if (result.acknowledged) {
          setInsertCourseMessage("success");
        } else {
          setInsertCourseMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setInsertCourseMessage(JSON.stringify(error));
      }
    );
  }

  function insertOffer() {
    setInsertOfferMessage("");
    if (offerYear === "" || courseID === "") {
      setInsertOfferMessage(
        "empty" +
          (courseID === "" ? " courseID" : " ") +
          (offerYear === "" ? " offerYear" : " ")
      );
      return;
    }
    addOffer({ courseID, offerYear, classSize }).then(
      (result) => {
        if (result.acknowledged) {
          setInsertOfferMessage("success");
        } else {
          setInsertOfferMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setInsertOfferMessage(JSON.stringify(error));
      }
    );
  }

  function insertEnrolled() {
    setInsertEnrolledMessage("");
    if (studentID === "" || offerYear === "" || courseID === "") {
      setInsertEnrolledMessage(
        "empty" +
          (courseID === "" ? " courseID" : " ") +
          (offerYear === "" ? " offerYear" : " ") +
          (studentID === "" ? " studentID" : " ")
      );
      return;
    }
    addEnrolled({ courseID, offerYear, studentID, studentYear }).then(
      (result) => {
        if (result.acknowledged) {
          setInsertEnrolledMessage("success");
        } else {
          setInsertEnrolledMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setInsertEnrolledMessage(JSON.stringify(error));
      }
    );
  }

  function insertStudent() {
    setInsertStudentMessage("");
    if (studentID === "") {
      setInsertStudentMessage(
        "empty" + (studentID === "" ? " studentID" : " ")
      );
      return;
    }
    addStudent({ studentID, studentName, DOB }).then(
      (result) => {
        if (result.acknowledged) {
          setInsertStudentMessage("success");
        } else {
          setInsertStudentMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setInsertStudentMessage(JSON.stringify(error));
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
      <br /> <button onClick={insertDepartment}>insert Department</button>
      <br /> {insertDepartmentMessage}
      <br />
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
      <br /> <button onClick={insertCourse}>insert Course</button>
      <br /> {insertCourseMessage}
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
      <br /> <button onClick={insertOffer}>insert Offer</button>
      <br /> {insertOfferMessage}
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
              studentID
              <input
                value={studentID}
                onChange={(evt) => {
                  setStudentID(evt.target.value);
                }}
              />
            </td>
            <td>
              studentYear
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
      <br /> <button onClick={insertEnrolled}>insert Enrol</button>
      <br /> {insertEnrolledMessage}
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
      <br /> <button onClick={insertStudent}>insert Student</button>
      <br /> {insertStudentMessage}
      <br />
      <br />
      <br />
    </>
  );
}

export default InsertPage;
