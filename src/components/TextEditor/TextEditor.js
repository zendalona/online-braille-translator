import { editorsContext, socketContext } from '@/pages'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createEditor, Editor, Node, path, Path, Range, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import axios from 'axios'

import { Editable, Slate, useSlate, withReact } from 'slate-react'
import styles from '../../styles/TextEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'



function TextEditor({ brailleEditor }) {
    const textEditor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [fontColorPicker, setFontColorPicker] = useState(false)
    const [highlightColorPicker, setHighlightColorPicker] = useState(false)
    const [backgroundPicker, setBackgroundPicker] = useState(false)
    const [background, setBackground] = useState("#ffffff")
    const [language, setLanguage] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)


    const { text, setText, setBraille } = useContext(editorsContext)
    const socket = useContext(socketContext)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])



    const handleChange = (value) => {
        setText(value)

    }

    const handleClick = () => {
        const { selection } = textEditor
        //console.log(selection);
        const check = Range.isCollapsed(selection);
        console.log(check);

        if (check) {
            var plainText = text.map(n => Node.string(n)).join('')
        }
        else {
            var plainText = Editor.string(textEditor, selection)
            console.log(plainText);
        }


        socket.emit('translate', { text: plainText, language: language })








        // axios.post('/api/translate', { text: text, language: language }).then(({data}) => {
        //     console.log(data);

        //     


        // })

        // console.log(text);
        // const plainText = text.map(n => Node.string(n)).join('\n')
        // console.log(plainText);

    };
    const brailleResult = (brailleText) => {
        const { selection } = brailleEditor
        console.log(selection);
        //console.log(Editor.end(brailleEditor, []));
        Transforms.insertText(brailleEditor, brailleText, {
            at: selection ? selection.anchor : Editor.end(brailleEditor, [])
        })
    }


    useEffect(() => {
        if (socket) {
            socket.on('result', brailleResult)

            return () => {
                socket.off('result', brailleResult)
            }
        }
    }, [socket])


    const selectLanguage = (value) => {
        if (value === "")
            setIsDisabled(true)
        else
            setIsDisabled(false)

        setLanguage(value)
        console.log(value);
    }

    const Leaf = ({ attributes, children, leaf }) => {

        return <span {...attributes} style={{ ...leaf }}>{children}</span>
    }











    return (
        <>
            <div className="col-12 col-sm-6 px-2">

                <div className={styles.textEditor}>


                    <Slate editor={textEditor} value={text} onChange={(value) => handleChange(value)}>
                        <Toolbar state={text} fontColorPicker={fontColorPicker} setFontColorPicker={setFontColorPicker} highlightColorPicker={highlightColorPicker} setHighlightColorPicker={setHighlightColorPicker} background={background}  setBackground={setBackground} backgroundPicker={backgroundPicker} setBackgroundPicker={setBackgroundPicker} />
                        <Editable
                            onClick={() => {
                                fontColorPicker ? setFontColorPicker(false) : null
                                highlightColorPicker ? setHighlightColorPicker(false) : null
                                backgroundPicker ? setBackgroundPicker(false) : null
                            }}
                            // renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some rich text…"
                            spellCheck
                            autoFocus
                            className={`${styles.textField} mx-3 p-1`}
                            style={{backgroundColor:background}} />
                    </Slate>
                    <div className={`${styles.editorFooter} px-3 py-2`} >
                        <div><select onChange={(event) => selectLanguage(event.target.value)}>
                            <option value="" defaultValue>Select a language</option>
                            <option value="English">English</option>
                            <option value="Malayalam">Malayalam</option>
                        </select></div><button className="btn btn-primary btn-sm" disabled={isDisabled} type="button" onClick={handleClick}>Translate</button>
                    </div>
                </div>
            </div></>
    )
}

export default TextEditor