import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { db } from '../firebase.config'

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

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      const formDataCopy = { ...formData }
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome!</p>
        </header>
        <form onSubmit={onSubmit}>
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