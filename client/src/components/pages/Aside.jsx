import { Link, Outlet } from 'react-router-dom';

const Aside = () => {
  return (
    <div className="conteiner mx-auto  flex bg-gray-300 ">
      <nav className="w-1/5 p-4">
        <h1 className="text-2xl font-bold">Aside</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
        </ul>
      </nav>
      <section className="flex-1 p-4">
        <Outlet />
      </section>
    </div>
  );
};

export default Aside;
