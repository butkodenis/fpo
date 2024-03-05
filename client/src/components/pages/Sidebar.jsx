import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="d-flex flex-column  bg-info">
      <div className="d-flex flex-column align-items-center">
        <h3 className="text-center">Меню</h3>
        <div className="container">
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/" className="btn btn-primary btn-block text-left">
                Головна
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/users" className="btn btn-success btn-block text-left">
                Користувачі
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/login" className="btn btn-outline-secondary btn-block text-left">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" text-center">
        <h3>Контакты</h3>
        <p>Телефон: 8-800-555-35-35</p>
        <p>Email:</p>
      </div>
    </nav>
  );
};

export default Sidebar;
