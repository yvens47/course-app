import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class NewCourse extends Component {
  state = {
    course: {
      name: "",
      type: "premium",
      about: "",
      status: "Draft",
      // author: this.props.user.name

      cover: "http://via.placeholder.com/900",

      category: ""
    }
  };

  create = (e) => {
    e.preventDefault();
    console.log(this.props.user.id);

    const course = {
      ...this.state.course,
      author: this.props.user.name,
      user_id: this.props.user.id
    };
    console.log(course);

    // Send a POST request
    // post user data
    axios({
      method: "post",
      url: "https://congn.sse.codesandbox.io/courses/create",
      data: course
    })
      .then((response) => {
        // clear form

        this.setState({
          course: { name: "", type: "", about: "", status: "", category: "" }
        });

        if (response.data.success) {
          // pass newly created courseid as props.
          this.props.history.push({
            pathname: "/editcourse",

            state: {
              course: response.data.data
            }
          });
        }
      })
      .catch(function (error) {});
  };
  handleChange = ({ target }) => {
    const course = { ...this.state.course };
    course[target.name] = target.value;
    this.setState({ course });
  };
  render() {
    if (this.props.user === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="wrapper ">
        <div className="container">
          <div className="row mt-5 pt-5 pb-3 justify-content-md-center">
            <div className="col-md-6">
              <h1 className="display-4">Add A Course</h1>
              <form onSubmit={this.create}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="course name"
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.handleChange}
                  >
                    <option selected="selected">Course type</option>
                    <option>Premium</option>
                    <option>Free</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.handleChange}
                  >
                    <option selected="selected">Course type</option>
                    <option>Programming</option>
                    <option>Math</option>
                    <option>Cinematography</option>
                    <option>Technology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>About</label>
                  <textarea
                    onChange={this.handleChange}
                    maxLength="90"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="about"
                    placeholder="about the course"
                  ></textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-lg btn-secondary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps)(NewCourse);
