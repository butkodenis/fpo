import React from 'react';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login">
        <h1>Вхід</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="login" className="form-label">
              Логин
            </label>
            <input type="text" className="form-control" id="login" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
