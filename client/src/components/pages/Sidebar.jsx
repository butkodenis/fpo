import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="d-flex flex-column  ">
      <div className="d-flex flex-column align-items-center">
        <h3 className="text-center">Меню</h3>
        <div className="container">
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/" className="btn btn-dark btn-block text-left">
                Інформаційна панель
              </Link>
            </li>

            <li className="mb-2">
              <button
                className="btn btn-dark mb-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Рахунки
              </button>
              <div className="collapse " id="collapseExample">
                <Link
                  to="/studentsBalance"
                  className="btn  btn-sm  btn-outline-secondary w-75 m-1   ms-3"
                >
                  Особові рахунки
                </Link>
                <Link to="/payment" className="btn  btn-sm btn-outline-secondary w-75  ms-3">
                  Платежі
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <Link to="/students" className="btn btn-dark btn-block text-left ">
                Студенти
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/courses" className="btn btn-dark btn-block text-left">
                Курси
              </Link>
            </li>

            <li className="mb-2">
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
