export function CommentReducer(state = [], actions) {
  switch (actions.type) {
    case "GET_COMMENTS":
      return { ...state };
      break;
    case "GET_COMMENTS_SUCCESS":
      return actions.payload;
    case "GET_COMMENTS_ERROR":
      return {
        ...state,
        data: actions.payload.data,
        loading: false,
        loaded: true,
        error: actions.payload
      };

    default:
      return state;
  }
}

//  {type:"GET_USER"}
