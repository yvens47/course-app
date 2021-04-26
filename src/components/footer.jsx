import { Link } from "react-router-dom";
function Footer(props) {
  return (
    // <!-- Footer -->
    <footer className=" footer">
      <div className="container py-5">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <img src="img/logo.png" alt="" width="180" className="mb-3" />
            <p className="font-italic text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <Link to="#" title="twitter">
                  <i className="fa fa-twitter"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="facebook">
                  <i className="fa fa-facebook"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="instagram">
                  <i className="fa fa-instagram"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="pinterest">
                  <i className="fa fa-pinterest"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="vimeo">
                  <i className="fa fa-vimeo"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">A&P</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/login" className="text-muted">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-muted">
                  Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses" className="text-muted">
                  All Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-muted">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Lorem</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/new" className="text-muted">
                  Add a Course
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/mycourses" className="text-muted">
                  My Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-muted">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-muted">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Newsletter</h6>
            <p className="text-muted mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              itaque temporibus.
            </p>
            <div className="p-1 rounded border">
              <div className="input-group">
                <input
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
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Copyrights --> */}
      <div className=" py-4" style={{ background: "white" }}>
        <div className="container text-center">
          <p className="text-muted mb-0 py-2">
            © 2019 A&P All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
