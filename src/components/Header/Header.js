import React from 'react'
import Logo from '../Logo/Logo'
import styles from '../../styles/Header.module.css'

function Header() {
  return (
    <>
      <div className={styles.headerbox}>
        <div className="pt-2 container-fluid" style={{display:"flex"}}>
          <Logo />
          <div className={`col-6 ${styles.headerNav} pe-5`}>
            <a href='/'> Home</a>
            <a href='/about'>About</a>
          </div>
        </div>
      </div>

    </>
  )
}

export default Header