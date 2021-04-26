import { toast } from "react-toastify";
const initialState = {
  courses: []
};

export function courseReducer(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case "GET_COURSES":
      return { ...state, loading: true, loaded: false };
      break;
    case "GET_COURSE_SUCCESS":
      return {
        ...state,
        courses: payload,
        loading: false,
        loaded: true,
        error: null
      };
    case "GET_COURSE_ERROR":
      return {
        ...state,
        data: payload.data,
        loading: false,
        loaded: true,
        error: payload
      };
    case "UPDATE_COURSE":
      return { ...state, loading: true, loaded: false };
      break;
    case "UPDATE_COURSE_SUCCESS":
      return {
        ...state,
        courses: payload,
        loading: false,
        loaded: true,
        error: null
      };
    case "UPDATE_COURSE_ERROR":
      return {
        ...state,
        data: payload.data,
        loading: false,
        loaded: true,
        error: payload
      };

    // fillter courses
    case "FILTER_COURSE":
      if (payload.learningFocus === "" && payload.skillLevel === "") {
        return state;
      }

      let FilteredValues = state.courses.filter(
        (value) => value.category === payload.learningFocus
      );
      return {
        ...state,
        filteredCourses: FilteredValues
      };

    case "REMOVE_USER_POSTED_COURSE":
      return { ...state, loading: true, loaded: false };
    case "REMOVE_USER_POSTED_COURSE_SUCCESS":
      return {
        ...state,
        courses: payload,
        loading: false,
        loaded: true,
        error: null
      };
    case "REMOVE_USER_POSTED_COURSE_ERROR":
      return {
        ...state,
        data: payload.data,
        loading: false,
        loaded: true,
        error: payload
      };

    default:
      return state;
  }
}
