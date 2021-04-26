import { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import "./login.css";
import Input from "../input";
import axios from "axios";

import { connect } from "react-redux";
import { getUser } from "../../store/actions/actions";
class Login extends Component {
  state = {
    account: { email: "", password: "" },
    login_error: false,
    isLoggedIn: false,
    error_msg: "",
    redirect: false
  };

  handleChange = ({ target }) => {
    const account = { ...this.state.account };
    account[target.name] = target.value;
    this.setState({ account });
  };

  login = (e) => {
    e.preventDefault();

    // user must provide email at least

    if (this.state.account.email !== "") {
      // post request to login
      axios({
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT}` + "users/login",
        data: this.state.account
      })
        .then((response) => {
          if (response.data.user) {
            this.setState({ isLoggedIn: true });
            // save user data to loca storage;
            const localUserData = window.localStorage;
            localUserData.user = JSON.stringify(response.data.user);

            this.props.dispatch(getUser(localUserData.user));
          } else {
            this.setState({
              login_error: true,
              error_msg: response.data.error
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    if (this.props.user) {
      return <Redirect to={this.props.location.state.referrer} />;
    }
    return (
      <div className="wrapper wrapper-login">
        <main className="container">
          <div className="row pt-5 pb-3 justify-content-md-center">
            <div className="col-md-6">
              <div className="login-wrapper p-5 border rounded">
                <h1 className="mb-5 ">Log in to A&P</h1>
                {this.state.login_error && (
                  <Alert severity="error" color="error">
                    {this.state.error_msg}
                  </Alert>
                )}

                <form onSubmit={this.login} className="mb-5">
                  <div className="form-group">
                    <label>Email address</label>
                    <Input
                      change={this.handleChange}
                      type="email"
                      name="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <Input
                      change={this.handleChange}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-secondary  rounded-0"
                  >
                    Login
                  </button>
                  or <Link to="/register">Sign up</Link>
                </form>
                <div className="forget-password row">
                  <h3>
                    <Link to="/forget-password">Forgot password</Link>
                  </h3>
                </div>

                <div className="register border-top mt-5  "></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps)(Login);
