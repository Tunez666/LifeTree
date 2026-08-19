import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { register } from '../api/auth';

function RegisterPage() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    const formData = new FormData(event.currentTarget);

    const username = String(formData.get('username') ?? '');
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const repeatPassword = String(
      formData.get('repeatPassword') ?? '',
    );

    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      setLoading(true);

      await register({
        username,
        email,
        password,
      });

      navigate('/login');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось зарегистрироваться',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Создай своё пространство"
      description="Организуй задачи, заметки и идеи. Всё начинается с одного места."
      footer={
        <>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Имя"
          autoComplete="name"
          required
          minLength={3}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="new-password"
          required
          minLength={6}
        />

        <input
          type="password"
          name="repeatPassword"
          placeholder="Повтори пароль"
          autoComplete="new-password"
          required
          minLength={6}
        />

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? 'Создаём пространство...' : 'Начать работу'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;