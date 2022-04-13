import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent successfully!');
    } catch (error) {
      toast.error('Could not send password reset email');
    }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" id="email" className="emailInput" placeholder="Email Address" value={email} onChange={onChange} />
          <Link className='forgotPasswordLink' to='/signin'>Back to Sign In</Link>
          <div className="signInBar">
            <p className="signInText">Send Reset Link</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#fff' width='36px' height='36px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword