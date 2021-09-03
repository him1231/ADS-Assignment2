const { MongoClient } = require("mongodb");
const moment = require("moment");
const userName = "tszhimmak";
const password = "him412573986";
const databaseName = "cluster0";
const uri = `mongodb+srv://${userName}:${password}@cluster0.dt8ox.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//query

function departments({
  departmentID,
  departmentName,
  location,
  courseID,
  title,
  level,
  offerYear,
  studentID,
  studentYear,
}) {
  const unwind = [];
  if (courseID || title || level || offerYear || studentID || studentYear)
    unwind.push({ $unwind: "$Courses" });
  if (offerYear || studentID || studentYear)
    unwind.push({ $unwind: "$Courses.Offer" });
  if (studentID || studentYear)
    unwind.push({ $unwind: "$Courses.Offer.Enrolled" });

  const match = {};
  if (departmentID) match["DeptID"] = departmentID;
  if (departmentName) match["DeptName"] = departmentName;
  if (location) match["Location"] = location;
  if (courseID) match["Courses.CourseID"] = courseID;
  if (title) match["Courses.Title"] = title;
  if (level) match["Courses.Level"] = Number(level);
  if (offerYear) match["Courses.Offer.Year"] = Number(offerYear);
  if (studentID) match["Courses.Offer.Enrolled.StudentID"] = Number(studentID);
  if (studentYear) match["Courses.Offer.Enrolled.Year"] = Number(studentYear);

  const query = [...unwind, { $match: matchQuery(match) }];
  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function students({ studentID, studentName }) {
  const match = {};
  if (studentID) match["StudentID"] = studentID;
  if (studentName) match["StuName"] = studentName;
  const query = [{ $match: matchQuery(match) }];
  return aggregate("ADS-Assignment2-DB1", "Students", query);
}

function courses({ courseID, title, level }) {
  const match = {};
  if (courseID) match["Courses.CourseID"] = courseID;
  if (title) match["Courses.Title"] = title;
  if (level) match["Courses.Level"] = level;

  const query = [
    { $unwind: "$Courses" },
    { $match: matchQuery(match) },
    {
      $project: {
        CourseID: "$Courses.CourseID",
        Title: "$Courses.Title",
        Level: "$Courses.Level",
        Offer: "$Courses.Offer",
      },
    },
  ];
  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function offer({ departmentID, courseID, year }) {
  const match = {};
  if (departmentID) match["DeptID"] = departmentID;
  if (courseID) match["Courses.CourseID"] = courseID;
  if (year) match["Courses.Offer.Year"] = Number(year);

  const query = [
    { $unwind: "$Courses" },
    { $unwind: "$Courses.Offer" },
    { $match: matchQuery(match) },
    {
      $project: {
        DeptID: "$DeptID",
        CourseID: "$Courses.CourseID",
        Year: "$Courses.Offer.Year",
        ClassSize: "$Courses.Offer.ClassSize",
        AvailablePlaces: "$Courses.Offer.AvailablePlaces",
        Enrolled: "$Courses.Offer.Enrolled",
      },
    },
  ];
  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function studentsCount() {
  return client.connect().then((MongoClient) => {
    return MongoClient.db("ADS-Assignment2-DB1").collection("Students").count();
  });
}

function studentsFind(StudentID) {
  const query = { StudentID: StudentID };
  return client.connect().then((MongoClient) => {
    return MongoClient.db("ADS-Assignment2-DB1")
      .collection("Students")
      .find(query)
      .toArray();
  });
}

function coursesTitle({ departmentID, year }) {
  const match = {};
  if (departmentID) match["DeptID"] = departmentID;
  if (year) match["Courses.Offer.Year"] = Number(year);

  const query = [
    { $unwind: "$Courses" },
    { $unwind: "$Courses.Offer" },
    {
      $match: matchQuery(match),
    },
    { $project: { result: "$Courses.Title" } },
    {
      $group: {
        _id:
          `courses title` +
          (departmentID ? ` offered by ${departmentID}` : "") +
          (year ? ` in ${year}` : ""),
        result: { $addToSet: "$result" },
      },
    },
  ];

  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function coursesInfo({ departmentID, year, courseID = undefined }) {
  const match = {};
  if (departmentID) match["DeptID"] = departmentID;
  if (year) match["Courses.Offer.Year"] = Number(year);
  if (courseID) match["Courses.CourseID"] = courseID;

  const query = [
    { $unwind: "$Courses" },
    { $unwind: "$Courses.Offer" },
    {
      $match: matchQuery(match),
    },
    { $project: { result: "$Courses" } },
    {
      $group: {
        _id:
          `courses info` +
          (departmentID ? ` offered by ${departmentID}` : "") +
          (year ? ` in ${year}` : ""),
        result: { $addToSet: "$result" },
      },
    },
    { $unset: "result.Offer" },
  ];

  console.log("query", JSON.stringify(query));

  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function popularCourse({ departmentID = undefined, year = undefined }) {
  const match = {};
  if (departmentID) match["DeptID"] = departmentID;
  if (year) match["Courses.Offer.Year"] = Number(year);

  const query = [
    { $unwind: "$Courses" },
    { $unwind: "$Courses.Offer" },
    {
      $match: matchQuery(match),
    },
    {
      $project: {
        Course: "$Courses",
        count: { $size: "$Courses.Offer.Enrolled" },
      },
    },
    { $unset: "Course.Offer" },
    { $group: { _id: "$Course", count: { $sum: "$count" } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: "Find the information of the course which is the most popular course enrolled by students.",
        result: {
          CourseID: "$_id.CourseID",
          Title: "$_id.Title",
          Level: "$_id.Level",
          Accumulate: "$count",
        },
      },
    },
  ];

  console.log("query", JSON.stringify(query));

  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function enrolledStudentCount({
  departmentID = undefined,
  courseID = undefined,
  year = undefined,
}) {
  const match = {};
  if (departmentID) match["DeptID"] = departmentID;
  if (courseID) match["Courses.CourseID"] = courseID;
  if (year) match["Courses.Offer.Year"] = Number(year);

  const query = [
    { $unwind: "$Courses" },
    { $unwind: "$Courses.Offer" },
    { $match: matchQuery(match) },
    {
      $project: {
        result: {
          CourseID: "$Courses.CourseID",
          count: { $size: "$Courses.Offer.Enrolled" },
        },
      },
    },
    {
      $group: {
        _id:
          "List the numbers of students for each course, who have enrolled the course" +
          (departmentID ? ` offered by ${departmentID}` : "") +
          (year ? ` in ${year}` : ""),
        result: { $addToSet: "$result" },
      },
    },
  ];

  console.log("query", JSON.stringify(query));

  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function studentEnrolledCourses({ studentName, departmentID, year }) {
  const match = {};
  if (studentName) {
    match["Students.StuName"] = studentName;
  } else {
    return Promise.reject([]);
  }
  if (departmentID) match["DeptID"] = departmentID;
  if (year) match["Courses.Offer.Year"] = Number(year);

  const query = [
    { $unwind: "$Courses" },
    {
      $lookup: {
        from: "Students",
        localField: "Courses.Offer.Enrolled.StudentID",
        foreignField: "StudentID",
        as: "Students",
      },
    },
    { $match: matchQuery(match) },
    { $project: { result: "$Courses.CourseID" } },
    {
      $group: {
        _id:
          `List the courses` +
          (departmentID ? ` offered by the ${departmentID} department` : "") +
          (studentName ? ` that the student ${studentName} has enrolled` : "") +
          (year ? ` in ${year}.` : ""),
        result: { $addToSet: "$result" },
      },
    },
  ];

  console.log("query", JSON.stringify(query));

  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function coursesAvailablePlaces({ year, courseID }) {
  const match = {};
  if (year) match["Courses.Offer.Year"] = Number(year);
  if (courseID) match["Courses.CourseID"] = courseID;

  const query = [
    { $unwind: "$Courses" },
    { $unwind: "$Courses.Offer" },
    {
      $match: matchQuery(match),
    },
    { $project: { result: "$Courses.Offer.AvailablePlaces" } },
  ];

  return aggregate("ADS-Assignment2-DB1", "Departments", query);
}

function matchQuery(input) {
  let match = {};
  if (typeof input === "object") {
    for (const [key, value] of Object.entries(input)) {
      if (Array.isArray(value)) {
      } else if (typeof value === "string") {
        const arr = value.split("|");
        const or = [];
        arr.forEach((element) => {
          or.push({ [key]: element });
        });
        match["$or"] = or;
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
        "missing data:" +
        (departmentID ? "" : " departmentID") +
        (departmentName ? "" : " departmentName") +
        (location ? "" : " location"),
    });
  }

  const document = {
    DeptID: departmentID,
    DeptName: departmentName,
    Location: location,
  };

  return insertOne("ADS-Assignment2-DB1", "Departments", document);
}

function addCourse({ departmentID, courseID, title, level }) {
  if (!departmentID) {
    return Promise.resolve({
      error:
        "missing data:" +
        (departmentID ? "" : " departmentID") +
        (courseID ? "" : " courseID") +
        (title ? "" : " courseTitle") +
        (level ? "" : " courseLevel"),
    });
  }

  const filter = { DeptID: departmentID };

  const document = {
    CourseID: courseID,
    Title: title,
    Level: Number(level),
  };

  const update = { $push: { Courses: document } };

  return updateOne("ADS-Assignment2-DB1", "Departments", filter, update);
}

function addOffer({ courseID, offerYear, classSize }) {
  if (!courseID) {
    return Promise.resolve({
      error:
        "missing data:" +
        (courseID ? "" : " courseID") +
        (offerYear ? "" : " year") +
        (classSize ? "" : " classSize"),
    });
  }

  const filter = { "Courses.CourseID": courseID };

  const document = {
    Year: Number(offerYear),
    ClassSize: Number(classSize),
    AvailablePlaces: Number(classSize),
  };

  const update = {
    $push: { "Courses.$.Offer": document },
  };

  return updateOne("ADS-Assignment2-DB1", "Departments", filter, update);
}

function addEnrolled({
  courseID,
  offerYear,
  studentID,
  studentYear,
  enrolDate,
}) {
  if (!(courseID && offerYear)) {
    return Promise.resolve({
      error:
        "missing data:" +
        (courseID ? "" : " courseID") +
        (offerYear ? "" : " offerYear") +
        (studentID ? "" : " studentID") +
        (studentYear ? "" : " studentYear"),
    });
  }

  return coursesAvailablePlaces({ courseID, year: offerYear })
    .then((result) => {
      const availablePlaces = result[0].result;
      if (availablePlaces === undefined) {
        return Promise.reject({ error: "availablePlaces undefined" });
      } else if (availablePlaces === 0) {
        return Promise.reject({ error: "availablePlaces === 0" });
      }

      const filter = {
        "Courses.CourseID": courseID,
        "Courses.Offer.Year": Number(offerYear),
      };

      const document = {
        StudentID: studentID,
        Year: Number(studentYear),
        EnrolDate: enrolDate ?? moment().format("DD/MM/YYYY"),
      };

      const update = {
        $push: { "Courses.$[i].Offer.$[j].Enrolled": document },
        $set: {
          "Courses.$[i].Offer.$[j].AvailablePlaces": availablePlaces - 1,
        },
      };

      const options = {
        arrayFilters: [
          { "i.CourseID": courseID },
          { "j.Year": Number(offerYear) },
        ],
      };

      return updateOne(
        "ADS-Assignment2-DB1",
        "Departments",
        filter,
        update,
        options
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function addStudent({ studentID, studentName, DOB }) {
  if (!(studentID && studentName && DOB)) {
    return Promise.resolve({
      error:
        "missing data:" +
        (studentID ? "" : " StudentID") +
        (studentName ? "" : " StuName") +
        (DOB ? "" : " DOB"),
    });
  }

  const document = {
    StudentID: studentID,
    StuName: studentName,
    DOB: moment(DOB).format("DD/MM/YYYY"),
  };

  return insertOne("ADS-Assignment2-DB1", "Students", document);
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
      error: "missing data:" + (departmentID ? "" : " departmentID"),
    });
  }

  const filter = { DeptID: departmentID };
  const update = {};
  const set = {};

  if (departmentName) set["DeptName"] = departmentName;
  if (location) set["Location"] = location;
  update["$set"] = set;

  return updateOne("ADS-Assignment2-DB1", "Departments", filter, update);
}

function updateCourses({ courseID, title, level }) {
  if (!courseID) {
    return Promise.resolve({
      error: "missing data:" + (courseID ? "" : " courseID"),
    });
  }

  const filter = { "Courses.CourseID": courseID };
  const update = {};
  const set = {};

  if (title) set["Courses.$.Title"] = title;
  if (level) set["Courses.$.Level"] = Number(level);
  update["$set"] = set;

  return updateOne("ADS-Assignment2-DB1", "Departments", filter, update);
}

function updateOffer({ courseID, offerYear, classSize }) {
  if (!(courseID && offerYear)) {
    return Promise.resolve({
      error:
        "missing data:" +
        (courseID ? "" : " courseID") +
        (offerYear ? "" : " year"),
    });
  }

  return offer({ courseID, year: offerYear })
    .then((result) => {
      const offer = result[0];

      const filter = {
        "Courses.CourseID": courseID,
        "Courses.Offer.Year": Number(offerYear),
      };

      const update = {};
      const set = {};

      if (classSize)
        set["Courses.$[i].Offer.$[j].ClassSize"] = Number(classSize);
      if (classSize)
        set["Courses.$[i].Offer.$[j].AvailablePlaces"] =
          classSize - offer.Enrolled.length;
      update["$set"] = set;

      const options = {
        arrayFilters: [
          { "i.CourseID": courseID },
          { "j.Year": Number(offerYear) },
        ],
      };

      return updateOne(
        "ADS-Assignment2-DB1",
        "Departments",
        filter,
        update,
        options
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function updateStudent({ studentID, studentName, DOB }) {
  if (!studentID) {
    return Promise.resolve({
      error: "missing data:" + (studentID ? "" : " studentID"),
    });
  }

  const filter = { StudentID: studentID };
  const update = {};
  const set = {};

  if (studentName) set["StuName"] = studentName;
  if (DOB) set["DOB"] = moment(DOB).format("DD/MM/YYYY");
  update["$set"] = set;

  return updateOne("ADS-Assignment2-DB1", "Students", filter, update);
}

//delete

function deleteDepartment({ departmentID }) {
  if (!departmentID) {
    return Promise.resolve({
      error: "missing data: departmentID",
    });
  }

  const filter = {};
  if (departmentID) filter["DeptID"] = departmentID;

  return deleteOne("ADS-Assignment2-DB1", "Departments", filter);
}

function deleteCourse({ courseID }) {
  if (!courseID) {
    return Promise.resolve({
      error: "missing data: courseID",
    });
  }

  const filter = { "Courses.CourseID": courseID };

  const update = {
    $pull: {
      Courses: { CourseID: courseID },
    },
  };

  const options = { multi: true };

  return updateOne(
    "ADS-Assignment2-DB1",
    "Departments",
    filter,
    update,
    options
  );
}

function deleteOffer({ courseID, offerYear }) {
  if (!(courseID && offerYear)) {
    return Promise.resolve({
      error:
        "missing data:" +
        (courseID ? "" : " courseID") +
        (offerYear ? "" : " year"),
    });
  }

  const filter = {
    "Courses.CourseID": courseID,
    "Courses.Offer.Year": Number(offerYear),
  };

  const update = {
    $pull: {
      "Courses.$[i].Offer": { Year: Number(offerYear) },
    },
  };

  const options = {
    arrayFilters: [{ "i.CourseID": courseID }],
  };

  return updateOne(
    "ADS-Assignment2-DB1",
    "Departments",
    filter,
    update,
    options
  );
}

function deleteEnrolled({ courseID, offerYear, studentID }) {
  if (!(courseID && offerYear && studentID)) {
    return Promise.resolve({
      error:
        "missing data:" +
        (courseID ? "" : " courseID") +
        (offerYear ? "" : " year") +
        (studentID ? "" : " studentID"),
    });
  }

  return offer({ courseID, year: offerYear })
    .then((result) => {
      const offer = result[0];

      const filter = {
        "Courses.CourseID": courseID,
        "Courses.Offer.Year": Number(offerYear),
        "Courses.Offer.Enrolled.StudentID": studentID,
      };

      const update = {
        $pull: {
          "Courses.$[i].Offer.$[j].Enrolled": { StudentID: studentID },
        },
        $set: {
          "Courses.$[i].Offer.$[j].AvailablePlaces": offer.AvailablePlaces + 1,
        },
      };

      const options = {
        arrayFilters: [
          { "i.CourseID": courseID },
          { "j.Year": Number(offerYear) },
        ],
      };

      return updateOne(
        "ADS-Assignment2-DB1",
        "Departments",
        filter,
        update,
        options
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function deleteStudent({ studentID }) {
  if (!studentID) {
    return Promise.resolve({
      error: "missing data: studentID",
    });
  }

  const filter = {};
  if (studentID) filter["StudentID"] = studentID;

  return deleteOne("ADS-Assignment2-DB1", "Students", filter);
}

function deleteOne(database, collection, filter) {
  return client.connect().then((MongoClient) => {
    return MongoClient.db(database).collection(collection).deleteOne(filter);
  });
}

module.exports = {
  departments,
  courses,
  offer,
  students,

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
  addStudent,

  updateDepartment,
  updateCourses,
  updateOffer,
  updateStudent,

  deleteDepartment,
  deleteCourse,
  deleteOffer,
  deleteEnrolled,
  deleteStudent,
};
