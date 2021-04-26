import { React, useEffect, useState } from "react";
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
import { getUser, filterCourse } from "../../store/actions/actions";
import TimeAgo from "react-timeago";

import { Link, withRouter } from "react-router-dom";
import CompletedCourse from "./completed-courses";

function UserSubCribeCourseContainer(props) {
  const [index, setIndex] = useState(1);
  useEffect(() => {});
  const handleClick = (index) => {
    setIndex(index);
  };

  return (
    <div className="wrapper">
      <aside className="aside-bar">
        <div className="siderbar">
          <div className="aside-content p-4">
            <div>
              <List>
                <ListItem button onClick={() => handleClick(1)}>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Current Courses" />
                </ListItem>

                <ListItem button onClick={() => handleClick(2)}>
                  <ListItemIcon>
                    <CallMergeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Past Courses" />
                </ListItem>
                <ListItem button onClick={() => handleClick(3)}>
                  <ListItemIcon>
                    <BubbleChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Courses You Might Like" />
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </aside>
      <main
        className="mycourses container-fluid border-top border-info p-5"
        style={{ background: "#f5f6f7" }}
      >
        <div className="row">
          <div className="c100 p34 center">
            <span>34%</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
        </div>
        <div className="row p-5" style={{ background: "white" }}>
          {index == 1 && (
            <UserSubCribeCourses
              courses={
                props.UserSubCribeCourse &&
                props.UserSubCribeCourse.registered_course
              }
            />
          )}
          {index == 2 && <CompletedCourse />}
          {index == 3 && <h2>Other Courses You Might Like </h2>}
        </div>
      </main>
    </div>
  );
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    UserSubCribeCourse: state.user.user
  };
};

export default connect(mapStateToProps, { getUser, filterCourse })(
  withRouter(UserSubCribeCourseContainer)
);
