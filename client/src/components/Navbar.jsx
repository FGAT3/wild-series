import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Catégories</Link>
        </li>
        <li>
          <Link to="/programs">Programmes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
