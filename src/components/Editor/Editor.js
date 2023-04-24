import React from 'react'
import styles from '../../styles/Editor.module.css'
import BrailleEditor from '../BrailleEditor/BrailleEditor'
import TextEditor from '../TextEditor/TextEditor'
function Editor() {
    return (
        <section className="container-fluid py-4">
            <div className={styles.editorBox}>
               <TextEditor/>
               <BrailleEditor/> 
               
            </div>
        </section>
    )
}

export default Editor