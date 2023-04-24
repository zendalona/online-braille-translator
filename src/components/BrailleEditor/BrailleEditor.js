import React from 'react'
import styles from '../../styles/BrailleEditor.module.css'
function BrailleEditor() {
    return (
        <div className="col-12 col-sm-6 px-2">
            
                <div className={`${styles.brailleEditor} pb-1`}>
                <div className={styles.editorIcon}><a href="#" title="Download">
                    <i className="fas fa-download me-3"></i>
                </a></div>
                <div className= {`${styles.textField} mx-3 p-1 mb-5`}></div>
                </div>
           
        </div>
    )
}

export default BrailleEditor