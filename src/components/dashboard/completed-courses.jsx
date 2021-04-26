import { React } from "react";

import image from "../../undraw_lost_online_wqob.svg";

function CompletedCourse(props) {
  return (
    <div className="completed-wrapper p-2">
      <h2 className="display-4">Past Courses</h2>
      <img src={image} alt="" width="40%" />
      <h3>You have not completed any courses.</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut repellat
        dolor magnam unde, modi voluptatem non eveniet quasi, rem nemo delectus
        soluta. Cupiditate eius ex repellat neque quia, animi dolorum.
      </p>
      <p>
        {" "}
        <a className="btn btn-info btn-lg" href="http://">
          Learn more
        </a>{" "}
        <a className="btn btn-secondary btn-lg" href="/courses">
          Browse All Courses
        </a>
      </p>
    </div>
  );
}

export default CompletedCourse;
