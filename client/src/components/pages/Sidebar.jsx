import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="d-flex flex-column  bg-info">
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
      <div className=" text-center">
        <h3>Контакты</h3>
        <p>Телефон: 8-800-555-35-35</p>
        <p>Email:</p>
      </div>
    </nav>
  );
};

export default Sidebar;
