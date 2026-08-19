import Header from '../components/Header';

function HomePage() {
  return (
    <div className="container">
      <Header />

      <section className="hero">
        <div className="hero-text">
          <h1>
            Пространство для <br />
            мыслей, задач и проектов.
          </h1>

          <p>
            Никаких сложных настроек. Заметки, задачи, календарь и база
            знаний — всё в одном месте. Просто открой и пользуйся.
          </p>

          <a href="/register" className="btn">
            Создать пространство
          </a>
        </div>

        <div className="hero-image" />
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Не нужно строить систему самому</h3>

          <p>
            Ты открываешь пространство и работаешь. Структура уже готова.
          </p>
        </div>

        <div className="feature-card">
          <h3>Одно пространство — одна цель</h3>

          <p>
            Проект, работа, личные планы — создай отдельное пространство и
            собери только нужные инструменты.
          </p>
        </div>

        <div className="feature-card">
          <h3>Меньше переключений</h3>

          <p>
            Задача, заметка, идея и материал проекта находятся рядом.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;