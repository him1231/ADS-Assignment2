var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:function', function (req, res, next) {
  const connectDatabase = require('../public/javascripts/connectDatabase');

  switch (req.params.function) {
    case 'departments':
      connectDatabase
        .departments(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'offer':
      connectDatabase
        .offer(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'studentCount':
      connectDatabase
        .studentsCount()
        .then((result) => {
          res.send({ result: result });
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'studentsFind':
      if (req.query.studentID) {
        connectDatabase
          .studentsFind(req.query.studentID)
          .then((result) => {
            res.send({ result: result });
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        res.send({ error: 'missing studentID' });
      }
      break;
    case 'coursesTitle':
      connectDatabase
        .coursesTitle(req.query)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'coursesInfo':
      connectDatabase
        .coursesInfo(req.query)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'popularCourse':
      connectDatabase
        .popularCourse(req.query)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'enrolledStudentCount':
      connectDatabase
        .enrolledStudentCount(req.query)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'studentEnrolledCourses':
      connectDatabase
        .studentEnrolledCourses(req.query)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'addDepartment':
      connectDatabase
        .addDepartment(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'addCourse':
      connectDatabase
        .addCourse(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'addOffer':
      connectDatabase
        .addOffer(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;
    case 'addEnrolled':
      connectDatabase
        .addEnrolled(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'updateDepartment':
      connectDatabase
        .updateDepartment(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'updateCourses':
      connectDatabase
        .updateCourses(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'updateOffer':
      connectDatabase
        .updateOffer(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'deleteDepartment':
      connectDatabase
        .deleteDepartment(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'deleteCourse':
      connectDatabase
        .deleteCourse(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'deleteOffer':
      connectDatabase
        .deleteOffer(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    case 'deleteEnrolled':
      connectDatabase
        .deleteEnrolled(req.query)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
      break;

    default:
      const result = {
        params: req.params,
        query: req.query,
      };
      res.send(result);
  }
});

// function switchFunction(functionName) {
//   const connectDatabase = require('../public/javascripts/connectDatabase');

//   switch (functionName) {
//     case 'updateCourses':
//       return connectDatabase.updateDepartment;
//   }
// }

// switchFunction('updateCourses')(req.query).then

module.exports = router;
