import UserSidebar from '../components/UserSidebar';

function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return 'Отличное утро';
  }

  if (hour >= 12 && hour < 18) {
    return 'Отличный день';
  }

  if (hour >= 18 && hour < 24) {
    return 'Отличный вечер';
  }

  return 'Отличная ночь';
}

function DashboardPage() {
  const timeOfDay = getTimeOfDay();

  return (
    <div className="dashboard">

      <UserSidebar />

      <main className="content">

        <h1 className="page-title">
          Дашборд рабочих пространств
        </h1>

        <section className="welcome-card">

          <h2>
            Привет!
          </h2>

          <p>
            {timeOfDay} чтобы продолжить работу над своими проектами.
          </p>

        </section>

        <section className="spaces">
          {/* Здесь позже будут рабочие пространства */}
        </section>

      </main>

    </div>
  );
}

export default DashboardPage;