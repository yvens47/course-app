import { userReducer } from "./userReducer";
import { courseReducer } from "./courseReducer";
import { CommentReducer } from "./commentReducer";
import { ChapterReducer } from "./chaptersReducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  courses: courseReducer,
  comments: CommentReducer,
  chapters: ChapterReducer
});
