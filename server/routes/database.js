var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:function', function (req, res, next) {
  const connectDatabase = require('../public/javascripts/connectDatabase');

  switch (req.params.function) {
    case 'studentCount':
      connectDatabase.studentsCount().then((result) => {
        res.send({ result: result });
      });
      break;
    case 'studentsFind':
      if (req.query.studentID) {
        connectDatabase.studentsFind(req.query.studentID).then((result) => {
          res.send({ result: result });
        });
      } else {
        res.send({ error: 'missing studentID' });
      }
      break;
    case 'coursesTitle':
      connectDatabase.coursesTitle(req.query).then((result) => {
        res.send(result[0]);
      });
      break;
    case 'coursesInfo':
      connectDatabase.coursesInfo(req.query).then((result) => {
        res.send(result[0]);
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

module.exports = router;
