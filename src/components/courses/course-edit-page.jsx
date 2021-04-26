import { React, useEffect, useState, Fragment } from "react";
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
import axios from "axios";
import {
  getCourseChapters,
  addChapter,
  updateCourse
} from "../../store/actions/actions";
import { connect } from "react-redux";
import FormDialog from "../dialog";
import Button from "@material-ui/core/Button";
import TimeAgo from "react-timeago";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%"
    }
  }
}));

function CourseEditAction(props) {
  const classes = useStyles();

  /* add Chapter to course */

  let { courseId } = useParams();
  if (courseId === "add") {
    return (
      <div className="row p-5" style={{ background: "white" }}>
        <div className="col-md-8">
          <h2 className="display-4">Add a Chapter </h2>

          <form
            onSubmit={(e) =>
              props.AddChapterToCourse(e, props.location.state.course._id)
            }
          >
            <div className="form-group" className={classes.root}>
              <TextField
                error={props.error && props.error.title && true}
                helperText={props.error && props.error.title}
                id="outlined-basic"
                label="Chapter Title"
                variant="outlined"
                placeholder="chapter title"
                onChange={props.changeChapter}
                name="title"
                value={props.chapter.title}
              />
            </div>
            <div className="form-group" className={classes.root}>
              <TextField
                error={props.error && props.error.about && true}
                helperText={props.error && props.error.about}
                id="outlined-basic"
                label="About"
                variant="outlined"
                multiline
                rows="3"
                placeholder="about the Chapter"
                onChange={props.changeChapter}
                name="about"
                value={props.chapter.about}
              />
            </div>
            <div className="form-group" className={classes.root}>
              <Button variant="contained" color="primary" type="submit">
                Add Chapter
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (courseId === "chapter")
    /*
      select all chapters display them in select list 
      when adding lesson, the the selct will be poupluated  chapters name from db to add lesson

      if there is no chapter for course ; mesage chould display please click the chapter page to a  chapter then redirect to add lesson
      
    */
    return AddLessonToChapter(classes, props);

  // return (
  //   <div>
  //     <h3>{courseId}</h3>
  //   </div>
  // );
}

function AddLessonToChapter(classes, props) {
  return (
    <div>
      <div className="row p-5" style={{ background: "white" }}>
        <div className="col-md-8">
          {props.chapters.length == 0 && (
            <Fragment>
              <h1 className="display-4"> No Chapters</h1>
              <p className="lead">
                Please go back and add a chapter to your course
              </p>
              <p>
                <Link
                  to={{
                    pathname: "/editcourses/add",

                    state: { course: props.location.state.course }
                  }}
                >
                  Add Chapter
                </Link>
              </p>
            </Fragment>
          )}
          {props.chapters.length > 0 && (
            <Fragment>
              <h3 className="display-4"> A Lesson to a Chapter</h3>

              <form
                onSubmit={props.AddLessonToChapter}
                enctype="multipart/form-data"
              >
                <div className="form-group" className={classes.root}>
                  <TextField
                    id="outlined-basic"
                    label="Course Title"
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                    defaultValue={props.location.state.course.name}
                    placeholder="Lesson title"
                  />
                </div>
                <div className="form-group" className={classes.root}>
                  <select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={props.lesson.chapterId}
                    displayEmpty
                    onChange={props.handleChapterLessonChange}
                    name={"chapterId"}
                    className="form-control"
                  >
                    <option value="">Pick A Chapter</option>
                    {props.chapters.map((chapter) => (
                      <option value={chapter._id} key={chapter._id}>
                        {chapter.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" className={classes.root}>
                  <TextField
                    id="outlined-basic"
                    label="Lesson Title"
                    variant="outlined"
                    name="title"
                    value={props.lesson.title}
                    placeholder="Lesson title"
                    onChange={props.handleChapterLessonChange}
                  />
                </div>
                <div className="form-group" className={classes.root}>
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    value={props.lesson.about}
                    name="description"
                    rows="3"
                    placeholder="about the Chapter"
                    onChange={props.handleChapterLessonChange}
                  />
                </div>
                <div className="form-group" className={classes.root}>
                  <input
                    style={{ display: "none" }}
                    accept="video/mp4,video/x-m4v,video/"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    name="file"
                    type="file"
                    onChange={props.handleChapterLessonChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      size="large"
                    >
                      <i className="fas fa-video mr-1"></i> Upload video
                    </Button>
                  </label>
                </div>
                <div className="form-group" className={classes.root}>
                  <Button variant="contained" color="primary" type="submit">
                    Add Chapter
                  </Button>
                </div>
              </form>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseEditPage(props) {
  let { path, url } = useRouteMatch();
  // states
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState({
    chapterId: "",
    title: "",
    about: "",
    completed: false,
    courseid: props.location.state ? props.location.state.course._id : null
  });
  const [currentCourseStatus, setCurrentCourseStatus] = useState(
    props.location.state && props.location.state.course.status === "Published"
      ? true
      : false
  );

  const [lesson, setLesson] = useState({
    cover: "",
    description: "",
    title: "",
    video: "",
    chapterId: ""
  });
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  // //const [chapter, setChapter] =useState({title:"", about:""})
  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);
  // const [isLoggedIn, setisLoggedIn] = useState(
  //   props.user == null ? false : true
  // );
  // console.log("line 229", isLoggedIn);

  useEffect(() => {
    // props.getCourseChapters(props.location.state.course._id);
    if (props.location.state) {
      props.getCourseChapters(props.location.state.course._id);
    }

    // return () => {
    //   // Clean up the subscription

    // };
  }, []);

  //redirect if there no <props className="location state">if(</props>
  if (!props.location.state) {
    return <Redirect to="/courses" />;
  }

  const handleChapterChangeEdit = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    const chapterCopy = { ...chapter };
    chapterCopy[name] = value;
    setChapter(chapterCopy);
  };
  const handleChapterChange = ({ currentTarget }) => {
    const chapterCopy = { ...chapter };
    chapterCopy[currentTarget.name] = currentTarget.value;
    const err = { ...error };
    if (chapterCopy.title === "") {
      err.title = "Please enter a Title";
      //err.about = "Please enter a short description for the chapter";
      setError(err);
    } else {
      setError(null);
    }

    setChapter(chapterCopy);
  };
  const handleChapterLessonChange = ({ currentTarget }) => {
    if (currentTarget.files) {
      setFile(currentTarget.files[0]);
    }
    const lessonCopy = {
      ...lesson
    };
    lessonCopy[currentTarget.name] = currentTarget.value;

    setLesson(lessonCopy);
  };

  const AddChapterToCourse = (e, id) => {
    e.preventDefault();
    const courseid = id;
    // post request

    const url = `${process.env.REACT_APP_ENDPOINT}chapters/create`;
    const err = { ...error };

    if (chapter.title === "" && chapter.about === "") {
      err.title = "Please enter a Title";
      err.about = "Please enter a short description for the chapter";
      setError(err);
    }
    if (chapter.about === "") {
      err.about = "Please enter a short description for the chapter";
      setError(err);
    }

    if (chapter.title !== "" && chapter.about !== "") {
      setError(null);
      axios
        .post(url, chapter)
        .then((response) => {
          props.getCourseChapters(props.location.state.course._id);
          showToast("Chapter added successfully...", "success");
          const chapterCopy = { ...chapter };
          chapterCopy.title = "";
          chapterCopy.about = "";

          setChapter(chapterCopy);
        })
        .catch((error) => console.log(error));
    }
  };
  const AddLessonToChapter = (e) => {
    e.preventDefault();

    /*
    validate the form. make sure every field is given.
  

    */

    console.log(file);

    var formData = new FormData();
    formData.append("file", file, file.name);

    const url = `${process.env.REACT_APP_ENDPOINT}chapters/upload/file`;
    console.log(url);

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleChangeCourseStatus = (e) => {
    const course = props.location.state.course;
    // post request to updateCourse the course status
    if (currentCourseStatus) {
      setCurrentCourseStatus(false);
      props.updateCourse(course._id, "Draft");
    } else {
      setCurrentCourseStatus(true);
      props.updateCourse(course._id, "Published");
    }
  };

  // delete a chapter for the course

  const deleteCourseChaper = (chapterId) => {
    // post or delete request to server to delete chapter base on chapter id provided
    const url = `${process.env.REACT_APP_ENDPOINT}chapters/remove/${chapterId}`;
    axios
      .post(url, { chapterId })
      .then((response) => {
        props.getCourseChapters(props.location.state.course._id);
        showToast("deleted  successfully...", "error");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <aside className="aside-bar">
        <div className="siderbar">
          <div className="aside-content p-4">
            <ul className="nav left-nav flex-column list-group list-group-flush">
              <li className="nav-item list-group-item list-group-item-action">
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: `${path}`,
                    state: { course: props.location.state.course }
                  })}
                >
                  current
                </Link>
              </li>
              <li className="nav-item list-group-item list-group-item-action">
                {/* <Link to={`${url}/add`}>Add Chapter</Link> */}
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: `${path}/add`,
                    state: { course: props.location.state.course }
                  })}
                >
                  Add
                </Link>
              </li>
              <li className="nav-item list-group-item list-group-item-action">
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: `${path}/chapter`,
                    state: { course: props.location.state.course }
                  })}
                >
                  Add Lesson
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main
        className="mycourses container-fluid border-top border-info p-5"
        style={{ background: "#f5f6f7" }}
      >
        <div>
          <Switch>
            <div>
              <Route exact path={path}>
                <div>
                  <div className="row p-5" style={{ background: "#eee" }}>
                    <div className="col-md-12">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch1"
                          onChange={handleChangeCourseStatus}
                          checked={currentCourseStatus}
                        />
                        <label
                          className="custom-control-label"
                          for="customSwitch1"
                        >
                          {currentCourseStatus
                            ? props.location.state.course.status
                            : "Draft"}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        width="100%"
                        src={props.location.state.course.cover}
                        alt={props.location.state.course.name}
                        className="border p-2"
                      />
                    </div>
                    <div className="col-md-7">
                      <p className="small">
                        <TimeAgo date={props.location.state.course.createdAt} />
                      </p>

                      <h1>{props.location.state.course.name}</h1>
                      <p>{props.location.state.course.about}</p>
                    </div>
                  </div>

                  <div className="lessons">
                    <div className="row p-5" style={{ background: "white" }}>
                      {props.chapters && props.chapters.length == 0 && (
                        <div>
                          <h3>No Lessons yet</h3>
                          <p className="lead">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Cupiditate obcaecati rerum sit esse quae ipsam
                            id odit, inventore cum voluptatibus temporibus iste
                            aperiam saepe optio nulla illo eaque itaque nobis.
                          </p>
                          <p>
                            {" "}
                            <Button
                              //data-chapter={chapter}
                              variant="outlined"
                              color="secondary"
                              size="large"
                            >
                              Add a Chapter
                            </Button>
                          </p>
                        </div>
                      )}
                      {props.chapters && props.chapters.length > 0 && (
                        <div className="col-md-12">
                          <h3>
                            Course Chapters <i className="fas fa-cubes"></i>
                          </h3>{" "}
                        </div>
                      )}

                      {props.chapters &&
                        props.chapters.map((currentChapter, index) => (
                          <Fragment>
                            <div
                              className="lesson-wrapper col-md-12 mt-5"
                              key={currentChapter._id}
                            >
                              <h3>
                                {currentChapter.title}
                                <IconButton
                                  color="primary"
                                  aria-label="upload picture"
                                  component="span"
                                  //data-currentChapter={currentChapter}
                                  variant="text"
                                  data-toggle="modal"
                                  data-target="#exampleModalScrollable"
                                  //data-currentChapter={currentChapter}
                                >
                                  <i className="fas fa-edit"></i>
                                </IconButton>
                                <IconButton
                                  color="secondary"
                                  aria-label="upload picture"
                                  component="span"
                                  //data-currentChapter={currentChapter}
                                  variant="text"
                                  onClick={() =>
                                    deleteCourseChaper(currentChapter._id)
                                  }
                                >
                                  <i className="fas fa-trash"></i>
                                </IconButton>
                              </h3>

                              <p className="lead">{currentChapter.about}</p>
                              <p className="lead text-info">
                                <i className="fas fa-video fa-lg mr-1"></i>
                                {currentChapter.lessons.length} lessons
                              </p>
                              <hr />

                              <FormDialog
                                chapterId={currentChapter._id}
                                change={handleChapterChangeEdit}
                                currentChapter={currentChapter}
                                open={open}
                                courseId={props.location.state.course._id}
                              />
                              {/* <div className="row">
                                {chapter.lessons.map((lesson) => (
                                  <div
                                    className="lesson-wrapper col-md-2"
                                    key={lesson.title}
                                  >
                                    <img
                                      width="100%"
                                      src={lesson.cover}
                                      alt={lesson.title}
                                    />
                                    <p>{lesson.title}</p>
                                  </div>
                                ))}
                              </div> */}
                            </div>
                            {/* <div className="col-md-12">
                              <Button
                                //data-chapter={chapter}
                                variant="outlined"
                                color="primary"
                                onClick={() => handleClickOpen(chapter)}
                              >
                                Add a Lesson
                              </Button>
                            </div> */}
                          </Fragment>
                        ))}
                    </div>

                    {/* {chapter.lessons.length == 0 && (
                      <p>
                        <Link className="btn btn-primary" to="/courses">
                          {" "}
                          Add a Lesson{" "}
                        </Link>
                      </p>
                    )} */}
                  </div>
                </div>
              </Route>
              <Route
                path={`${path}/:courseId`}
                render={(routeProps) => (
                  <CourseEditAction
                    AddLessonToChapter={AddLessonToChapter}
                    handleChapterLessonChange={handleChapterLessonChange}
                    error={error}
                    chapter={chapter}
                    lesson={lesson}
                    AddChapterToCourse={AddChapterToCourse}
                    changeChapter={handleChapterChange}
                    chapters={props.chapters && props.chapters}
                    getCourseChapters={props.getCourseChapters}
                    {...routeProps}
                  />
                )}
              />
            </div>
          </Switch>
        </div>
      </main>
    </div>
  );
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    chapters: state.chapters.chapters,
    user: state.user.user
  };
};
export default connect(mapStateToProps, {
  getCourseChapters,
  addChapter,
  updateCourse
})(withRouter(CourseEditPage));
