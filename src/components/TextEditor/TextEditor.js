import React from 'react'
import styles from '../../styles/TextEditor.module.css'
function TextEditor() {
    return (
        <div className="col-12 col-sm-6 px-2">
            <div className={styles.textEditor}>
                <div className={styles.editorIcon}><a href="#" title="Download">
                    <i className="fas fa-download me-3"></i>
                </a></div>
                <div className= {`${styles.textField} mx-3 p-1`}></div>
                <div className={`${styles.editorFooter} px-3 py-2`} >
                    <div><select >
                        <option value="" defaultValue>Select a language</option>
                        <option value="12">English</option>
                        <option value="13">Malayalam</option>
                    </select></div><button className="btn btn-primary btn-sm" type="button">Translate</button>
                </div>
            </div>
        </div>
    )
}

export default TextEditor