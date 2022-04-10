import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back!</p>
        </header>
        <form action="">
          <input type="email" name="email" id="email" className='emailInput' placeholder='Email Address' value={email} onChange={onChange} />
          <div className='passwordInputDiv'>
            <input type={showPassword ? 'text' : 'password'} name="password" id="password" className='passwordInput' placeholder='Password' value={password} onChange={onChange} />
            <img src={visibilityIcon} alt='Show Password?' className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          <Link to='/forgotpassword' className='forgotPasswordLink'>Forgot Password?</Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#fff' width='36px' height='36px' />
            </button>
          </div>
        </form>

        <Link to='/signup' className='registerLink'>Don't have an account?</Link>
      </div>
    </>
  )
}

export default SignIn