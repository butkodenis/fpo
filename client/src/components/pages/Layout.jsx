import { Link, Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex vh-100">
        {/* Боковая панель */}
        <nav id="sidebar" className=" bg-info">
          <div className="">
            <h3>Меню</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/users">Пользователи</Link>
              </li>
              <li>Контакты</li>
            </ul>
          </div>
        </nav>
        {/* Основное содержимое */}
        <div className="flex-grow-1 bg-warning">
          <Outlet />
          <h3>Основное содержимое</h3>
        </div>
      </div>
    </div>
  );
};

export default Layout;
