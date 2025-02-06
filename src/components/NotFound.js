import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry this page cannot be found</h2>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default NotFound;