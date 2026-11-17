import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [signState, setSignState] = React.useState('Sign In')
  const navigate = useNavigate()

  // Demo site: there is no backend, so signing in simply opens the home page.
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt='Auxa Studios' />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === 'Sign Up' ? <input type='text' placeholder='Your Name' required /> : null}
          <input type='email' placeholder='Email' required />
          <input type='password' placeholder='Password' required />
          <button type='submit'>{signState}</button>
          <div className='form-help'>
            <div className='remember-me'>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember'>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className='form-switch'>
          {signState === 'Sign In' ? (
            <p>New to Auxa Studios? <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setSignState('Sign In')}>Sign In</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
