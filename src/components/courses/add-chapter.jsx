import { React, useState } from "react";
import "./courses.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddChapterForm from "./add-chapter-form";
import AddChapterItemsForm from "./addChapterItemsForm";

const currencies = [
  {
    value: "USD",
    label: "my new course"
  },
  {
    value: "EUR",
    label: "scelerisque dui viverra id"
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%"
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      padding: theme.spacing(3)
    },
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));
function getSteps() {
  return ["Add Course Chapter", "Chapter Lesson"];
}

function AddChapter(props) {
  const [currency, setCurrency] = useState("EUR");
  const [value, setValue] = useState("Controlled");
  const [activeStep, setActiveStep] = useState(0);
  const [chapterDetail, setChapterDetail] = useState({
    title: "",
    courseid: props.location.state.courseid,
    about: "",
    lessons: [],
    completed: false
  });

  const handleChange = (event) => {
    // alert("content change change");

    const cDetail = { ...chapterDetail };
    cDetail[event.target.name] = event.target.value;
    setChapterDetail(cDetail);
  };
  const classes = useStyles();
  return (
    <div className="wrapper">
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
}

export default AddChapter;
