import { Link, Outlet } from 'react-router-dom';
import Header from './pages/Header';

const Layout = () => {
  return (
    <div class="flex h-screen bg-gray-200">
      <div class="flex w-64 flex-col">
        <div class="flex justify-between bg-gray-800 p-4 text-white">
          <div class="text-xl font-semibold">Admin Panel</div>
        </div>
        <div class="no-scrollbar  flex-grow overflow-y-auto bg-gray-900 p-4">
          <nav class="space-y-2">
            <Link
              to="/"
              class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/login"
              class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/logout"
              class="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Logout
            </Link>
          </nav>
        </div>
      </div>

      <div class="flex-grow p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
