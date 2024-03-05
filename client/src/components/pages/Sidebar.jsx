import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
