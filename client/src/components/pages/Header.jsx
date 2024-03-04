import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-grey-300 h-full w-72">
      <h1>React Router</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* Add more links here if needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
