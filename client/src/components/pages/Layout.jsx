import { Link, Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="container-fluid ">
      <div className=" d-flex vh-100">
        {/* Боковая панель */}
        <Sidebar />
        {/* Основное содержимое */}
        <div className="flex-grow-1  m-3 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
