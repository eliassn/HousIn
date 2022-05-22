import React from 'react'

const SignUp = () => {
  return (
    <>
     <section className="landing login">
       <div className="overlay">
         <form action="" className="form">
           <input type="text" name="" id="" placeholder='full name' required/>
           <input type="email" name="" id="" placeholder='email' required/>
           <input type="password" name="password1" id="password1" placeholder='password' required/>
           <input type="password" name="password2" id="password2" placeholder='confirm your password' required/>
           <button type="submit">Create Account</button>
         </form>
       </div>
       </section> 
    </>
  )
}

export default SignUp