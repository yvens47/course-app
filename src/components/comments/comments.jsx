import { React, useState, useEffect } from "react";
import Comment from "./comment";
import axios from "axios";

function CommentLists(props) {
  const [comments, setComments] = useState([]);
  const [sectionId, setSectionId] = useState("");

  useEffect(() => {
    //prevCountRef.current = section;
    // get request id:props.sectionid
    setSectionId(props.sectionId);

    const url = `${process.env.REACT_APP_ENDPOINT}comments/${sectionId}`;
    axios.get(url).then((result) => {
      console.log("comments", result);
      setComments(result.data.docs);
    });
  }, []);
  return (
    <div className="comment_lists mt-5">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment._id} id={comment._id} comment={comment} />
        ))}
    </div>
  );
}
export default CommentLists;
