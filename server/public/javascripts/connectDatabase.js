const { MongoClient } = require('mongodb');
const userName = 'tszhimmak';
const password = 'him412573986';
const databaseName = 'cluster0';
const uri = `mongodb+srv://${userName}:${password}@cluster0.dt8ox.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//query

function departments({ departmentID, departmentName, location }) {
  const match = {};
  if (departmentID) match['DeptID'] = departmentID;
  if (departmentName) match['DeptName'] = departmentName;
  if (location) match['Location'] = location;

  const query = [{ $match: matchQuery(match) }];
  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function offer({ departmentID, courseID, year }) {
  const match = {};
  if (departmentID) match['DeptID'] = departmentID;
  if (courseID) match['Courses.CourseID'] = courseID;
  if (year) match['Courses.Offer.Year'] = Number(year);

  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    { $match: matchQuery(match) },
    {
      $project: {
        _id: departmentID
          ? `${departmentID}`
          : '' + courseID
          ? ` ${courseID}`
          : '' + year
          ? ` ${year} `
          : '',
        Year: '$Courses.Offer.Year',
        ClassSize: '$Courses.Offer.ClassSize',
        AvailablePlaces: '$Courses.Offer.AvailablePlaces',
        Enrolled: '$Courses.Offer.Enrolled',
      },
    },
  ];
  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function studentsCount() {
  return client.connect().then((MongoClient) => {
    return MongoClient.db('ADS-Assignment2-DB1').collection('Students').count();
  });
}

function studentsFind(StudentID) {
  const query = { StudentID: StudentID };
  return client.connect().then((MongoClient) => {
    return MongoClient.db('ADS-Assignment2-DB1')
      .collection('Students')
      .find(query)
      .toArray();
  });
}

function coursesTitle({ departmentID, year }) {
  const match = {};
  if (departmentID) match['DeptID'] = departmentID;
  if (year) match['Courses.Offer.Year'] = Number(year);

  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    {
      $match: matchQuery(match),
    },
    { $project: { result: '$Courses.Title' } },
    {
      $group: {
        _id:
          `courses title` +
          (departmentID ? ` offered by ${departmentID}` : '') +
          (year ? ` in ${year}` : ''),
        result: { $addToSet: '$result' },
      },
    },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function coursesInfo({ departmentID, year, courseID = undefined }) {
  const match = {};
  if (departmentID) match['DeptID'] = departmentID;
  if (year) match['Courses.Offer.Year'] = Number(year);
  if (courseID) match['Courses.CourseID'] = courseID;

  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    {
      $match: matchQuery(match),
    },
    { $project: { result: '$Courses' } },
    {
      $group: {
        _id:
          `courses info` +
          (departmentID ? ` offered by ${departmentID}` : '') +
          (year ? ` in ${year}` : ''),
        result: { $addToSet: '$result' },
      },
    },
    { $unset: 'result.Offer' },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function popularCourse() {
  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    {
      $project: {
        Course: '$Courses',
        count: { $size: '$Courses.Offer.Enrolled' },
      },
    },
    { $unset: 'Course.Offer' },
    { $group: { _id: '$Course', count: { $sum: '$count' } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 'Find the information of the course which is the most popular course enrolled by students.',
        result: {
          CourseID: '$_id.CourseID',
          Title: '$_id.Title',
          Level: '$_id.Level',
          Accumulate: '$count',
        },
      },
    },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function enrolledStudentCount({
  departmentID = undefined,
  courseID = undefined,
  year = undefined,
}) {
  const match = {};
  if (departmentID) match['DeptID'] = departmentID;
  if (courseID) match['Courses.CourseID'] = courseID;
  if (year) match['Courses.Offer.Year'] = Number(year);

  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    { $match: matchQuery(match) },
    {
      $project: {
        result: {
          CourseID: '$Courses.CourseID',
          count: { $size: '$Courses.Offer.Enrolled' },
        },
      },
    },
    {
      $group: {
        _id:
          'List the numbers of students for each course, who have enrolled the course' +
          (departmentID ? ` offered by ${departmentID}` : '') +
          (year ? ` in ${year}` : ''),
        result: { $addToSet: '$result' },
      },
    },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function studentEnrolledCourses({ studentName, departmentID, year }) {
  const match = {};
  if (studentName) match['Students.StuName'] = studentName;
  if (departmentID) match['DeptID'] = departmentID;
  if (year) match['Courses.Offer.Year'] = Number(year);

  const query = [
    { $unwind: '$Courses' },
    {
      $lookup: {
        from: 'Students',
        localField: 'Courses.Offer.Enrolled.StudentID',
        foreignField: 'StudentID',
        as: 'Students',
      },
    },
    { $match: matchQuery(match) },
    { $project: { result: '$Courses.CourseID' } },
    {
      $group: {
        _id:
          `List the courses` +
          (departmentID ? ` offered by the ${departmentID} department` : '') +
          (studentName ? ` that the student ${studentName} has enrolled` : '') +
          (year ? ` in ${year}.` : ''),
        result: { $addToSet: '$result' },
      },
    },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function coursesAvailablePlaces({ year, courseID }) {
  const match = {};
  if (year) match['Courses.Offer.Year'] = Number(year);
  if (courseID) match['Courses.CourseID'] = courseID;

  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    {
      $match: matchQuery(match),
    },
    { $project: { result: '$Courses.Offer.AvailablePlaces' } },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function matchQuery(input) {
  let match = {};
  if (typeof input === 'object') {
    for (const [key, value] of Object.entries(input)) {
      if (Array.isArray(value)) {
      } else if (typeof value === 'string') {
        const arr = value.split('|');
        const or = [];
        arr.forEach((element) => {
          or.push({ [key]: element });
        });
        match['$or'] = or;
      } else {
        match[key] = value;
      }
    }
  }
  return match;
}

function aggregate(database, collection, query) {
  return client.connect().then((MongoClient) => {
    return MongoClient.db(database)
      .collection(collection)
      .aggregate(query)
      .toArray();
  });
}

//insert

function addDepartment({ departmentID, departmentName, location }) {
  if (!(departmentID && departmentName && location)) {
    return Promise.resolve({
      error:
        'missing data:' +
        (departmentID ? '' : ' departmentID') +
        (departmentName ? '' : ' departmentName') +
        (location ? '' : ' location'),
    });
  }

  const document = {
    DeptID: departmentID,
    DeptName: departmentName,
    Location: location,
  };

  return insertOne('ADS-Assignment2-DB1', 'Departments', document);
}

function addCourse({ departmentID, courseID, courseTitle, courseLevel }) {
  if (!departmentID) {
    return Promise.resolve({
      error:
        'missing data:' +
        (departmentID ? '' : ' departmentID') +
        (courseID ? '' : ' courseID') +
        (courseTitle ? '' : ' courseTitle') +
        (courseLevel ? '' : ' courseLevel'),
    });
  }

  const filter = { DeptID: departmentID };

  const document = {
    CourseID: courseID,
    Title: courseTitle,
    Level: Number(courseLevel),
  };

  const update = { $push: { Courses: document } };

  return updateOne('ADS-Assignment2-DB1', 'Departments', filter, update);
}

function addOffer({ courseID, year, classSize }) {
  if (!courseID) {
    return Promise.resolve({
      error:
        'missing data:' +
        (courseID ? '' : ' courseID') +
        (year ? '' : ' year') +
        (classSize ? '' : ' classSize'),
    });
  }

  const filter = { 'Courses.CourseID': courseID };

  const document = {
    Year: Number(year),
    ClassSize: Number(classSize),
    AvailablePlaces: Number(classSize),
  };

  const update = {
    $push: { 'Courses.$.Offer': document },
  };

  return updateOne('ADS-Assignment2-DB1', 'Departments', filter, update);
}

function addEnrolled({ courseID, year, studentID, studentYear, enrolDate }) {
  if (!(courseID && year)) {
    return Promise.resolve({
      error:
        'missing data:' +
        (courseID ? '' : ' courseID') +
        (year ? '' : ' year') +
        (studentID ? '' : ' studentID') +
        (studentYear ? '' : ' studentYear') +
        (enrolDate ? '' : ' enrolDate'),
    });
  }

  return coursesAvailablePlaces({ courseID, year })
    .then((result) => {
      const availablePlaces = result[0].result;
      if (availablePlaces === undefined) {
        return Promise.reject({ error: 'availablePlaces undefined' });
      } else if (availablePlaces === 0) {
        return Promise.reject({ error: 'availablePlaces === 0' });
      }

      const filter = {
        'Courses.CourseID': courseID,
        'Courses.Offer.Year': Number(year),
      };

      const document = {
        StudentID: studentID,
        Year: Number(studentYear),
        EnrolDate: enrolDate,
      };

      const update = {
        $push: { 'Courses.$[i].Offer.$[j].Enrolled': document },
        $set: {
          'Courses.$[i].Offer.$[j].AvailablePlaces': availablePlaces - 1,
        },
      };

      const options = {
        arrayFilters: [{ 'i.CourseID': courseID }, { 'j.Year': Number(year) }],
      };

      return updateOne(
        'ADS-Assignment2-DB1',
        'Departments',
        filter,
        update,
        options
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function insertOne(database, collection, document) {
  return client.connect().then((MongoClient) => {
    return MongoClient.db(database).collection(collection).insertOne(document);
  });
}

function updateOne(database, collection, filter, update, options) {
  return client.connect().then((MongoClient) => {
    return MongoClient.db(database)
      .collection(collection)
      .updateOne(filter, update, options);
  });
}

//update

function updateDepartment({ departmentID, departmentName, location }) {
  if (!departmentID) {
    return Promise.resolve({
      error: 'missing data:' + (departmentID ? '' : ' departmentID'),
    });
  }

  const filter = { DeptID: departmentID };
  const update = {};
  const set = {};

  if (departmentName) set['DeptName'] = departmentName;
  if (location) set['Location'] = location;
  update['$set'] = set;

  return updateOne('ADS-Assignment2-DB1', 'Departments', filter, update);
}

function updateCourses({ courseID, courseTitle, courseLevel }) {
  if (!courseID) {
    return Promise.resolve({
      error: 'missing data:' + (courseID ? '' : ' courseID'),
    });
  }

  const filter = { 'Courses.CourseID': courseID };
  const update = {};
  const set = {};

  if (courseTitle) set['Courses.$.Title'] = courseTitle;
  if (courseLevel) set['Courses.$.Level'] = Number(courseLevel);
  update['$set'] = set;

  return updateOne('ADS-Assignment2-DB1', 'Departments', filter, update);
}

function updateOffer({ courseID, year, classSize }) {
  if (!(courseID && year)) {
    return Promise.resolve({
      error:
        'missing data:' + (courseID ? '' : ' courseID') + (year ? '' : ' year'),
    });
  }

  return offer({ courseID, year })
    .then((result) => {
      const offer = result[0];

      const filter = {
        'Courses.CourseID': courseID,
        'Courses.Offer.Year': Number(year),
      };

      const update = {};
      const set = {};

      if (classSize)
        set['Courses.$[i].Offer.$[j].ClassSize'] = Number(classSize);
      if (classSize)
        set['Courses.$[i].Offer.$[j].AvailablePlaces'] =
          classSize - offer.Enrolled.length;
      update['$set'] = set;

      const options = {
        arrayFilters: [{ 'i.CourseID': courseID }, { 'j.Year': Number(year) }],
      };

      return updateOne(
        'ADS-Assignment2-DB1',
        'Departments',
        filter,
        update,
        options
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

//delete

function deleteDepartment({ departmentID }) {
  if (!departmentID) {
    return Promise.resolve({
      error: 'missing data: departmentID',
    });
  }

  const filter = {};
  if (departmentID) filter['DeptID'] = departmentID;

  return deleteOne('ADS-Assignment2-DB1', 'Departments', filter);
}

function deleteCourse({ courseID }) {
  if (!courseID) {
    return Promise.resolve({
      error: 'missing data: courseID',
    });
  }

  const filter = { 'Courses.CourseID': courseID };

  const update = {
    $pull: {
      Courses: { CourseID: courseID },
    },
  };

  const options = { multi: true };

  return updateOne(
    'ADS-Assignment2-DB1',
    'Departments',
    filter,
    update,
    options
  );
}

function deleteOffer({ courseID, year }) {
  if (!(courseID && year)) {
    return Promise.resolve({
      error:
        'missing data:' + (courseID ? '' : ' courseID') + (year ? '' : ' year'),
    });
  }

  const filter = {
    'Courses.CourseID': courseID,
    'Courses.Offer.Year': Number(year),
  };

  const update = {
    $pull: {
      'Courses.$[i].Offer': { Year: Number(year) },
    },
  };

  const options = {
    arrayFilters: [{ 'i.CourseID': courseID }],
  };

  return updateOne(
    'ADS-Assignment2-DB1',
    'Departments',
    filter,
    update,
    options
  );
}

function deleteEnrolled({ courseID, year, studentID }) {
  if (!(courseID && year && studentID)) {
    return Promise.resolve({
      error:
        'missing data:' +
        (courseID ? '' : ' courseID') +
        (year ? '' : ' year') +
        (studentID ? '' : ' studentID'),
    });
  }

  return offer({ courseID, year })
    .then((result) => {
      const offer = result[0];

      const filter = {
        'Courses.CourseID': courseID,
        'Courses.Offer.Year': Number(year),
        'Courses.Offer.Enrolled.StudentID': studentID,
      };

      const update = {
        $pull: {
          'Courses.$[i].Offer.$[j].Enrolled': { StudentID: studentID },
        },
        $set: {
          'Courses.$[i].Offer.$[j].AvailablePlaces': offer.AvailablePlaces + 1,
        },
      };

      const options = {
        arrayFilters: [{ 'i.CourseID': courseID }, { 'j.Year': Number(year) }],
      };

      return updateOne(
        'ADS-Assignment2-DB1',
        'Departments',
        filter,
        update,
        options
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function deleteOne(database, collection, filter) {
  return client.connect().then((MongoClient) => {
    return MongoClient.db(database).collection(collection).deleteOne(filter);
  });
}

module.exports = {
  departments,
  offer,

  studentsCount,
  studentsFind,

  coursesTitle,
  coursesInfo,
  popularCourse,
  enrolledStudentCount,
  studentEnrolledCourses,

  addDepartment,
  addCourse,
  addOffer,
  addEnrolled,

  updateDepartment,
  updateCourses,
  updateOffer,

  deleteDepartment,
  deleteCourse,
  deleteOffer,
  deleteEnrolled,
};
