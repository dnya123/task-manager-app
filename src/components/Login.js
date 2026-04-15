function Login({ setPage, handleChange, handleSubmit, errors }) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button onClick={handleSubmit}>Login</button>

        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => setPage("register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;