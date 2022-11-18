import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="page404">
      <div className="vertical-center">
        <div className="container">
          <div id="notfound" className="text-center ">
            <h1>😮</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist.</p>
            <Link to="/" className="notfound__link">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
