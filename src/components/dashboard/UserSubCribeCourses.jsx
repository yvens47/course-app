import { React, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: 500
  }
});

export default function UserSubCribeCourses(props) {
  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      {/* {JSON.stringify(props.courses && props.courses)} */}
      {props.courses &&
        props.courses.map((course) => (
          <div className="row border-top pt-4 pb-4 mycourse" key={course._id}>
            <div className="col-md-3 mb-2">
              <Link to="#">
                <img src={course.cover} width="100%" />
              </Link>
            </div>
            <div className="col-md-9 mb-2">
              <h5 className="display-5">
                <Link
                  to={{
                    pathname: `subscribe/${course._id}`,
                    state: { courseid: course._id, course: course }
                  }}
                >
                  {course.name}
                </Link>
              </h5>
              <p>Course updated {<TimeAgo date={course.updatedAt} />}</p>
              <div className="remove-course">
                <Link
                  onClick={() => props.remove(course._id)}
                  to="#"
                  className="btn btn-link p-0"
                  style={{ color: "#0e7e3d" }}
                >
                  Remove Course
                </Link>
              </div>
            </div>

            {/* bottom navbar */}
          </div>
        ))}
    </Fragment>
  );
}
