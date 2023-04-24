import { editorsContext } from '@/pages'
import React, { useContext, useEffect, useMemo } from 'react'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import styles from '../../styles/BrailleEditor.module.css'
function BrailleEditor() {
    const brailleEditor=useMemo(()=>withReact(createEditor()),[])
    const {braille,setBraille}=useContext(editorsContext)
    const handleChange=(value)=>{
        setBraille(value)
         
     }
     useEffect(() => {
      console.log(braille);
     
       
     }, [braille])
    return (<>
        <div className="col-12 col-sm-6 px-2">
            
                <div className={`${styles.brailleEditor} pb-1`}>
                <div className={styles.editorIcon}><a href="#" title="Download">
                    <i className="fas fa-download me-3"></i>
                </a></div>
                <Slate editor={brailleEditor} value={braille} onChange={(value)=>handleChange(value)} key={JSON.stringify(braille)}>
                    <Editable className={`${styles.textField} mx-3 p-1 mb-5`} />
                </Slate>
                </div>
           
        </div></>
    )
}

export default BrailleEditor