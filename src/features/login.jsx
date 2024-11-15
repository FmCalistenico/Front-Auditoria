import React, { useState } from 'react';

const Login = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister(newUsername, newPassword);
    setNewUsername('');
    setNewPassword('');
    setMessage('Usuario registrado exitosamente');
    setShowRegister(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{showRegister ? 'Registro' : 'Login'}</h1>
      {message && (
        <div style={styles.alert}>
          {message}
        </div>
      )}
      {showRegister ? (
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="newUsername" style={styles.label}>Nuevo Usuario:</label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="newPassword" style={styles.label}>Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.buttonPrimary}>Registrar</button>
          <button
            type="button"
            onClick={() => setShowRegister(false)}
            style={styles.buttonSecondary}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.buttonPrimary}>Login</button>
        </form>
      )}
      <button
        onClick={() => setShowRegister(!showRegister)}
        style={styles.linkButton}
      >
        {showRegister ? '¿Ya tienes una cuenta? Inicia sesión' : 'Registrar nuevo usuario'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  alert: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  linkButton: {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '15px',
    textDecoration: 'underline',
    fontSize: '16px',
  },
};

export default Login;
