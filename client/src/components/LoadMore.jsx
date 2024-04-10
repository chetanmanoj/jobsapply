import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadMore = ({ onClick, loading }) => (
  <>
    {loading ? (
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        size="2x"
        style={{ color: "#1a70eb" }}
      />
    ) : (
      <button
        className="border-2 border-secondary px-4 py-2 rounded-xl"
        onClick={onClick}
        disabled={loading}
      >
        Load More
      </button>
    )}
  </>
);

export default LoadMore;
