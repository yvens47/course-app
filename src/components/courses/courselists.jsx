import CourseItem from "./course";
export default function CourseLists(props) {
  return (
    <div className=" row course-lists pt-5">
      {props.courses &&
        props.courses.map((course) => (
          <div className="col-xs-12 col-sm-6 col-md-4">
            <CourseItem key={course._id} course={course} />
          </div>
        ))}
    </div>
  );
}
