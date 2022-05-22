import React from 'react'

const Login = () => {
  return (
    <>
     <section className="landing login">
       <div className="overlay">
         <form action="" className="form">
           <input type="email" name="email" id="email" placeholder='email' required/>
           <input type="password" name="password" id="password" placeholder='password' required/>
             <button type="submit">Log In</button>
         </form>
       </div>
     </section>
    </>
  )
}

export default Login