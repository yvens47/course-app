import { React, useState } from "react";
import "./courses.css";
import Stepper from "@material-ui/core/Stepper";
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

function AddChapterItemsForm(props) {
  const [currency, setCurrency] = useState("EUR");
  const [value, setValue] = useState("Controlled");
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const classes = useStyles();
  return (
    <form className={"classes.root"} noValidate autoComplete="off">
      <div className="form-group">
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={currency}
          variant="outlined"
          onChange={handleChange}
          helperText="Please select the Course you want to add the chapter for"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          id="standard-basic"
          label="Chapter name"
          variant="outlined"
        />
      </div>
      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-static"
          label="About"
          multiline
          rows={4}
          defaultValue="enter chapter description"
          variant="outlined"
        />
      </div>
    </form>
  );
}

export default AddChapterItemsForm;
