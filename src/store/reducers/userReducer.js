import { toast } from "react-toastify";
export function userReducer(state = {}, action) {
  const payload = action;
  switch (action.type) {
    case "GET_USER":
      const u = { ...state };
      if (window.localStorage.user) {
        u.user = JSON.parse(window.localStorage.user);
      } else {
        u.user = null;
      }
      return u;
      break;
    case "ADD_COURSE_USER_SUBSCRIPTION_lIST":
      return { ...state, loading: true, loaded: false };
      break;

    case "ADD_COURSE_USER_SUBSCRIPTION_lIST_SUCCESS":
      toast.success("Course has been added", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      const userCourseData = { ...state };

      // const added = { ...state };
      //added.user.registered_course.push(payload.data);
      userCourseData.user.registered_course = action.payload.registered_course;
      // Update the value to with new added course
      localStorage.setItem("user", JSON.stringify(userCourseData.user));
      return userCourseData;

    case "ADD_COURSE_USER_SUBSCRIPTION_lIST_ERROR":
      console.log(payload);
      toast.error(payload.payload, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      return {
        ...state,
        data: payload.data,
        loading: false,
        loaded: true,
        error: payload,
        courseAddedToUserSubscriptionList: false
      };

    case "REMOVE_COURSE_USER_SUBSCRIBED":
      return {
        ...state,
        data: payload.data,
        loading: false,
        loaded: true,
        error: payload
      };

    case "REMOVE_COURSE_USER_SUBSCRIBED_SUCCESS":
      // copy state and remove record
      const user = { ...state };
      user.user.registered_course = action.payload.registered_course;
      // Update the value to "tuna"
      localStorage.setItem("user", JSON.stringify(user.user));

      return user;

    case "REMOVE_COURSE_USER_SUBSCRIBED_ERROR":
      toast.error(JSON.stringify(payload), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      return {
        ...state,
        data: payload.data,
        loading: false,
        loaded: true,
        error: payload,
        courseAddedToUserSubscriptionList: false
      };

    case "IS_USER_REGISTERED_TO_COURSE":
      console.log(payload);
      // check if current cousrse id is found in user.registered_course[]
      const courseFoundClone = { ...state };

      const found =
        courseFoundClone.user &&
        courseFoundClone.user.registered_course &&
        courseFoundClone.user.registered_course.filter(
          (value) => value._id === payload.payload
        ).length;

      //return found && found.length > 0;
      return {
        ...state,
        coursefound: found
      };
      break;

    default:
      return state;
      break;
  }
  return state;
}

//  {type:"GET_USER"}
