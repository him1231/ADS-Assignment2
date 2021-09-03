import { useState } from "react";
import {
  deleteDepartment as deleteDepartmentAPI,
  deleteCourse as deleteCourseAPI,
  deleteOffer as deleteOfferAPI,
  deleteEnrolled as deleteEnrolledAPI,
  deleteStudent as deleteStudentAPI,
} from "../utils/API";

function DeletePage() {
  const [departmentID, setDepartmentID] = useState("");
  const [deleteDepartmentMessage, setDeleteDepartmentMessage] = useState("");

  const [courseID, setCourseID] = useState("");
  const [deleteCourseMessage, setDeleteCourseMessage] = useState("");

  const [offerYear, setOfferYear] = useState("");
  const [deleteOfferMessage, setDeleteOfferMessage] = useState("");

  const [studentID, setStudentID] = useState("");
  const [deleteEnrolledMessage, setDeleteEnrolledMessage] = useState("");

  const [deleteStudentMessage, setDeleteStudentMessage] = useState("");

  function deleteDepartment() {
    setDeleteDepartmentMessage("");
    if (departmentID === "") {
      setDeleteDepartmentMessage("empty departmentID");
      return;
    }
    deleteDepartmentAPI({ departmentID }).then(
      (result) => {
        if (result.acknowledged) {
          setDeleteDepartmentMessage("success");
        } else {
          setDeleteDepartmentMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setDeleteDepartmentMessage(JSON.stringify(error));
      }
    );
  }

  function deleteCourse() {
    setDeleteCourseMessage("");
    if (departmentID === "" || courseID === "") {
      setDeleteCourseMessage(
        "empty" +
          (departmentID === "" ? " departmentID" : " ") +
          (courseID === "" ? " courseID" : " ")
      );
      return;
    }
    deleteCourseAPI({ courseID }).then(
      (result) => {
        if (result.acknowledged) {
          setDeleteCourseMessage("success");
        } else {
          setDeleteCourseMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setDeleteCourseMessage(JSON.stringify(error));
      }
    );
  }

  function deleteOffer() {
    setDeleteOfferMessage("");
    if (offerYear === "" || courseID === "") {
      setDeleteOfferMessage(
        "empty" +
          (courseID === "" ? " courseID" : " ") +
          (offerYear === "" ? " offerYear" : " ")
      );
      return;
    }
    deleteOfferAPI({ courseID, offerYear }).then(
      (result) => {
        if (result.acknowledged) {
          setDeleteOfferMessage("success");
        } else {
          setDeleteOfferMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setDeleteOfferMessage(JSON.stringify(error));
      }
    );
  }

  function deleteEnrolled() {
    setDeleteEnrolledMessage("");
    if (studentID === "" || offerYear === "" || courseID === "") {
      setDeleteEnrolledMessage(
        "empty" +
          (courseID === "" ? " courseID" : " ") +
          (offerYear === "" ? " offerYear" : " ") +
          (studentID === "" ? " studentID" : " ")
      );
      return;
    }
    deleteEnrolledAPI({ courseID, offerYear, studentID }).then(
      (result) => {
        if (result.acknowledged) {
          setDeleteEnrolledMessage("success");
        } else {
          setDeleteEnrolledMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setDeleteEnrolledMessage(JSON.stringify(error));
      }
    );
  }

  function deleteStudent() {
    setDeleteStudentMessage("");
    if (studentID === "") {
      setDeleteStudentMessage(
        "empty" + (studentID === "" ? " studentID" : " ")
      );
      return;
    }
    deleteStudentAPI({ studentID }).then(
      (result) => {
        if (result.acknowledged) {
          setDeleteStudentMessage("success");
        } else {
          setDeleteStudentMessage(JSON.stringify(result));
        }
      },
      (error) => {
        setDeleteStudentMessage(JSON.stringify(error));
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
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={deleteDepartment}>delete Department</button>
      <br /> {deleteDepartmentMessage}
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
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={deleteCourse}>delete Course</button>
      <br /> {deleteCourseMessage}
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
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={deleteOffer}>delete Offer</button>
      <br /> {deleteOfferMessage}
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
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={deleteEnrolled}>delete Enrol</button>
      <br /> {deleteEnrolledMessage}
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
          </tr>
        </tbody>
      </table>
      <br /> <button onClick={deleteStudent}>delete Student</button>
      <br /> {deleteStudentMessage}
      <br />
      <br />
      <br />
    </>
  );
}

export default DeletePage;
