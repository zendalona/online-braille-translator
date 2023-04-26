import { editorsContext } from '@/pages'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createEditor, Editor, Node, path, Path, Range } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import styles from '../../styles/TextEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'
function TextEditor() {
    const textEditor = useMemo(() => withReact(createEditor()), [])

    const [fontColor, setFontColor] = useState("#000000")

    const { text, setText, setBraille } = useContext(editorsContext)


    const handleChange = (value) => {
        setText(value)

    }

    const renderLeaf = ({ attributes, children, leaf }) => {
        console.log("leaf" + leaf.color);
        if (leaf.color) {
            return <span {...attributes} style={{ color: leaf.color }}>{children}</span>;
        } else {
            return <span {...attributes}>{children}</span>;
        }
    };


    const editor = textEditor
//function to change font color indication in toolbar
    const cursorChange = () => {
const {selection}=editor
        const { anchor, focus } = editor.selection;

        if (anchor && focus && Path.compare(anchor.path, focus.path) === 0) {
            if (selection) {
                const [node] = Editor.node(editor, selection);
                const [leaf] = Editor.leaf(editor, selection);
            
                const marks = Editor.marks(editor, leaf.path);
            
                const color = marks?.color;
                if(color)
                setFontColor(color)
                else
                setFontColor("#000000")
                console.log(color); // or update state with the color value
              }

            
        }
        else {
            setFontColor("")
        }


    }





    return (
        <>
            <div className="col-12 col-sm-6 px-2">

                <div className={styles.textEditor}>
                    <Toolbar editor={textEditor} fontColor={fontColor} setFontColor={setFontColor} />

                    <Slate editor={textEditor} value={text} onChange={(value) => handleChange(value)}>
                        <Editable renderLeaf={renderLeaf} onSelect={() => cursorChange()} className={`${styles.textField} mx-3 p-1`} />
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