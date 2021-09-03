export const DepartmentUndeepKey = ["DeptID", "DeptName", "Location"];
export const DepartmentKey = DepartmentUndeepKey.concat(["Courses"]);
export const CourseUndeepKey = ["CourseID", "Title", "Level"];
export const CourseKey = CourseUndeepKey.concat(["Offer"]);
export const OfferUndeepKey = ["Year", "ClassSize", "AvailablePlaces"];
export const OfferKey = OfferUndeepKey.concat(["Enrolled"]);
export const EnrolledKey = ["StudentID", "Year", "EnrolDate"];
export const StudentKey = ["StudentID", "StuName", "DOB"];

export function getKey(tableName: string, deep: boolean = false) {
  switch (tableName) {
    case "Departments":
      return deep ? DepartmentKey : DepartmentUndeepKey;
    case "Courses":
      return deep ? CourseKey : CourseUndeepKey;
    case "Offer":
      return deep ? OfferKey : OfferUndeepKey;
    case "Enrolled":
      return EnrolledKey;
    case "Students":
      return StudentKey;
    default:
      return [];
  }
}
