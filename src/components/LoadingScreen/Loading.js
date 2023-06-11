import React from 'react'
import styles from '../../styles/Loading.module.css'

function Loading() {
    return (
        <div className={styles.loading}>
            <span className={`col-10 ${styles.loadingText}`}>
                <span style={{ color: 'rgb(255, 255, 255)' }}>Translating....</span>
            </span>
        </div>

    )
}

export default Loading