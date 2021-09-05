var express = require("express");
var router = express.Router();

function switchFunction(functionName) {
  const connectDatabase = require("../public/javascripts/connectDatabase");

  switch (functionName) {
    case "departments":
      return connectDatabase.departments;
    case "courses":
      return connectDatabase.courses;
    case "offer":
      return connectDatabase.offer;
    case "students":
      return connectDatabase.students;

    case "studentsCount":
      return connectDatabase.studentsCount;
    case "studentsFind":
      return connectDatabase.studentsFind;
    case "coursesTitle":
      return connectDatabase.coursesTitle;
    case "coursesInfo":
      return connectDatabase.coursesInfo;
    case "popularCourse":
      return connectDatabase.popularCourse;
    case "enrolledStudentCount":
      return connectDatabase.enrolledStudentCount;
    case "studentEnrolledCourses":
      return connectDatabase.studentEnrolledCourses;

    case "addDepartment":
      return connectDatabase.addDepartment;
    case "addCourse":
      return connectDatabase.addCourse;
    case "addOffer":
      return connectDatabase.addOffer;
    case "addEnrolled":
      return connectDatabase.addEnrolled;
    case "addStudent":
      return connectDatabase.addStudent;

    case "updateDepartment":
      return connectDatabase.updateDepartment;
    case "updateCourses":
      return connectDatabase.updateCourses;
    case "updateOffer":
      return connectDatabase.updateOffer;
    case "updateStudent":
      return connectDatabase.updateStudent;

    case "deleteDepartment":
      return connectDatabase.deleteDepartment;
    case "deleteCourse":
      return connectDatabase.deleteCourse;
    case "deleteOffer":
      return connectDatabase.deleteOffer;
    case "deleteEnrolled":
      return connectDatabase.deleteEnrolled;
    case "deleteStudent":
      return connectDatabase.deleteStudent;

    default:
      return () => {
        Promise.resolve({
          params: req.params,
          query: req.query,
        });
      };
  }
}

/* GET home page. */
router.get("/:function", function (req, res, next) {
  const connectDatabase = require("../public/javascripts/connectDatabase");

  switchFunction(req.params.function)(req.query)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
  //   switch (req.params.function) {
  //     case 'departments':
  //       connectDatabase
  //         .departments(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'offer':
  //       connectDatabase
  //         .offer(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'studentCount':
  //       connectDatabase
  //         .studentsCount()
  //         .then((result) => {
  //           res.send({ result: result });
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'studentsFind':
  //       if (req.query.studentID) {
  //         connectDatabase
  //           .studentsFind(req.query.studentID)
  //           .then((result) => {
  //             res.send({ result: result });
  //           })
  //           .catch((error) => {
  //             res.send(error);
  //           });
  //       } else {
  //         res.send({ error: 'missing studentID' });
  //       }
  //       break;
  //     case 'coursesTitle':
  //       connectDatabase
  //         .coursesTitle(req.query)
  //         .then((result) => {
  //           res.send(result[0]);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'coursesInfo':
  //       connectDatabase
  //         .coursesInfo(req.query)
  //         .then((result) => {
  //           res.send(result[0]);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'popularCourse':
  //       connectDatabase
  //         .popularCourse(req.query)
  //         .then((result) => {
  //           res.send(result[0]);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'enrolledStudentCount':
  //       connectDatabase
  //         .enrolledStudentCount(req.query)
  //         .then((result) => {
  //           res.send(result[0]);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'studentEnrolledCourses':
  //       connectDatabase
  //         .studentEnrolledCourses(req.query)
  //         .then((result) => {
  //           res.send(result[0]);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'addDepartment':
  //       connectDatabase
  //         .addDepartment(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'addCourse':
  //       connectDatabase
  //         .addCourse(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'addOffer':
  //       connectDatabase
  //         .addOffer(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;
  //     case 'addEnrolled':
  //       connectDatabase
  //         .addEnrolled(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'updateDepartment':
  //       connectDatabase
  //         .updateDepartment(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'updateCourses':
  //       connectDatabase
  //         .updateCourses(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'updateOffer':
  //       connectDatabase
  //         .updateOffer(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'deleteDepartment':
  //       connectDatabase
  //         .deleteDepartment(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'deleteCourse':
  //       connectDatabase
  //         .deleteCourse(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'deleteOffer':
  //       connectDatabase
  //         .deleteOffer(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     case 'deleteEnrolled':
  //       connectDatabase
  //         .deleteEnrolled(req.query)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((error) => {
  //           res.send(error);
  //         });
  //       break;

  //     default:
  //       const result = {
  //         params: req.params,
  //         query: req.query,
  //       };
  //       res.send(result);
  //   }
});

module.exports = router;
