import { Component } from "react";

import "./login.css";
import Input from "../input";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi";
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required()
});
console.log(schema.validate({ name: "J" }));
console.log(schema);

class Register extends Component {
  state = {
    account: { email: "", password: "", name: "", bio: "", cpassword: "" },
    redirect: false
  };

  handleChange = ({ target }) => {
    const account = { ...this.state.account };
    account[target.name] = target.value;

    this.setState({ account: account });
  };
  signUp = (e) => {
    e.preventDefault();

    // validation form hhere
    const validate = schema.validate({ name: this.state.account.name });

    if (validate.error) {
      console.log("33", validate);
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT}` + "users/register",
        data: this.state.account
      })
        .then((data) => {
          console.log("line 29", data.data.success);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="wrapper wrapper-login">
        <main className="container">
          <div className="row pt-5 pb-3 justify-content-md-center">
            <div className="col-md-6">
              <div className="login-wrapper p-5 border rounded">
                <h1 className="mb-5">Sign up </h1>
                <form onSubmit={this.signUp}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Full Name</label>
                    <Input
                      change={this.handleChange}
                      type="text"
                      name="name"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <Input
                      change={this.handleChange}
                      type="email"
                      name="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <Input
                      change={this.handleChange}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">About</label>
                    <textarea
                      name="bio"
                      onChange={this.handleChange}
                      className="form-control rounded-0"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="about you"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-info rounded-pill"
                  >
                    Register
                  </button>{" "}
                  <span>
                    Or <Link to="/login">Login</Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default Register;
