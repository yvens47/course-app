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
import "./styles.css";
import axios from "axios";
import HomePage from "./components/pages/index";
import MainNavbar from "./components/main-navbar";
import Footer from "./components/footer";
import Courses from "./components/courses/courses";
import Course from "./components/courses/view-course";
import NewCourse from "./components/courses/new-course";
import Login from "./components/login/login";
import Register from "./components/login/register";
import { useState, useEffect, Fragment } from "react";
import Dashboard from "./components/dashboard/dashboard";
import { connect } from "react-redux";
import { getUser } from "./store/actions/actions";
import { getCourses } from "./store/actions/actions";
import UserSubCribeCourseContainer from "./components/dashboard/my-courses";
import ForgotPassword from "./components/login/forgot-password";
import Topics from "./components/dashboard/topics";
import CourseRegisteredDetail from "./components/courses/course-details";
import AddChapter from "./components/courses/add-chapter";
import CourseEditPage from "./components/courses/course-edit-page";
import ViewChapterVideo from "./components/courses/view-chapter-videos";

function App(props) {
  const [user, setUser] = useState(null);
  //const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (window.localStorage.user) {
      setUser(() => JSON.parse(window.localStorage.user));
    }
    props.dispatch(getCourses());
    props.dispatch(getUser(user));
  }, []);

  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();

    // clear user data from local storage
    window.localStorage.removeItem("user");
    //logout from backend as well
    // post request to login
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API}` + "users/logout"
    })
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });

    // redirect
    // history.push("/");
    props.dispatch(getUser(null));
  };

  return (
    <div className="App">
      <div>
        {/* navbar */}
        <MainNavbar user={props.user} logout={logout} />
        <Route exact path="/">
          <HomePage />
        </Route>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:id" component={() => <Course user={user} />} />
          <Route
            exact
            path="/subscribe/:courseid"
            render={(routeProps) => <CourseRegisteredDetail {...routeProps} />}
          />
          <Route path="/subscribe">
            <Redirect to="/" />
          </Route>

          <Route
            exact
            path="/new"
            render={(routerProps) => <NewCourse user={user} {...routerProps} />}
          />

          <Route
            exact
            path="/chapter/:id"
            render={(routerProps) => (
              // <CourseEditPage user={user} {...routerProps} />
              <ViewChapterVideo {...routerProps} />
              // <AddChapter user={user} {...routerProps} />
            )}
          />

          <Route
            exact
            path="/login"
            render={(routeProps) =>
              props.user ? (
                <Redirect to="/dashboard" />
              ) : (
                <Login {...routeProps} />
              )
            }
          />

          <Route exact path="/register">
            {props.user ? <Redirect to="/dashboard" /> : <Register />}
          </Route>
          <Route
            exact
            path="/forget-password"
            render={(routeProps) =>
              props.user ? (
                <Redirect to="/dashboard" />
              ) : (
                <ForgotPassword {...routeProps} />
              )
            }
          />
        </Switch>
        <Switch>
          <Route path="/editcourses">
            {!props.user ? (
              <Redirect to="/login" />
            ) : (
              <CourseEditPage user={user} />
            )}
          </Route>
          <Route path="/mycourses">
            <Topics />
          </Route>
        </Switch>
        <Switch>
          {/* dashboard routes begin */}
          <Route exact path="/dashboard">
            {!props.user ? <Redirect to="/login" /> : <Dashboard user={user} />}
          </Route>

          <Route
            path="/dashboard/edit/:id"
            render={(routeProps) =>
              props.user ? (
                <h2>course to be edited here</h2>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* dashboard routes ends */}
        </Switch>

        <Footer />
      </div>
    </div>
  );
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    courses: state.courses.courses,
    user: state.user.user
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUser: getUser,
//     getCourses: getCourses
//   };
// };

export default connect(mapStateToProps)(withRouter(App));
