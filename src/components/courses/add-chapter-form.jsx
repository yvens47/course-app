import { React, useState } from "react";
import "./courses.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

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

    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function AddChapterForm(props) {
  const [currency, setCurrency] = useState("EUR");
  const [value, setValue] = useState("Controlled");
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const classes = useStyles();
  return (
    <form
      className={"classes.root"}
      noValidate
      autoComplete="off"
      onSubmit={props.submit}
    >
      <div className="form-group">
        <TextField
          onChange={props.change}
          style={{ width: "100%" }}
          id="outlined-multiline-static"
          label="Title"
          placeholder="enter chapter description"
          variant="outlined"
          name="title"
        />
      </div>

      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-static"
          label="About"
          multiline
          onChange={props.change}
          name="about"
          rows={4}
          placeholder="enter chapter description"
          variant="outlined"
        />
      </div>
    </form>
  );
}

export default AddChapterForm;
