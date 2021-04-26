import { useState, useEffect, Fragment, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

function MainNavBar(props) {
  const ref = useRef();

  const [style, setStyle] = useState({
    width: "300px",
    background: "#3b988d",
    border: "#45867e",
    transition: " 1s all"
  });

  return (
    <nav
      className={`navbar  navbar-expand-lg navbar-dark bg-light-custom fixed-top  `}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          A&P
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <input
              onFocus={() =>
                setStyle({
                  width: "400px",
                  background: "whitesmoke",
                  border: "#45867e",
                  transition: " 1s all"
                })
              }
              onBlur={() =>
                setStyle({
                  width: "300px",
                  background: "#3b988d",
                  border: "#45867e",
                  transition: " 1s all",
                  color: "white"
                })
              }
              ref={ref}
              className="form-control mr-sm-2 rounded-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={style}
            />
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                activeStyle={{
                  fontWeight: "bold"
                }}
                to="/courses"
                className="nav-link"
              >
                <i className="fab fa-buffer"></i> All courses
              </NavLink>
            </li>

            {props.user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {props.user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/dashboard">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/mycourses">
                    <i className="fab fa-buffer"></i> My Courses
                  </Link>

                  <div className="dropdown-divider"></div>
                  <Link
                    onClick={props.logout}
                    className="dropdown-item"
                    to="/logout"
                  >
                    Sign out
                  </Link>
                </div>
              </li>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <i className="fas fa-user-plus mr-1"></i>Sign Up
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(MainNavBar);
