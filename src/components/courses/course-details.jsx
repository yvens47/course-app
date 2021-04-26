import { Fragment, React, useEffect, useState } from "react";
import SideNavBar from "../sidebar";
import { countCompleted, percent } from "../../utils";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Redirect, Link, withRouter } from "react-router-dom";
import axios from "axios";
import empty from "../../assets/empty.svg";

// const chapters = [
//   {
//     id: "367458609854",
//     title: "chpterone title",
//     about: "Lorem ipsum dolor sit amet consectetur adipisicing ",
//     lessons: [
//       {
//         completed: false,
//         title: "Lorem ipsum",
//         videos:
//           "https://player.vimeo.com/external/189417403.sd.mp4?s=f10416ccbbeed95005d7b6b2c761cbcce69e5003&profile_id=164&oauth2_token_id=57447761"
//       },
//       {
//         completed: false,
//         title: "dipiscing eli",
//         videos:
//           "https://player.vimeo.com/external/189417403.sd.mp4?s=f10416ccbbeed95005d7b6b2c761cbcce69e5003&profile_id=164&oauth2_token_id=57447761"
//       },
//       {
//         completed: true,
//         title: "dipiscing eli",
//         videos:
//           "https://player.vimeo.com/external/189417403.sd.mp4?s=f10416ccbbeed95005d7b6b2c761cbcce69e5003&profile_id=164&oauth2_token_id=57447761"
//       }
//     ]
//   },
//   {
//     id: "367458609854",
//     title: "chptertwo title",
//     about: "Lorem ipsum dolor sit amet consectetur adipisicing ",
//     lessons: [
//       {
//         completed: false,
//         title: "Lorem ipsum",
//         videos:
//           "https://player.vimeo.com/external/189417403.sd.mp4?s=f10416ccbbeed95005d7b6b2c761cbcce69e5003&profile_id=164&oauth2_token_id=57447761"
//       },
//       {
//         completed: true,
//         title: "dipiscing eli",
//         videos:
//           "https://player.vimeo.com/external/189417403.sd.mp4?s=f10416ccbbeed95005d7b6b2c761cbcce69e5003&profile_id=164&oauth2_token_id=57447761"
//       },
//       {
//         completed: true,
//         title: "dipiscing eli",
//         videos:
//           "https://player.vimeo.com/external/189417403.sd.mp4?s=f10416ccbbeed95005d7b6b2c761cbcce69e5003&profile_id=164&oauth2_token_id=57447761"
//       }
//     ]
//   },
//   {
//     id: "367458609854",
//     title: "chpterthree title",
//     about: "Lorem ipsum dolor sit amet consectetur adipisicing ",
//     lessons: [1, 2, 3]
//   }
// ];

function CourseRegisteredDetail(props) {
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    /*to be reafactored. move redux store */

    if (props.location.state) {
      axios
        .get(
          `https://congn.sse.codesandbox.io/chapters/${props.location.state.courseid}`
        )
        .then((response) => setChapters(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  if (!props.location.state) {
    return <Redirect to={"/mycourses"} />;
  }

  return (
    <div className="wrapper wrapper-course-overview">
      {/* <SideNavBar>
        <div className="siderbar"></div>
      </SideNavBar> */}
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="container ">
            <h2 className="lead pt-3 pb-3">Course Overview</h2>

            <div className="row overview p-3">
              <div className="col-sm-12 col-md-3">
                <img
                  className="rounded"
                  width="100%"
                  src={props.location.state.course.cover}
                  alt="course cover"
                />
              </div>
              <div className="col-md-5 col-sm-12">
                <h2 className="display-5 ">
                  {props.location.state.course.name}
                </h2>
                {props.location.state.course.about}
              </div>
              <div className="col-md-4 col-sm-12"></div>
            </div>
          </div>

          <div className="container ">
            {chapters.length == 0 ? (
              <Fragment>
                <h2 className="lead pt-3 pb-3">
                  This course Currently has no lessons ye
                </h2>
                <hr />
                <div className="empty">
                  <p className="lead">
                    Vivamus ultricies nulla erat, id imperdiet sapien egestas
                    quis. Integer vel egestas felis. Cras tempus arcu id blandit
                    auctor. Pellentesque eros erat, rhoncus sed bibendum id,
                    pretium ut dui. Cras ante odio, vehicula vitae iaculis sed,
                    fermentum id enim. Ut efficitur ornare nulla sed accumsan.
                    Etiam blandit fermentum augue sit amet aliquam. Morbi et
                    magna rhoncus, fermentum felis non, accumsan elit. Integer
                    ornare ante in euismod maximus. Ut finibus ante ipsum primi
                  </p>
                  <p>
                    <Link to="/mycourses" className="btn  btn-outline-info">
                      Your Other Courses{" "}
                      <i className="fas fa-angle-double-right"></i>
                    </Link>
                  </p>
                  <img width="50%" src={empty} alt="coruse image" />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <h2 className="lead pt-3 pb-3">Available Chapters</h2>
                {chapters.map((chapter, index) => (
                  <div className="row overview p-3 mt-2" key={chapter._id}>
                    <div className="col-md-4">
                      <p className="lead">
                        <Link
                          to={{
                            pathname: `/chapter/${chapter._id}`,

                            state: { chapters: chapters, current: index }
                          }}
                        >
                          {chapter.title}
                        </Link>
                      </p>
                      <p className="">{chapter.about}</p>
                    </div>
                    <div className="col-md-4">
                      <h4>
                        {countCompleted(chapter.lessons, "completed", true)} of
                        {" " + chapter.lessons.length}
                      </h4>
                      <p>Items Complted</p>
                    </div>
                    <div className="col-md-4">
                      <Box position="relative" display="inline-flex">
                        <CircularProgress
                          style={{ width: "90px", height: "90px" }}
                          value={percent(
                            chapter.lessons.length,
                            countCompleted(chapter.lessons, "completed", true)
                          )}
                          variant="determinate"
                          {...props}
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="caption"
                            component="div"
                            color="textSecondary"
                          >{`${percent(
                            chapter.lessons.length,
                            countCompleted(chapter.lessons, "completed", true)
                          )}%`}</Typography>
                        </Box>
                      </Box>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
          </div>

          <div className="col-md-12"></div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CourseRegisteredDetail);
