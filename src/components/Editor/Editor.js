import React, { useEffect, useState } from 'react'
import styles from '../../styles/Editor.module.css'
import BrailleEditor from '../BrailleEditor/BrailleEditor'
import TextEditor from '../TextEditor/TextEditor'
function Editor() {
    const [component, setComponent] = useState(null)
    useEffect(() => {
      
    setComponent([<TextEditor/>,<BrailleEditor/> ])
      
    },[])
    
    return (<>
        <section className="container-fluid py-4">
            <div className={styles.editorBox}>
               
               {component}
               
            </div>
        </section></>
    )
}

export default Editor