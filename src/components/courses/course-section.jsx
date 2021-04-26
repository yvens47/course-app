import React, { useEffect, useRef, useState } from "react";

import { Player, BigPlayButton } from "video-react";
import Comment from "../comments/comment";
import CommentLists from "../comments/comments";
import CommentForm from "../comments/commentForm";
import "./video.css";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { getUser, getComments } from "../../store/actions/actions";

function CourseSection(props) {
  const [section, setSection] = useState(props.section);
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(false);
  const { name, user_image, id } = props.user || {
    name: "",
    user_image: "",
    id: ""
  };

  const handleCommentText = ({ target }) => {
    const cmment = { ...comment, userid: id, name, user_image };
    cmment[target.name] = target.value;
    setComment(cmment);
  };

  const prevSectionRef = useRef();
  useEffect(() => {
    props.getComments("60442f7f1ea6058a9b97c279");

    setSection(props.section);
  }, []);
  const prevCount = section;

  const postComment = async (e, value) => {
    e.preventDefault();
    // posted comment ro section videos
    const c = { ...comment, sectionid: props.section.id };

    if (props.user) {
      const url = `${process.env.REACT_APP_ENDPOINT}comments/create`;

      axios({
        method: "post",
        url: url,
        data: c // get data from from to send to backend for proceesing
      })
        .then((response) => {
          if (response.data.code === 11000) {
            showToast("You can only post one comment to this post", "error");
          } else {
            showToast("your comment was posted", "success");
          }
        })
        .catch((error) => {
          console.log("line 47", error);
        });
    } else {
      // flas
      setError(true);
      showToast("You must log in to add a comment", "info");
    }
  };

  return (
    <div className="course_section mb-5">
      <div className="cover-image">
        <Player playsInline src={section.video} poster={section.cover}>
          <BigPlayButton position="center" />
        </Player>
      </div>
      <div className="course-view-detail">
        <div>
          <div>
            <h1>{section["sub_title"]}</h1>
            <p> {section["description"]}</p>
          </div>
          <div className="comments mt-5">
            <hr />
            <CommentForm
              error={error}
              handleCommentText={handleCommentText}
              sectionComments={section["comments"]}
              sectionid={section.id}
              postComment={postComment}
            />

            <CommentLists
              sectionid={section["id"]}
              section={section["id"]}
              //comments={props.comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user.user,
    comments: state.comments
  };
};
export default connect(mapStateToProps, { getUser, getComments })(
  CourseSection
);
