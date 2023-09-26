import React from 'react'
import styles from '../../styles/Login.module.css'
function Login() {
  return (
    <section className={`container-fluid ${styles.auth_container}`}>
  <div><a className={`btn btn-primary ${styles.signin_btn}`} href="/auth/google"><i className="fa fa-google" />SIGN IN WITH GOOGLE</a></div>
</section>

  )
}

export default Login