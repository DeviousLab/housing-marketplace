import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

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

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      if (userCredentials.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Invalid email or password...')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back!</p>
        </header>
        <form onSubmit={onSubmit}>
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

        <OAuth />

        <Link to='/signup' className='registerLink'>Don't have an account?</Link>
      </div>
    </>
  )
}

export default SignIn