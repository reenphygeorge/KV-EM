import { Link } from "react-router-dom";
import "./errorPage.style.css";

const ErrorPage = () => (
  <div className="err-container">
    <div className="gif">
      <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
    </div>
    <div className="err-content">
      <h1 className="err-main-heading">This page is gone.</h1>
      <p className="err-text">
        ...maybe the page you are looking for is not found or never existed.
      </p>
      <Link to="/">
        <button className="err-btn">Back to home</button>
      </Link>
    </div>
  </div>
);

export default ErrorPage;
