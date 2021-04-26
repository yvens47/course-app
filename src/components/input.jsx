import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Input(props) {
  return (
    <input
      type={props.type}
      className="form-control rounded-0"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.change}
    />
  );
}
