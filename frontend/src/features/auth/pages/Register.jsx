export const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (


    <>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input name="userName" type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" name="password" id="password" />
            </div>
            <div>
              <button type="submit" className="button primary-button">
                <div className="top">Register</div>
                <div className="bottom"></div>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

