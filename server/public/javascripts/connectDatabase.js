const { MongoClient } = require('mongodb');
const userName = 'tszhimmak';
const password = 'him412573986';
const databaseName = 'cluster0';
const uri = `mongodb+srv://${userName}:${password}@cluster0.dt8ox.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    {
      $match: matchQuery({
        DeptID: departmentID,
        'Courses.Offer.Year': Number(year),
      }),
    },
    { $project: { result: '$Courses.Title' } },
    {
      $group: {
        _id: `courses offered by ${departmentID} in ${year}`,
        result: { $addToSet: '$result' },
      },
    },
  ];

  return aggregate('ADS-Assignment2-DB1', 'Departments', query);
}

function coursesInfo({ departmentID, year }) {
  const query = [
    { $unwind: '$Courses' },
    { $unwind: '$Courses.Offer' },
    {
      $match: matchQuery({
        DeptID: departmentID,
        'Courses.Offer.Year': Number(year),
      }),
    },
    { $project: { result: '$Courses' } },
    {
      $group: {
        _id: `courses info`,
        result: { $addToSet: '$result' },
      },
    },
    { $unset: 'result.Offer' },
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

module.exports = {
  studentsCount,
  studentsFind,
  coursesTitle,
  coursesInfo,
};
