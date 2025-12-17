import notFoundIcon from "../assets/not-found.png";

function NothingFound() {
  return (
    <div className="not-found-page">
      <img src={notFoundIcon} alt="not_found" />
      <h3>Nothing found</h3>
      <div>
        <p>
          No result match your search. Consider trying different search request
        </p>
      </div>
    </div>
  );
}
export default NothingFound;
