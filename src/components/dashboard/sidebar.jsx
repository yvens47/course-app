import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function Sidebar(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <div className="user-pic-wrapper">
        <div className="user-pic">
          <img width="100%" src={props.user.user_image} />
          <IconButton onClick={props.profileUpload}>
            <EditIcon />
          </IconButton>
          <h4>{" hello" + props.user.name}</h4>
        </div>
      </div>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem button>
            <AddIcon />
            <ListItemText primary="New Course" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemLink>
        </List>
      </div>
    </Fragment>
  );
}

export default Sidebar;
