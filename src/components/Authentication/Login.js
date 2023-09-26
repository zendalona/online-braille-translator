import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Login.module.css'
function Login() {
    const router=useRouter()
  return (
    <section className={`container-fluid ${styles.auth_container}`}>
  <div><button className={`btn btn-primary ${styles.signin_btn}`} onClick={()=>{router.push("/auth/google")}}><i className="fa fa-google" />SIGN IN WITH GOOGLE</button></div>
</section>

  )
}

export default Login