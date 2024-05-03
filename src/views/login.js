import React, {useState} from 'react'
import './login.css'
const login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Checked:', isChecked);
  };


  return (
    <div>
      <div className="login-nav">
      <div className="home-nav">
                <span className="logo">TEMPSTAY</span>
                <div data-thq="thq-close-menu" className="home-close-menu">
                </div>
              </div>
        </div>
      <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePasswordChange} />
        </div>
        <div id="button-group">
        <button type="submit" className="btn btn-primary">User</button>
        <button type="button" className="btn btn-primary">Service provider</button>
        <button type="button" className="btn btn-primary">Forgot password</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default login
