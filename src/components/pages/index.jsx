import { Component } from "react";
import Jumbotron from "../jumbotron";
import { Animate } from "react-simple-animate";
import CardCol from "../card-col";
import social from "../../undraw_Social_ideas_re_j5v4.svg";
import learning from "../../undraw_Online_learning_re_qw08.svg";
import education from "../../undraw_education_f8ru.svg";
import knowledge from "../../undraw_road_to_knowledge_m8s0.svg";
import teaching from "../../undraw_teaching_f1cm.svg";
import { Player, BigPlayButton } from "video-react";

import { Link } from "react-router-dom";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./pages.css";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "animate.css";
import bg from "../../17973908.jpg";

class Homepage extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      nextArrow: <ArrowForwardIosIcon />,
      prevArrow: <ArrowBackIosIcon />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 575.98,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Jumbotron />
        <main className="container pb-5 ">
          <div className="row mt-5 pt-5 pb-5 justify-content-md-center column">
            <CardCol
              title="Pass on Your knowledge"
              text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae"
              alt="Watch lesson"
              image={teaching}
              width={"40%"}
            />
            <CardCol
              title="Social Learning"
              text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae"
              alt="Watch lesson"
              image={education}
              width={"40%"}
            />
            <CardCol
              title="Non-stop Learning "
              text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae"
              alt="Watch lesson"
              image={knowledge}
              width={"60%"}
            />

            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
        </main>
        <div
          className="custom-bg"
          style={{
            background: `url(${bg})`,
            backgroungSize: "contain",
            backgroundRepeat: "no-repeat",
            clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0% 100%)"
          }}
        >
          <div className="custom-bg-overla">
            <div className="container-fluid">
              <div className="row row-primary  mt-3 pt-5 pb-2 justify-content-md-center ">
                <div className="container pt-5">
                  <div className="row pb-3 p-3">
                    <div className="col-md-4 mr-3">
                      <img width="100%" src={learning} />
                    </div>
                    <div className="col-md-7">
                      <div className="section-h1">
                        <h1 className="pt-3 pb-3  wow bounceInUp">
                          {"Lorem ipsum dolor sit amet consectetur"
                            .split(" ")
                            .map((char) => (
                              <span>{char} </span>
                            ))}
                        </h1>

                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Cumque iure sequi temporibus cum numquam odit
                          unde quasi excepturi, exercitationem soluta repellat
                          tempore? Amet perspiciatis totam ad ratione similique
                          deleniti a!
                        </p>
                        <p>
                          <Link to="/courses" className="btn  btn-info  m-2">
                            Learn More
                          </Link>
                          <Link
                            to="/courses"
                            className="btn  btn btn-secondary  m-2"
                          >
                            Browse all Courses
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-5  pb-3 border-top ">
                <div className="container">
                  <div className="row    pb-3 justify-content-md-center">
                    <div className="col-sm-12 col-md-8">
                      <h2
                        className="display-4 text-center "
                        style={{ color: "#2D4743;" }}
                      >
                        Subscribe
                      </h2>
                      <p className="lead text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sint reprehenderit a dolores, atque dignissimos ducimus
                        quo voluptate inventore reiciendis
                      </p>
                      <Player
                        playsInline
                        src={
                          "https://player.vimeo.com/external/334495726.sd.mp4?s=5c18cee8d585c4fd22b98c5af54d0dc4eeef1bda&profile_id=139&oauth2_token_id=57447761"
                        }
                      >
                        <BigPlayButton position="center" />
                      </Player>
                    </div>
                  </div>

                  <div className="row  pt-3 pb-3">
                    <div className="col-md-12 pt-3 pb-3">
                      <h2 className="display-4 text-center">
                        Lorem ipsum dolor{" "}
                      </h2>
                      <p className=" text-center pb-4 pt-2">
                        , consectetur adipisicing elit. Fugiat possimus
                        architecto delectus ipsam vero, aperiam dolorum
                        molestiae sint perspiciatis exercitationem. Enim magni
                        corporis deserunt doloribus accusantium maiores labore,
                        aliquid tempora.
                      </p>

                      <Slider {...settings} className="slider">
                        <div className="slide-item">
                          <img
                            src="https://images.pexels.com/photos/3671394/pexels-photo-3671394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                            width="100%"
                            height="300px"
                            className="p-2 border rounded-circle"
                          />
                          <h3 className="text-center">Lorem ipsum dolor</h3>
                          <p className="text-center ">sit amet consec te </p>
                          <div className="cs-border"></div>
                          <p className="text-center">
                            sit amet consectetur adipisicing elit. Ad quaerat,
                            aliquam nesciunt error corrupti exercitationem
                            excepturi odi voluptatibus quasi harum?
                          </p>
                        </div>
                        <div className="slide-item">
                          <img
                            src="https://images.pexels.com/photos/6040520/pexels-photo-6040520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                            height="300px"
                            width="100%"
                            className="p-2 border rounded-circle"
                          />
                          <h3 className="text-center">Lorem ipsum dolor</h3>
                          <p className="text-center ">sit amet consec te </p>
                          <div className="cs-border"></div>
                          <p className="text-center">
                            sit amet consectetur adipisicing elit. Ad quaerat,
                            aliquam nesciunt error corrupti exercitationem
                            excepturi deserunt ab praesentium rerum repellat
                            labore nihil inventore tempore eum commodi
                            voluptatibus quasi harum?
                          </p>
                        </div>
                        <div className="slide-item">
                          <img
                            src="https://images.pexels.com/photos/3764499/pexels-photo-3764499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                            width="100%%"
                            height="300px"
                            className="p-2 border rounded-circle"
                          />
                          <h3 className="text-center">Lorem ipsum dolor</h3>
                          <p className="text-center ">sit amet consec te </p>
                          <div className="cs-border"></div>
                          <p className="text-center">
                            sit amet consectetur adipisicing elit. Ad quaerat,
                            aliquam nesciunt error corrupti exercitationem
                            excepturi deserunt ab praesentium rerum repellat
                            labore nihil inventore tempore eum commodi
                            voluptatibus quasi harum?
                          </p>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row    justify-content-md-center">
                <div className="col-md-5 pb-5 ">
                  <h2
                    className="display-4 text-center "
                    style={{ color: "#2D4743;" }}
                  >
                    Subscribe
                  </h2>
                  <p className="lead text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>

                  <form
                    className={"classes.root"}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="p-1 rounded border">
                      <div className="input-group">
                        <input
                          required
                          type="email"
                          placeholder="Enter your email address"
                          aria-describedby="button-addon1"
                          className="form-control border-0 shadow-0"
                        />
                        <div className="input-group-append">
                          <button
                            id="button-addon1"
                            type="submit"
                            className="btn btn-link"
                          >
                            <i
                              className="fa fa-paper-plane"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Homepage;
