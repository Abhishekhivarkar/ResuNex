import "../auth.form.scss"
export const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input name="identifier" type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" name="password" id="password" />
            </div>
            <div>
              <button type="submit" className="button primary-button">
                <div className="top">Login</div>
                <div className="bottom"></div>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

