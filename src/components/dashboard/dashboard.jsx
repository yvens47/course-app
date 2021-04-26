import { Link, Redirect, withRouter } from "react-router-dom";

import { useState, useEffect } from "react";

import { Tabs } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import TabPanel from "./tabpanel";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FullScreenDialog from "./dialog";
import { connect } from "react-redux";
import { removeUserPostedCourse } from "../../store/actions/actions";
import EditForm from "../courses/edit-course-form";
// images
import onlineCouse from "../../elearning.svg";
import conference from "../../conference.svg";
import onlinecourse from "../../online-course.png";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

// fake dataBar
import { barData, lineData } from "./dummydata";

import "./dashboard.css";
import Sidebar from "./sidebar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderBottom: "solid 1px #eee"
  }
});

function Dashboard(props) {
  const [value, setValue] = useState(1);
  const [userCourses, setUserCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [account, setAccount] = useState({
    email: props.user.email,
    name: props.user.name,
    bio: props.user.bio,
    id: props.user.id
  });
  // full window dialog
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const change = ({ target }) => {
    const userAccount = { ...account };
    userAccount[target.name] = target.value;
    setAccount(userAccount);
  };
  /* udapte user account settings */
  const update = async ({ target }) => {
    event.preventDefault();
    // put request to server to update db
    const endpointUrl = `${process.env.REACT_APP_ENDPOINT}users/${props.user.id}/update`;

    const updateDb = await axios({
      method: "put",
      url: endpointUrl,

      data: account
    });

    if (updateDb.data.success) {
      alert(" Your account has been updated");
      // update the local storage as well
      window.localStorage.setItem("user", JSON.stringify(account));
    } else {
      alert(" Sorry! We are unable to update your account at this time ");
    }
  };

  /* delete user course */

  const handleDelete = (course) => {
    const endpoint = `https://congn.sse.codesandbox.io/courses/${course._id}`;
    props.removeUserPostedCourse(course._id, props.user.id, endpoint);
  };
  const handleEdit = (course) => {
    //setOpen(true);
    props.history.push({
      pathname: "/editcourses",

      state: { course: course }
    });

    setCourse(course);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}` +
          "users/" +
          props.user.id +
          "/courses"
      )
      .then((response) => {
        // handle success

        setUserCourses(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  const editCourse = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <main>
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-2">
              <Sidebar user={props.user} profileUpload={() => setOpen(true)} />
            </div>
            <div className="col-md-10">
              <Paper className={classes.root} square elevation={0}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                >
                  <Tab label="My Account" icon={<SettingsIcon />} />
                  <Tab label="Dashboard" icon={<DashboardIcon />} />
                  <Tab
                    label={`My courses(${userCourses.length})`}
                    icon={<ListIcon />}
                  />
                </Tabs>
              </Paper>
              <TabPanel value={value} index={0}>
                <div className="dashboard-wrapper pt-3 pb-3 rounded border">
                  <div className="container-fluid">
                    <div className="row mt-3">
                      <div className="col-md-8">
                        <h2 className="display-4">Edit your Account</h2>
                        <hr />
                        <form onSubmit={update}>
                          <div className="form-group">
                            <label for="exampleFormControlInput1">Name</label>
                            <input
                              onChange={change}
                              type="text"
                              className="form-control"
                              name="name"
                              value={account.name}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlInput1">
                              Email address
                            </label>
                            <input
                              onChange={change}
                              type="email"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="name@example.com"
                              name="email"
                              value={account.email}
                              disabled
                            />
                          </div>

                          <div className="form-group">
                            <label for="exampleFormControlTextarea1">
                              About
                            </label>
                            <textarea
                              onChange={change}
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              name="bio"
                              rows="3"
                              placeholder="a little about your self"
                            >
                              {account.bio}
                            </textarea>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-secondary">
                              <EditIcon />
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* <h2 className="display-5">Dashboard</h2> */}
                <div className="dashboard-wrapper pt-3 pb-3 rounded border">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-4 text-center">
                        <Paper elevation={3} className="p-3">
                          <Pie
                            data={{
                              labels: ["Published", "Draft"],
                              datasets: [
                                {
                                  data: [300, 50],
                                  backgroundColor: [
                                    "#3f51b5",
                                    "#fe7491",
                                    "#FFCE56"
                                  ],
                                  hoverBackgroundColor: [
                                    "#6975b8",
                                    "#e36e87",
                                    "#FFCE56"
                                  ],
                                  borderColor: [
                                    "#818abc",
                                    "#b55f71",
                                    "rgba(255, 206, 86, 1)"
                                  ],
                                  borderWidth: 1
                                }
                              ]
                            }}
                          />
                          {/* <img
                            alt="number of courses"
                            height="40%"
                            width="30%"
                            src={onlineCouse}
                          /> */}
                          <h3 className="display-5">{userCourses.length}</h3>
                          courses
                        </Paper>
                      </div>
                      <div className="col-md-4 text-center">
                        <Paper elevation={3} className="p-3">
                          <img height="40%" width="30%" src={conference} />
                          <h3 className="display-5">84</h3>
                          Lectures
                        </Paper>
                      </div>
                      <div className="col-md-4 text-center">
                        <Paper elevation={3} className="p-3">
                          <img height="40%" width="30%" src={onlinecourse} />
                          <h3 className="display-5">84</h3>
                          Students
                        </Paper>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-6">
                        <Bar data={barData} />
                      </div>
                      <div className="col-md-6">
                        <div className="year">
                          <select name="year">
                            {["2019", "2020", "2021"].map((year) => (
                              <option>{year}</option>
                            ))}
                          </select>
                        </div>
                        <Line data={lineData} />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="dashboard-wrapper pt-3 pb-3 rounded border">
                  <div className="container-fluid">
                    {userCourses.length === 0 && (
                      <div className="row">
                        <div className="col-md-8">
                          <h3 className="display-4">
                            You currently have no course yet
                            <hr />
                          </h3>
                          <p className="">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Architecto incidunt atque facilis itaque minus
                            aliquid, praesentium mollitia cumque expedita, vitae
                            voluptatum corporis perferendis necessitatibus!
                            Explicabo beatae facere excepturi exercitationem
                            quos?
                          </p>
                          <p>
                            <Link to="/new" className="btn btn-info rounded-0">
                              Add a Course
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                    {userCourses.map((course) => (
                      <div className="row mt-3" key={course._id}>
                        <div className="media">
                          <img
                            src={
                              course.cover
                                ? course.cover
                                : "https://via.placeholder.com/500"
                            }
                            width="10%"
                            className="align-self-start mr-3 img-thumbnail rounded "
                            alt="..."
                          />

                          <div className="media-body p-2 flex-fill bd-highlight">
                            <div className="row">
                              <div className="col">
                                <h5 className="mt-0">{course.name}</h5>
                                <span
                                  className={
                                    course.status === "Draft"
                                      ? "badge badge-info"
                                      : "badge badge-primary"
                                  }
                                >
                                  {course.status}
                                </span>
                                <span className="ml-1 badge badge-secondary">
                                  {course.category}
                                </span>
                              </div>
                              <div className="col">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-default "
                                    type="button"
                                    id="dropdownMenu2"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <MoreVertIcon />
                                  </button>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenu2"
                                  >
                                    <button
                                      className="dropdown-item"
                                      type="button"
                                      onClick={(e) => handleDelete(course)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="dropdown-item"
                                      type="button"
                                      onClick={(e) => handleEdit(course)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p>{course.about.substr(0, 100)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>

              <FullScreenDialog
                title={"Upload Profile Picture"}
                editCourse={editCourse}
                course={course}
                open={open}
                // handleClickOpen={handleEdit}
                handleClose={handleClose}
              >
                <div>
                  <h2 className="display-4">Upload Your Profile Pic</h2>
                  <hr />
                  <p className="lead">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Earum illum iusto nulla temporibus repellat quod ducimus
                    excepturi
                  </p>
                  <div className={"upload-wrapper"}></div>
                </div>
              </FullScreenDialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps, { removeUserPostedCourse })(
  withRouter(Dashboard)
);
