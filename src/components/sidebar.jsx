import React from "react";
import FormatIndentIncreaseOutlinedIcon from "@material-ui/icons/FormatIndentIncreaseOutlined";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

function SideNavBar({
  children,
  courseTitle,
  style,
  toggleSideBar,
  closedSidebar,
  coursename
}) {
  return (
    <aside className="aside-bar" style={style}>
      <div className="course-content">
        <div
          className="display-5"
          style={{ display: closedSidebar ? "none" : "block" }}
        >
          {coursename}
        </div>
        <div>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={toggleSideBar}
          >
            {closedSidebar ? (
              <FormatIndentIncreaseOutlinedIcon
                style={{ fontSize: "2.8rem" }}
              />
            ) : (
              <MenuOpenIcon style={{ fontSize: "2.8rem" }} />
            )}
          </IconButton>
        </div>
      </div>
      {children}
    </aside>
  );
}

export default SideNavBar;
