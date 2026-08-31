import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function UserSidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar__logo">
                🌿 <span>LifeTree</span>
            </div>

            <div className="sidebar__workspace">
                <label>Сейчас работаю над</label>

                <select id="workspace-select">
                    <option value="">
                        Выберите пространство
                    </option>
                </select>
            </div>

            <nav className="sidebar__nav">

                <Link to="/dashboard">
                    Дашборд
                </Link>

                <Link to="/tasks">
                    Мои задачи
                </Link>

                <Link to="/notes">
                    Мои заметки
                </Link>

                <Link to="/calendar">
                    Календарь
                </Link>

                <Link to="/knowledge-base">
                    База знаний
                </Link>

                <Link to="/statistics">
                    Статистика
                </Link>

                <Link to="/settings">
                    Настройки
                </Link>

                <ThemeToggle />

            </nav>

            <div className="sidebar__footer">

                <button className="btn btn-primary">
                    + Создать пространство
                </button>

            </div>

        </aside>
    );
}

export default UserSidebar;