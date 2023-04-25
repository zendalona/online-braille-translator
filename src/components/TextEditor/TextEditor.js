import { editorsContext } from '@/pages'
import React, { useContext, useEffect, useMemo } from 'react'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import styles from '../../styles/TextEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'
function TextEditor() {
    const textEditor = useMemo(() => withReact(createEditor()), [])

    const { text, setText, setBraille } = useContext(editorsContext)

    const handleChange = (value) => {
        setText(value)

    }
    useEffect(() => {
        console.log(text);


    }, [text])



    return (
        <>
            <div className="col-12 col-sm-6 px-2">

                <div className={styles.textEditor}>
                    <Toolbar />
                    {/* <div className={styles.editorIcon}><a href="#" title="Download">
                    <i className="fas fa-download me-3"></i>
                </a></div> */}
                    {/* <div className= {`${styles.textField} mx-3 p-1`}></div> */}
                    <Slate editor={textEditor} value={text} onChange={(value) => handleChange(value)}>
                        <Editable className={`${styles.textField} mx-3 p-1`} />
                    </Slate>
                    <div className={`${styles.editorFooter} px-3 py-2`} >
                        <div><select >
                            <option value="" defaultValue>Select a language</option>
                            <option value="12">English</option>
                            <option value="13">Malayalam</option>
                        </select></div><button className="btn btn-primary btn-sm" type="button" onClick={() => setBraille(text)}>Translate</button>
                    </div>
                </div>
            </div></>
    )
}

export default TextEditor