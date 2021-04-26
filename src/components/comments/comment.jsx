import React from "react";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

function Comment(props) {
  const classes = useStyles();
  return (
    <div className="comment border-bottom pt-2 pb-2">
      <div className="media pl-2">
        <Avatar
          alt="Remy Sharp"
          src={props.comment.user_image}
          className={classes.large}
        />
        <div className="media-body pl-3">
          <h5 className="mt-0">{props.comment.name}</h5>
          {props.comment.text}
          <div className="comment_icons mt-2">
            <IconButton color="secondary">
              <ThumbUpIcon />
            </IconButton>
            <IconButton>
              <ThumbDownIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comment;
