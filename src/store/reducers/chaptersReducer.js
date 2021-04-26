export function ChapterReducer(state = [], actions) {
  switch (actions.type) {
    case "GET_COURSE_CHAPTER":
      console.log("line 43", actions.payload);
      return { ...state };
      break;

    case "GET_COURSE_CHAPTERS_SUCCESS":
      console.log("line 48", actions.payload);
      return { ...state, chapters: actions.payload };
      break;

    default:
      return state;
  }
}

//  {type:"GET_USER"}
