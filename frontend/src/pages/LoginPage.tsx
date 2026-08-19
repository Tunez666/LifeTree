import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { login } from '../api/auth';

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    try {
      setLoading(true);

      const result = await login({
        email,
        password,
      });

      localStorage.setItem('access_token', result.access_token);

      navigate('/dashboard');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось войти',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Войди в своё пространство"
      description="Организуй задачи, заметки и идеи. Всё начинается с одного места."
      footer={
        <>
          Нет аккаунта?{' '}
          <Link to="/register">Зарегистрироваться</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          required
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
          {loading ? 'Входим...' : 'Продолжить работу'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;