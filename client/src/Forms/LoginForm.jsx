import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../schema/Auth.Schema';
import { Link } from 'react-router-dom';

const LoginForm = ({ handleSubmit, isProcessing }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    handleSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <div className="auth-input-group">
        <label htmlFor="email">Enter Your Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="auth-input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Logging in...' : 'Login'}
      </button>
      
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;
