import social from "../undraw_Social_ideas_re_j5v4.svg";
import { Link } from "react-router-dom";
function Jumbotron(props) {
  return (
    <div className="jumbotron  rounded-0 p-0">
      <div className="overlay">
        <div className="welcome">
          <h1 className="display-5 mb-3 animate__animated animate__bounceInDown">
            {"LOREM IPSUM DOLOR SIT AMET CONSECTETUR".split(" ").map((char) => (
              <span className="mb-2">{char} </span>
            ))}
          </h1>
          <p className=" welcome-p-1">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor. Duis mollis, est non commodo luctus.
          </p>
          <p className=" welcome-p-1">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor. Duis mollis, est non commodo luctus.
          </p>
          <p>
            <Link to="/courses" className="btn btn-outline-info btn-lg">
              Get Started
            </Link>
          </p>
        </div>
      </div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/5676741/pexels-photo-5676741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
export default Jumbotron;
