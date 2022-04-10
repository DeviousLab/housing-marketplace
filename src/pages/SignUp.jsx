import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

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
          <p className='pageHeader'>Welcome!</p>
        </header>
        <form>
          <input type="text" name="name" id="name" className='nameInput' placeholder='First Name' value={name} onChange={onChange} />
          <input type="email" name="email" id="email" className='emailInput' placeholder='Email Address' value={email} onChange={onChange} />
          <div className='passwordInputDiv'>
            <input type={showPassword ? 'text' : 'password'} name="password" id="password" className='passwordInput' placeholder='Password' value={password} onChange={onChange} />
            <img src={visibilityIcon} alt='Show Password?' className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#fff' width='36px' height='36px' />
            </button>
          </div>
        </form>

        <Link to='/signin' className='registerLink'>Sign in instead?</Link>
      </div>
    </>
  )
}

export default SignUp