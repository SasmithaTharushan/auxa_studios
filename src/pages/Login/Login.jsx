import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import './Login.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../../context/AuthContext'
import { EyeIcon, EyeOffIcon } from '../../components/Icons/Icons'

const Login = () => {
  const { user, signIn, signUp, guest } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [mode, setMode] = useState('Sign In')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  const isSignUp = mode === 'Sign Up'
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (isSignUp && !form.name.trim()) return setError('Please enter your name.')
    setBusy(true)
    try {
      if (isSignUp) await signUp({ ...form, remember })
      else await signIn({ ...form, remember })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  const switchMode = (next) => {
    setMode(next)
    setError('')
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt='Auxa Studios' />
      <div className='login-form'>
        <h1>{mode}</h1>
        <form onSubmit={handleSubmit} noValidate={false}>
          {isSignUp && (
            <input type='text' placeholder='Your name' autoComplete='name' value={form.name} onChange={set('name')} required aria-label='Your name' />
          )}
          <input type='email' placeholder='Email' autoComplete='email' value={form.email} onChange={set('email')} required aria-label='Email' />
          <div className='pw-field'>
            <input
              type={showPw ? 'text' : 'password'}
              placeholder='Password (min 6 characters)'
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={set('password')}
              required
              aria-label='Password'
            />
            <button type='button' className='pw-toggle' aria-label={showPw ? 'Hide password' : 'Show password'} onClick={() => setShowPw((s) => !s)}>
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {error && <p className='form-error' role='alert'>{error}</p>}
          <button type='submit' className='submit-btn' disabled={busy}>{busy ? 'Please wait…' : mode}</button>
          <div className='form-help'>
            <label className='remember-me'>
              <input type='checkbox' checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
          </div>
        </form>
        <button type='button' className='guest-btn' onClick={() => { guest(); navigate(redirectTo, { replace: true }) }}>
          Continue as guest
        </button>
        <div className='form-switch'>
          {isSignUp ? (
            <p>Already have an account? <button type='button' onClick={() => switchMode('Sign In')}>Sign in</button></p>
          ) : (
            <p>New to Auxa Studios? <button type='button' onClick={() => switchMode('Sign Up')}>Sign up now</button></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
