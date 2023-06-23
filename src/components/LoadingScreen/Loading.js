import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Loading.module.css'

function Loading() {
    const [text, setText] = useState("Translating....")
    
    useEffect(()=>{
        const interval= setInterval(() => {
           setText((prev)=>prev==='Translating....'?'Translating...':'Translating....')
        }, 3000);

        return () => {
            clearInterval(interval);
          };
    },[])
    return (
        <div className={styles.loading} aria-live="assertive">
            <span className={`col-10 ${styles.loadingText}`} aria-atomic="true">
                <span style={{ color: 'rgb(255, 255, 255)' }} >{text}</span>
            </span>
        </div>

    )
}

export default Loading