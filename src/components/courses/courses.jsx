import { Component } from "react";
import CourseLists from "./courselists";
import "./courses.css";
import loader from "../../loader.svg";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { getCourses, filterCourse } from "../../store/actions/actions";

import { Link } from "react-router-dom";
import { countField } from "../../utils.js";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class Courses extends Component {
  state = {
    //lists: this.props.courses,

    filter: { learningFocus: "All", skillLevel: "" }
  };
  componentDidMount = () => {
    this.props.getCourses();
  };
  handleChange = ({ currentTarget }) => {
    // const focus = { ...this.state.filter };
    // focus[currentTarget.name] = currentTarget.value;
    // // get filtering params from button clicked,
    // this.props.filterCourse(focus.learningFocus, focus.skillLevel);
    //get filtering params from button clicked,
    const focus = { ...this.filter };
    focus.learningFocus = currentTarget.value;

    this.setState({ filter: focus });
    this.props.filterCourse(focus.learningFocus, this.state.filter.skillLevel);
  };
  handleClick = (e) => {
    e.preventDefault();

    //get filtering params from button clicked,
    const focus = { ...this.filter };
    focus.learningFocus = e.currentTarget.getAttribute("data-focus");

    this.setState({ filter: focus });
    this.props.filterCourse(focus.learningFocus, this.state.filter.skillLevel);
  };

  countField = (arr, stringVal) => {
    let count = 0;
    arr.map((obj) => {
      if (obj.category === stringVal) {
        count++;
      }
    });

    return count;
  };

  render() {
    return (
      <div className="wrapper">
        <aside className="mt-5 ">
          <div className="aside-content p-4">
            <div className="aside-content-title border-bottom pb-3">
              {/* to be revised  */}
              Browse all Courses ({this.props.courses.length})
            </div>
            <div className="aside-content-focus pt-3">Learning Focus</div>

            <div className="card mt-3 border-0" style={{ width: "100%;" }}>
              <ul className="nav left-nav flex-column list-group list-group-flush">
                <li className="nav-item list-group-item list-group-item-action">
                  <Link
                    onClick={this.handleClick}
                    to={`current`}
                    data-focus="Programming"
                  >
                    <i className="fas fa-laptop-code"></i>
                    Programming ({countField(this.props.courses, "Programming")}
                    )
                  </Link>
                </li>
                <li className="nav-item list-group-item list-group-item-action">
                  <Link
                    onClick={this.handleClick}
                    to={`/past`}
                    data-focus="Math"
                  >
                    <i className="fas fa-superscript"></i>
                    Math ({countField(this.props.courses, "Math")})
                  </Link>
                </li>
                <li className="nav-item list-group-item list-group-item-action">
                  <Link
                    onClick={this.handleClick}
                    to={`/interest`}
                    data-focus="Cinematography"
                  >
                    <i className="fas fa-film"></i>
                    Cinematography (
                    {countField(this.props.courses, "Cinematography")})
                  </Link>
                </li>
                <li className="nav-item list-group-item list-group-item-action">
                  <Link onClick={this.handleClick} to={`#`} data-focus="All">
                    <i className="fas fa-braille"></i>
                    All Courses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <main className="container">
          {/* <div className="row course-filter jumbotron rounded-0 mb-2"></div> */}
          <section className="mt-5">
            <div className="section-courses">
              <h2 className="section-courses-title pt-4">Browse all Courses</h2>
              <p data-test="catalog-subtitle" className="css-g9klz e1a1m3xa2">
                All courses at A&P are <b>affordable</b>!
              </p>
              <p>Lorem ipsum dolor sit amet consequatur voluptatibus a iure.</p>
            </div>
            {/* Hide on large and show on sma view por */}
            <div className="filter-sort-hide-high mt-3 border-bottom">
              <div className="row">
                <div className="col-md-auto form-group  aside-content-focus">
                  <select
                    name="learningFocus"
                    id=""
                    className="form-control"
                    onChange={this.handleChange}
                  >
                    <option default value="Skill Level">
                      Learning Focus
                    </option>
                    <optgroup>
                      <option>All</option>
                      <option>Programming</option>
                      <option>Technology</option>
                      <option>Math</option>
                      <option>Cinematography</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col-md-auto form-group  aside-content-focus">
                  <select
                    name="skillLevel"
                    id=""
                    className="form-control"
                    onChange={this.handleChange}
                  >
                    <option default value="Skill Level">
                      Skill Level
                    </option>
                    <optgroup>
                      <option value="Introductory">Introductory</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advance">Advance</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            <div className="filter-sort mt-3 border-bottom">
              <div className="row">
                <div className=" col col-lg-2 aside-content-focus">
                  Skills Level
                </div>
                <div className="col-md-auto">
                  <button
                    className="btn btn-secondary m-2"
                    onClick={this.handleClick}
                  >
                    Introductory
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    onClick={this.handleClick}
                  >
                    Intermediate
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    onClick={this.handleClick}
                  >
                    Advance
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="container">
                {/* to Refactored */}
                {!this.props.loaded && (
                  <img src={loader} alt="loader for all courses" />
                )}
                {this.props.loaded &&
                  this.state.filter.learningFocus === "All" && (
                    <CourseLists courses={this.props.courses} />
                  )}

                {this.props.loaded && (
                  <CourseLists
                    courses={
                      this.props.filteredCourses && this.props.filteredCourses
                    }
                  />
                )}

                {/* need to refactor above code */}
              </div>
            </div>
          </section>
        </main>
        <div className="add-button">
          <a className="btn btn-info rounded-circle btn-lg " href="/new">
            <i className="fas fa-plus"></i>
          </a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    courses: state.courses.courses,
    loaded: state.courses.loaded,
    filteredCourses: state.courses.filteredCourses
  };
};

export default connect(mapStateToProps, { getCourses, filterCourse })(Courses);
