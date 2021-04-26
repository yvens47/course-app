import { useState, useEffect } from "react";

import { Player, BigPlayButton } from "video-react";
import SideNavBar from "../sidebar";
import Button from "@material-ui/core/Button";
import fakeLessons from "./fakedata/fakedata.json";
import fakeDiscussions from "./fakedata/discussions.json";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import TabPanel from "../tabpanel";
import TimeAgo from "react-timeago";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ForumIcon from "@material-ui/icons/Forum";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  rootText: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%"
    }
  }
}));

function ViewChapterVideo(props) {
  const classes = useStyles();
  const [currentPos, setCurrentPos] = useState(0); // current lessons[current pos]
  const [currentChapter, setCurrentChapter] = useState(0); //current chapter the lessons currently being viewed
  const [value, setValue] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [ChaptercompletedLesson, setChapterCompletedLesson] = useState({});

  const [lessons, setLessons] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const toggleSideBar = () => {};
  const closedSidebar = () => {};

  useEffect(() => {
    // console.log(
    //   "current chapter",
    //   currentChapter,
    //   props.location.state.chapters[currentChapter]
    // );
    if (props.location.state) {
      setLessons(props.location.state.chapters[currentChapter].lessons);
      setChapters(props.location.state.chapters);
      setDiscussions(fakeDiscussions);
      setCurrentChapter(props.location.state.current);
    }
  }, []);

  const getNext = () => {
    if (currentPos < lessons.length - 1) setCurrentPos(currentPos + 1);
  };
  const isAtEnd = () => {
    return currentPos === lessons.length - 1;
  };
  const isAtNextChapterEnd = () => {
    return currentChapter === chapters.length - 1;
  };

  const handleListItemClick = (event, index, chapterIndex) => {
    setCurrentChapter(chapterIndex);
    setSelectedIndex(index);
    setCurrentPos(index);
  };

  const getNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      getNext();
    } else {
      // do something with next chpater button
    }
  };

  function navButton() {
    if (isAtEnd()) {
      return (
        <Button
          onClick={getNextChapter}
          variant="outlined"
          color="primary"
          size="large"
        >
          Next Chapter
        </Button>
      );
    }

    return (
      <Button onClick={getNext} variant="outlined" color="primary" size="large">
        Proceed to Next Lesson
      </Button>
    );
  }
  if (!props.location.state) {
    return <Redirect to="/dashboard" />;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // when checked box  changed  for a specifiq lesson to either complete or not

  const handlecLessonCompleted = ({ currentTarget }, currentLessonChapter) => {
    console.log(currentTarget);
  };

  return (
    <div className="wrapper">
      <SideNavBar
        // coursename={this.state.lists && this.state.lists.name}
        toggleSideBar={toggleSideBar}
        closedSidebar={closedSidebar}
        // style={
        //   this.state.closedSidebar
        //     ? this.state.styles.closed
        //     : this.state.styles.open
        // }
      >
        <div className={classes.root}>
          {chapters.map((chapter, chapterIndex) => (
            <Accordion
              onChange={() => handleAccordionChange(chapterIndex)}
              color="primary"
              elevation="0"
              defaultExpanded={true}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                    {chapter.title}{" "}
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component="nav" aria-label="main mailbox folders">
                  {chapter.lessons.map((lesson, index) => (
                    <ListItem
                      button
                      selected={selectedIndex === index}
                      onClick={(event) =>
                        handleListItemClick(event, index, chapterIndex)
                      }
                    >
                      {lesson.completed}
                      <Checkbox
                        onChange={() => handlecLessonCompleted(chapter)}
                        checked={lesson.completed}
                        color="primary"
                      />
                      <ListItemText
                        primary={lesson.title}
                        secondary={`${index * 2}min`}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* <List component="nav" aria-label="main mailbox folders">
            {chapters[currentChapter] &&
              chapters[currentChapter].lessons.map((lesson, index) => (
                <ListItem
                  button
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  {lesson.completed}
                  <Checkbox checked={lesson.completed} color="primary" />
                  <ListItemText
                    primary={lesson.title}
                    secondary={`${index * 2}min`}
                  />
                </ListItem>
              ))}
          </List> */}
        </div>
      </SideNavBar>

      <div className="container">
        <div className=" row pt-5">
          <div className="col-md-9">
            <Player
              playsInline
              src={
                chapters[currentChapter] &&
                chapters[currentChapter].lessons[currentPos]["video"]
              }
              poster={""}
            >
              <BigPlayButton position="center" />
            </Player>
            {JSON.stringify(Player)}

            <div className="dtails-desc mt-5">
              <Paper className={classes.root} square elevation={0}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                >
                  <Tab label="Description" icon={<InfoIcon />} />

                  <Tab
                    icon={<ForumIcon />}
                    label={`Course Discussions (${discussions.length})`}
                  />
                </Tabs>
              </Paper>
              <TabPanel value={value} index={0}>
                <div className="details-title">
                  <h1>
                    {chapters[currentChapter] &&
                      chapters[currentChapter].lessons[currentPos]["title"]}
                  </h1>
                </div>
                <p className="chapter-desc">
                  {chapters[currentChapter] &&
                    chapters[currentChapter].lessons[currentPos]["description"]}
                </p>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className={classes.rootText + " pt-4"}>
                  <div className="row">
                    <div className="col-6 ">
                      <p className="lead d-inline m-2">
                        {discussions.length} Discussions
                      </p>
                      <div className="dropdown d-inline">
                        <button
                          className="btn  btn-outline-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-sort-amount-down"></i>
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu2"
                        >
                          <button className="dropdown-item" type="button">
                            Action
                          </button>
                          <button className="dropdown-item" type="button">
                            Another action
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                    placeholder="Add a discussion"
                    variant="outlined"
                  />
                </div>
                <div className="details-title"></div>

                {discussions.map((discussion) => (
                  <div className="media  mt-2 p-3">
                    <img
                      width="10%"
                      src="https://images.vexels.com/media/users/3/135246/isolated/preview/df491bf444acfa945630c22389140d4a-user-shadow-icon-by-vexels.png"
                      className="mr-3"
                      alt="..."
                    />
                    <div className="media-body">
                      <p className="mt-0 lead ">
                        {discussion.name + " "}
                        <span className="small">
                          <TimeAgo date={discussion.createdAt} />
                        </span>
                      </p>

                      {discussion.discussion}
                      <div className="discussion-icons">
                        <Button>
                          {" "}
                          <i className="fas fa-thumbs-up"></i>
                        </Button>

                        <Button>
                          <i className="fas fa-thumbs-down"></i>
                        </Button>
                        <Button>Reply</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabPanel>
            </div>
          </div>
          <div className="vol-md-3">gssdgds</div>
          <div className="col-md-11 pt-4">{navButton()}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewChapterVideo;

// {this.state.lists &&
//   this.state.lists.sections.map((value) => (
//     <div
//       key={value.id}
//       className="accordion"
//       id="accordionExample"
//       style={{ textAlign: "left" }}
//     >
//       <div className="card">
//         <div className="card-header" id="headingOne">
//           <h2 className="mb-0">
//             <button
//               className="btn btn-link"
//               type="button"
//               data-toggle="collapse"
//               data-target="#collapseOne"
//               aria-expanded="true"
//               aria-controls="collapseOne"
//               style={{
//                 fontWeight: "bold",
//                 color: "#888",
//                 fontFamily: "Lato"
//               }}
//             >
//               {value.title}
//             </button>
//           </h2>
//         </div>

//         <div
//           id="collapseOne"
//           className="collapse"
//           aria-labelledby="headingOne"
//           data-parent="#accordionExample"
//         >
//           <div
//             className="card-body p-0"
//             style={{ textAlign: "left" }}
//           >
//             <ul className="list-group">
//               {value.sub_section &&
//                 value.sub_section.map((sub) => (
//                   <li
//                     className="list-group-item rounded-0"
//                     // key={sub.id}
//                     onClick={() => this.showSection(sub)}
//                     // data-subs={sub["id"]}
//                   >
//                     <div>
//                       <div className="input-group mb-3">
//                         <div className="input-group-prepend">
//                           <div
//                             style={{ background: "none" }}
//                             className="input-group-text border-0 mr-1"
//                           >
//                             <input
//                               checked={sub["completed"]}
//                               type="checkbox"
//                               aria-label="Checkbox for following text input"
//                             />
//                           </div>
//                         </div>
//                         {/* <Link to="#"> {sub["sub_title"]}</Link> */}
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
