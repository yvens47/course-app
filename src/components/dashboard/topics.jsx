import {
  BrowserRouter as Router,
  Link,
  withRouter,
  useRouteMatch,
  Switch,
  Route,
  useHistory,
  useParams,
  Redirect
} from "react-router-dom";
import { React, useEffect, useState, Fragement } from "react";
import UserSubCribeCourses from "./UserSubCribeCourses";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CodeIcon from "@material-ui/icons/Code";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import MovieCreationIcon from "@material-ui/icons/MovieCreation";

import CallMergeIcon from "@material-ui/icons/CallMerge";
import { connect } from "react-redux";
import {
  getUser,
  filterCourse,
  removeUserCourse
} from "../../store/actions/actions";
import TimeAgo from "react-timeago";

import CompletedCourse from "./completed-courses";

function Topic(props) {
  let { topicId } = useParams();

  if (topicId === "past") return <CompletedCourse />;

  if (topicId === "interest") {
    return (
      <div>
        <h3 className="display-3"> Other Course You Might Like</h3>
        <p className="lea">Not yet implemented</p>
      </div>
    );
  }

  // return (
  //   <div>
  //     <h3>{topicId}</h3>
  //   </div>
  // );
}

function Topics(props) {
  // remove a course from use subscribe list
  const remove = (courseid) => {
    props.removeUserCourse(courseid, props.UserSubCribeCourse.id);
  };

  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  if (!props.user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="wrapper">
      <aside className="aside-bar">
        <div className="siderbar">
          <div className="aside-content p-4">
            <ul className="nav left-nav flex-column list-group list-group-flush">
              <li className="nav-item list-group-item list-group-item-action">
                <CodeIcon />
                <Link to={`${url}`}>Current Courses</Link>
              </li>
              <li className="nav-item list-group-item list-group-item-action">
                <CallMergeIcon />
                <Link to={`${url}/past`}>Past Courses</Link>
              </li>
              <li className="nav-item list-group-item list-group-item-action">
                <BubbleChartIcon />
                <Link to={`${url}/interest`}>Other Interests</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main
        className="mycourses container-fluid border-top border-info p-5"
        style={{ background: "#f5f6f7" }}
      >
        <div className="row p-5" style={{ background: "white" }}>
          <div>
            <Switch>
              <Route exact path={path}>
                <h3>
                  My Courses (
                  {props.UserSubCribeCourse &&
                    props.UserSubCribeCourse.registered_course &&
                    props.UserSubCribeCourse.registered_course.length}
                  )
                </h3>
                {props.UserSubCribeCourse &&
                props.UserSubCribeCourse.registered_course &&
                props.UserSubCribeCourse.registered_course.length == 0 ? (
                  <div>
                    <h1>No course yet</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Fugiat magni culpa numquam ratione! Ratione quae nesciunt
                      quam. Voluptas totam deserunt assumenda, nulla placeat
                      saepe quidem facere aspernatur, incidunt voluptate
                      consectetur!
                    </p>
                    <p>
                      <Link className="btn btn-primary" to="/courses">
                        {" "}
                        Browse our Courses{" "}
                      </Link>
                    </p>
                  </div>
                ) : (
                  <UserSubCribeCourses
                    remove={remove}
                    courses={
                      props.UserSubCribeCourse &&
                      props.UserSubCribeCourse.registered_course
                    }
                  />
                )}
              </Route>
              <Route path={`${path}/:topicId`}>
                <Topic
                  remove={remove}
                  courses={
                    props.UserSubCribeCourse &&
                    props.UserSubCribeCourse.registered_course
                  }
                />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    UserSubCribeCourse: state.user.user,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getUser,
  filterCourse,
  removeUserCourse
})(withRouter(Topics));
