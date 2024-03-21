import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="d-flex flex-column  ">
      <div className="d-flex flex-column align-items-center">
        <h3 className="text-center">Меню</h3>
        <div className="container">
          <ul className="list-unstyled">
            <li className="mb-3">
              <button
                className="btn btn-dark mb-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Рахунки
              </button>
              <div className="collapse " id="collapseExample">
                <Link to="/" className="btn btn-outline-secondary mb-1">
                  Особові рахунки
                </Link>
                <Link to="/" className="btn btn-outline-secondary ">
                  Платежі
                </Link>
              </div>
            </li>
            <li className="mb-3">
              <Link to="/students" className="btn btn-dark btn-block text-left ">
                Студенти
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/users" className="btn btn-dark btn-block text-left">
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
    </nav>
  );
};

export default Sidebar;
