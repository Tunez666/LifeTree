import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo">
        Life<span>Tree</span>
      </div>

      <div>
        <Link to="/login" className="btn btn-outline">
          Войти
        </Link>

        <Link to="/register" className="btn">
          Зарегистрироваться
        </Link>
      </div>
    </header>
  );
}

export default Header;