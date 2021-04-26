import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

function CommentForm(props) {
  return (
    <form onSubmit={(e) => props.postComment(e, props.sectionid)}>
      <div className="form-group">
        <label for="exampleFormControlTextarea1">
          <h4>
            {" "}
            {props.sectionComments.length == 0 ? (
              <span style={{ color: "#17a2b8" }}>
                Be the first to a comment
              </span>
            ) : (
              "Comments"
            )}
          </h4>
        </label>

        {props.error && (
          <p className="alert alert-danger"> Please login to a comment </p>
        )}

        <textarea
          onChange={props.handleCommentText}
          name="text"
          className="form-control rounded-0"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="row">
        <div className="col">
          <button type="submit" className="btn btn-info mr-1">
            Comment
          </button>
          <button type="reset" className="btn btn-default ml-1">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
