import { editorsContext } from '@/pages'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createEditor, Editor, Node, path, Path, Range } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import styles from '../../styles/TextEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'
function TextEditor() {
    const textEditor = useMemo(() => withHistory(withReact(createEditor())), [])

   

    const { text, setText, setBraille } = useContext(editorsContext)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])


    const handleChange = (value) => {
         setText(value)

    }
    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.color) {
           return <span {...attributes} style={{ color: leaf.color }}>{children}</span>
        }
        else{
            return <span {...attributes}>{children}</span>
        }



       
    }











    return (
        <>
            <div className="col-12 col-sm-6 px-2">

                <div className={styles.textEditor}>


                    <Slate editor={textEditor} value={text} onChange={(value) => handleChange(value)}>
                        <Toolbar   />
                        <Editable
                            // renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some rich text…"
                            spellCheck
                            autoFocus
                            className={`${styles.textField} mx-3 p-1`} />
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