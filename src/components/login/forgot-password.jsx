import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router";
import Alert from "@material-ui/lab/Alert";

class ForgotPassword extends Component {
  state = {
    account: { email: "" },
    passwordChanged: false,
    errorMsg: "",
    error: false
  };
  forgot = (e) => {
    e.preventDefault();
    // email cannot be empty
    const account = { ...this.state.account };

    if (account.email === "") {
      this.setState({ errorMsg: "please enter Your email", error: true });
    } else {
      // make request to backend and process result;
      axios({
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT}` + "users/forget-password",
        data: account
      }).then((response) => {
        toast(response.data.message);

        account.email = "";
        this.setState({ account: account, passwordChanged: true });
        // redirect user login page
      });
    }
  };
  handleChange = ({ target }) => {
    const account = { ...this.state.account };
    account[target.name] = target.value;
    this.setState({ account });
  };
  render() {
    if (this.state.passwordChanged) {
      return (
        <Redirect
          push
          to={{
            pathname: "/login",
            state: { referrer: "/forget-password" }
          }}
        />
      );
    }
    return (
      <div className="login-wrapper">
        <div className="container pt-5">
          <div className="row pt-5 pb-5">
            <div className="col-md-8 m-auto pt-5">
              <ToastContainer></ToastContainer>
              <h1 className=" pt-2 pb-2 display-3">Fogot Password</h1>
              <p className="text-secondary">
                Enter the email address you registered with to retrieve your
                password.
              </p>
              <form onSubmit={this.forgot} className="pt-2">
                <div className="input-group">
                  {this.state.error && (
                    <Alert severity="error" color="error">
                      {this.state.errorMsg}
                    </Alert>
                  )}
                  <input
                    type="email"
                    required
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />

                  <div class="input-group-append">
                    <button type="submit" className="btn btn-secondary">
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
