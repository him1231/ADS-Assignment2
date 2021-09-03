export interface item {
  [key: string]: string | number | item[];
}

async function callAPI(baseUrl: string, param: object) {
  const paramString = Object.entries(param)
    .map(([key, value]) => {
      return value ? `${key}=${value}` : undefined;
    })
    .join("&");
  const url = baseUrl + paramString;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

interface searchDepartmentProps {
  departmentID: string;
  departmentName: string;
  location: string;
  courseID?: string;
  title?: string;
  level?: string;
  offerYear?: string;
  studentID?: string;
  studentYear?: string;
}

export async function searchDepartment(props: searchDepartmentProps) {
  const baseUrl = "/database/departments?";
  const param = props;
  const result: item[] = await callAPI(baseUrl, param);
  return result;
}

interface searchCourseProps {
  courseID: string;
  title: string;
  level: string;
}

export async function searchCourse(props: searchCourseProps) {
  const baseUrl = "/database/courses?";
  const param = props;
  const result: item[] = await callAPI(baseUrl, param);
  return result;
}

interface searchOfferProps {
  departmentID: string;
  courseID: string;
  year: string;
}

export async function searchOffer(props: searchOfferProps) {
  const baseUrl = "/database/offer?";
  const param = props;
  const result: item[] = await callAPI(baseUrl, param);
  return result;
}

interface searchStudentProps {
  studentID: string;
  studentName: string;
}

export async function searchStudent(props: searchStudentProps) {
  const baseUrl = "/database/students?";
  const param = props;
  const result: item[] = await callAPI(baseUrl, param);
  return result;
}

interface searchCoursesTitleProps {
  departmentID: string;
  year: string;
}

export async function searchCoursesTitle(props: searchCoursesTitleProps) {
  const baseUrl = "/database/coursesTitle?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  if (Array.isArray(result) && result.length > 0) {
    return result[0]["result"];
  } else {
    return [];
  }
}

interface searchCoursesInfoProps {
  departmentID: string;
  year: string;
}

export async function searchCoursesInfo(props: searchCoursesInfoProps) {
  const baseUrl = "/database/coursesInfo?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  if (Array.isArray(result) && result.length > 0) {
    return result[0]["result"];
  } else {
    return [];
  }
}

interface searchPopularCourseProps {
  departmentID: string;
  year: string;
}

export async function searchPopularCourse(props: searchPopularCourseProps) {
  const baseUrl = "/database/popularCourse?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  if (Array.isArray(result) && result.length > 0) {
    return result[0]["result"];
  } else {
    return [];
  }
}

interface searchEnrolledStudentCountProps {
  departmentID: string;
  year: string;
}

export async function searchEnrolledStudentCount(
  props: searchEnrolledStudentCountProps
) {
  const baseUrl = "/database/enrolledStudentCount?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  if (Array.isArray(result) && result.length > 0) {
    return result[0]["result"];
  } else {
    return [];
  }
}

interface searchStudentEnrolledCoursesProps {
  studentName: string;
  departmentID: string;
  year: string;
}

export async function searchStudentEnrolledCourses(
  props: searchStudentEnrolledCoursesProps
) {
  const baseUrl = "/database/studentEnrolledCourses?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  if (Array.isArray(result) && result.length > 0) {
    return result[0]["result"];
  } else {
    return [];
  }
}

interface addDepartmentProps {
  departmentID: string;
  departmentName: string;
  location: string;
}

export async function addDepartment(props: addDepartmentProps) {
  const baseUrl = "/database/addDepartment?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface addCourseProps {
  departmentID: string;
  courseID: string;
  title: string;
  level: string;
}

export async function addCourse(props: addCourseProps) {
  const baseUrl = "/database/addCourse?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface addOfferProps {
  courseID: string;
  offerYear: string;
  classSize: string;
}

export async function addOffer(props: addOfferProps) {
  const baseUrl = "/database/addOffer?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface addEnrolledProps {
  courseID: string;
  offerYear: string;
  studentID: string;
  studentYear: string;
}

export async function addEnrolled(props: addEnrolledProps) {
  const baseUrl = "/database/addEnrolled?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface addStudetProps {
  studentID: string;
  studentName: string;
  DOB: string;
}

export async function addStudent(props: addStudetProps) {
  const baseUrl = "/database/addStudent?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface updateDepartmentProps {
  departmentID: string;
  departmentName: string;
  location: string;
}

export async function updateDepartment(props: updateDepartmentProps) {
  const baseUrl = "/database/updateDepartment?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface updateCourseProps {
  courseID: string;
  title: string;
  level: string;
}

export async function updateCourse(props: updateCourseProps) {
  const baseUrl = "/database/updateCourse?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface updateOfferProps {
  courseID: string;
  offerYear: string;
  classSize: string;
}

export async function updateOffer(props: updateOfferProps) {
  const baseUrl = "/database/updateOffer?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface updateStudentProps {
  studentID: string;
  studentName: string;
  DOB: string;
}

export async function updateStudent(props: updateStudentProps) {
  const baseUrl = "/database/updateStudent?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface deleteDepartmentProps {
  departmentID: string;
}

export async function deleteDepartment(props: deleteDepartmentProps) {
  const baseUrl = "/database/deleteDepartment?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface deleteCourseProps {
  courseID: string;
}

export async function deleteCourse(props: deleteCourseProps) {
  const baseUrl = "/database/deleteCourse?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface deleteOfferProps {
  courseID: string;
  offerYear: string;
}

export async function deleteOffer(props: deleteOfferProps) {
  const baseUrl = "/database/deleteOffer?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface deleteEnrolledProps {
  courseID: string;
  offerYear: string;
  studentID: string;
}

export async function deleteEnrolled(props: deleteEnrolledProps) {
  const baseUrl = "/database/deleteEnrolled?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

interface deleteStudetProps {
  studentID: string;
}

export async function deleteStudent(props: deleteStudetProps) {
  const baseUrl = "/database/deleteStudent?";
  const param = props;
  const result = await callAPI(baseUrl, param);
  return result;
}

const a = [
  { $unwind: "$Courses" },
  { $unwind: "$Courses.Offer" },
  { $match: { $or: [{ DeptID: "CS" }], "Courses.Offer.Year": 2021 } },
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
      _id: "List the numbers of students for each course, who have enrolled the course offered by CS in 2021",
      result: { $addToSet: "$result" },
    },
  },
];
