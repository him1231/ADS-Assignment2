// import React from 'react';
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DepartmentPage from "./pages/DepartmentPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import OfferPage from "./pages/OfferPage";
import AllPage from "./pages/AllPage";
import CoursesTitlePage from "./pages/CoursesTitlePage";
import CoursesInfoPage from "./pages/CoursesInfoPage";
import PopularCoursePage from "./pages/PopularCoursePage";
import EnrolledStudentCountPage from "./pages/EnrolledStudentCountPage";
import StudentEnrolledCoursesPage from "./pages/StudentEnrolledCoursesPage";
import StudentPage from "./pages/StudentPage";
import InsertPage from "./pages/InsertPage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/All">All</Link>
            </li>
            <li>
              <Link to="/Department">Department</Link>
            </li>
            <li>
              <Link to="/Course">Course</Link>
            </li>
            <li>
              <Link to="/Offer">Offer</Link>
            </li>
            <li>
              <Link to="/Student">Student</Link>
            </li>
            <li>
              <Link to="/CoursesTitle">CoursesTitle</Link>
            </li>
            <li>
              <Link to="/CoursesInfo">CoursesInfo</Link>
            </li>
            <li>
              <Link to="/PopularCourse">PopularCourse</Link>
            </li>
            <li>
              <Link to="/EnrolledStudentCount">EnrolledStudentCount</Link>
            </li>
            <li>
              <Link to="/StudentEnrolledCourses">StudentEnrolledCourses</Link>
            </li>
            <li>
              <Link to="/Insert">Insert</Link>
            </li>
            <li>
              <Link to="/Update">Update</Link>
            </li>
            <li>
              <Link to="/Delete">Delete</Link>
            </li>
          </ul>
        </nav>

        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/All">
                <AllPage />
              </Route>
              <Route path="/Department">
                <DepartmentPage />
              </Route>
              <Route path="/Course">
                <CoursePage />
              </Route>
              <Route path="/Offer">
                <OfferPage />
              </Route>
              <Route path="/Student">
                <StudentPage />
              </Route>
              <Route path="/CoursesTitle">
                <CoursesTitlePage />
              </Route>
              <Route path="/CoursesInfo">
                <CoursesInfoPage />
              </Route>
              <Route path="/PopularCourse">
                <PopularCoursePage />
              </Route>
              <Route path="/EnrolledStudentCount">
                <EnrolledStudentCountPage />
              </Route>
              <Route path="/StudentEnrolledCourses">
                <StudentEnrolledCoursesPage />
              </Route>
              <Route path="/Insert">
                <InsertPage />
              </Route>
              <Route path="/Update">
                <UpdatePage />
              </Route>
              <Route path="/Delete">
                <DeletePage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
