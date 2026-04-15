function Register({ setPage, handleChange, handleSubmit, errors }) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

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

        {/*  ADD THIS */}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button onClick={handleSubmit}>Register</button>

        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => setPage("login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;