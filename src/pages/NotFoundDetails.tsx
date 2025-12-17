import notFoundIcon from "../assets/notFound.svg";
import { Link } from "react-router";

function NotFoundDetailsPage() {
  return (
    <div id="user-details-notfound-page">
      <img src={notFoundIcon} alt="not_found_image" />
      <h2>404 Page not found</h2>
      <p>
        Sorry, we can't find that page! It might be an old link or maybe it was
        moved
      </p>
      <Link to="/" className="back-homePage-btn">
        GO TO THE HOME PAGE
      </Link>
    </div>
  );
}

export default NotFoundDetailsPage;
