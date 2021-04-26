import { Component } from "react";
import Jumbotron from "../jumbotron";

import axios from "axios";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./courses.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import CourseSection from "./course-section";
import {
  getUser,
  getComments,
  addCourseUserSubscriptionList,
  isRegisteredToCourse
} from "../../store/actions/actions";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import FormatIndentIncreaseOutlinedIcon from "@material-ui/icons/FormatIndentIncreaseOutlined";
import SideNavBar from "../sidebar";
import { Player, BigPlayButton } from "video-react";

class Course extends Component {
  state = {
    lists: null,
    isLoaded: false,
    sectionShow: false,
    closedSidebar: true,
    section: null,
    styles: {
      closed: {
        minWidth: "5%",
        width: "5%",
        transition: "width 500ms",
        marginLeft: "-0px"
      },
      open: {
        minWidth: "15%",
        width: "15%",
        transition: "all 500ms",
        marginLeft: "2px"
      }
    },
    isRegistered: false
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;

    this.props.isRegisteredToCourse(id);
    const course = await axios.get(
      `https://congn.sse.codesandbox.io/courses/${id}`
    );

    if (course.data.error) {
      const errorMsg = course.data.message;
      // redirect with flash error message
      this.props.history.push("/courses");
    } else {
      this.setState({ lists: course.data, isLoaded: true });
    }
  };
  showSection = (sub) => {
    this.setState({ section: sub });
  };

  toggleSideBar = (e) => {
    if (this.state.closedSidebar) {
      this.setState({ closedSidebar: false });
    } else {
      this.setState({ closedSidebar: true });
    }
  };
  startCourse = () => {
    // if user is not login redirect to ligin
    if (!this.props.user) {
      toast.info("You must log in to start coiurse", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      // redirect to login
      this.props.history.push("/login");
    } else {
      //add course to users course subscription list

      this.props.addCourseUserSubscriptionList(
        this.state.lists,
        this.props.user.id
      );
      const { id } = this.props.match.params;
      this.props.isRegisteredToCourse(id);

      // update user's registerd course in local storage as well
    }
  };

  render() {
    return (
      <div className="wrapper-course">
        <div className="jumbotron  rounded-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Player
                  playsInline
                  src={
                    "https://player.vimeo.com/external/334495726.sd.mp4?s=5c18cee8d585c4fd22b98c5af54d0dc4eeef1bda&profile_id=139&oauth2_token_id=57447761"
                  }
                  poster={""}
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
              <div className="col-md-6">
                <p className="small text-secondary">
                  {this.state.lists && this.state.lists.category}
                </p>

                <h1 className="display-4" style={{ fontSize: "30px" }}>
                  {this.state.lists && this.state.lists.name}
                </h1>

                <p className="lead">
                  {this.state.lists && this.state.lists.about}
                </p>
                <hr className="my-4" />
                <p className="small">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus totam non asperiores
                </p>

                {/* disable button if user already registered to course. */}
                {/* To be implemented.   get course id from forwarded link instaed of parm*/}
                {this.props.courseFound == 1 && (
                  <Link
                    to={`/subscribe/${this.props.match.params.id}`}
                    className="btn  btn-lg  btn-warning "
                  >
                    View Course <i className="fas fa-angle-right"></i>
                  </Link>
                )}
                {!this.props.courseFound && (
                  <button
                    onClick={this.startCourse}
                    className={"btn  btn-lg  btn-info"}
                  >
                    Start Course
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="container">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* <div className="row course-filter jumbotron rounded-0 mb-2"></div> */}

          <div className="row">
            <div className="col-md-9 mb-5">
              <div className="course-view-detail">
                <h2 className="display-5">Course Objectves</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus totam non asperiores nam cumque accusantium
                  recusandae. Temporibus, reiciendis! Provident aut reiciendis
                  sint, saepe alias ea eligendi vitae ad ut iusto Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Ducimus totam non
                  asperiores nam cumque accusantium recusandae. Temporibus,
                  reiciendis! Provident aut reiciendis sint, saepe alias ea
                  eligendi vitae ad ut iusto
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus totam non asperiores nam cumque accusantium
                  recusandae. Temporibus, reiciendis! Provident aut reiciendis
                  sint, saepe alias ea eligendi vitae ad ut iusto Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Ducimus totam non
                  asperiores nam cumque accusantium recusandae. Temporibus,
                  reiciendis! Provident aut reiciendis sint, saepe alias ea
                  eligendi vitae ad ut iusto
                </p>
                <div className="course_prerequisites pl-3 mt-5 pt-2 pb-2">
                  <h3 className="prereq-title mt-3">Prerequisites</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Libero totam amet vero pariatur, dolore a corrupti facere
                    sint vel nisi aspernatur quam! Quos debitis vero vel
                    molestiae, rerum earum doloremque?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="course-instructor-detail">
                <h3 className="title">Your instructor</h3>

                <div className="course_instructor_image">
                  <Link to="#">
                    <img
                      className="rounded-circle"
                      width="60%"
                      src="https://img.etimg.com/thumb/width-640,height-480,imgsize-144736,resizemode-1,msid-69037337/small-biz/startups/newsbuzz/fraud-is-only-possible-if-user-grants-access-oldrich-mller-coo-anydesk/oldrich-muller.jpg"
                      alt="instructor image"
                    />
                  </Link>
                  <h5 className="instructor-name">
                    {this.props.user && this.props.user.name}
                  </h5>
                  <p className="instructor-description">
                    {" "}
                    {this.props.user && this.props.user.bio}
                  </p>
                  <hr className="my-4" />
                  <div className="instructor-bio">
                    {this.props.user && this.props.user.about}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    courseFound: state.user.coursefound
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getComments,
    addCourseUserSubscriptionList,
    isRegisteredToCourse
  })(Course)
);

{
  /* <SideNavBar
          coursename={this.state.lists && this.state.lists.name}
          toggleSideBar={this.toggleSideBar}
          closedSidebar={this.state.closedSidebar}
          style={
            this.state.closedSidebar
              ? this.state.styles.closed
              : this.state.styles.open
          }
        >
          <div className="siderbar">
            {this.state.lists &&
              this.state.lists.sections.map((value) => (
                <div
                  key={value.id}
                  className="accordion"
                  id="accordionExample"
                  style={{ textAlign: "left" }}
                >
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                          style={{
                            fontWeight: "bold",
                            color: "#888",
                            fontFamily: "Lato"
                          }}
                        >
                          {value.title}
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div
                        className="card-body p-0"
                        style={{ textAlign: "left" }}
                      >
                        <ul className="list-group">
                          {value.sub_section &&
                            value.sub_section.map((sub) => (
                              <li
                                className="list-group-item rounded-0"
                                key={sub.id}
                                onClick={() => this.showSection(sub)}
                                data-subs={sub["id"]}
                              >
                                <div>
                                  <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                      <div
                                        style={{ background: "none" }}
                                        className="input-group-text border-0 mr-1"
                                      >
                                        <input
                                          checked={sub["completed"]}
                                          type="checkbox"
                                          aria-label="Checkbox for following text input"
                                        />
                                      </div>
                                    </div>
                                    <Link to="#"> {sub["sub_title"]}</Link>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </SideNavBar> */
}
