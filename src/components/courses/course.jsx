import { Link } from "react-router-dom";

function CourseItem(props) {
  const { _id, name, cover, type, about, category } = props.course;

  return (
    <div className="course-item">
      <div className="course-cover-wrap">
        <img src={cover} className="course-img" alt={about} />
        <div
          className="course-type"
          style={{
            backgroundColor: type === "Free" ? "#45867e" : "#596475",
            color: type === "Free" ? "white" : "white"
          }}
        >
          {type}
        </div>
      </div>

      <div className="course-detail">
        <h5 className="course-title">
          <Link to={"/courses/" + _id}> {name} </Link>
        </h5>

        <p className="course-text">{about}</p>
        <hr />
        <p className="course-release"> {category}</p>
      </div>
    </div>
  );
}

export default CourseItem;
