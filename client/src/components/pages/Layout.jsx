import { Link, Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex vh-100">
        {/* Боковая панель */}
        <Sidebar />
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
