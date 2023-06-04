import { editorsContext } from '@/pages'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import styles from '../../styles/BrailleEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'
import { withHistory } from 'slate-history'
import braillePattern from '../../../public/braille/braillePattern.txt'
function BrailleEditor({ brailleEditor }) {

    const [fontColorPicker, setFontColorPicker] = useState(false)
    const [highlightColorPicker, setHighlightColorPicker] = useState(false)
    const { braille, setBraille } = useContext(editorsContext)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const keys = useRef([])
    const handleChange = (value) => {
        setBraille(value)
        console.log(value);

    }
    const handleKeyDown = (event) => {
        console.log(event.key);
        if (event.key != 'Backspace') {
            event.preventDefault()
            keys.current.push(event.key)
        }


    }

    const handleKeyUp = (event) => {
        //console.log(keys.current);
        if (keys.current.length > 0) {
            keys.current = keys.current.map((data) => {
                if (data === 'f' || data === 'F') {
                    return '1'
                } else if (data === 'd' || data === 'D') {
                    return '2'
                }
                else if (data === 's' || data === 'S') {
                    return '3'
                }
                else if (data === 'j' || data === 'J') {
                    return '4'
                }
                else if (data === 'k' || data === 'K') {
                    return '5'
                }
                else if (data === 'l' || data === 'L') {
                    return '6'
                }

            })
            keys.current.sort((a, b) => a - b)
            keys.current = keys.current.join("")
            const patternLines = braillePattern.split('\n')
            patternLines.every((line) => {
                const [key, value] = line.trim().split(' ')
                if (keys.current === key) {
                    brailleEditor.insertText(value)
                    return false
                } else {

                    return true
                }
            })

            keys.current = []
        }
    }


    const Leaf = ({ attributes, children, leaf }) => {

        return <span {...attributes} style={{ ...leaf }}>{children}</span>
    }
    return (<>
        <div className="col-12 col-sm-6 px-2">

            <div className={`${styles.brailleEditor} pb-1`}>

                {/* <div className={styles.editorIcon}><a href="#" title="Download">
                    <i className="fas fa-download me-3"></i>
                </a></div> */}
                <Slate editor={brailleEditor} value={braille} onChange={(value) => handleChange(value)} >
                    <Toolbar state={braille} fontColorPicker={fontColorPicker} setFontColorPicker={setFontColorPicker} highlightColorPicker={highlightColorPicker} setHighlightColorPicker={setHighlightColorPicker} />
                    <Editable
                        onClick={() => {
                            fontColorPicker ? setFontColorPicker(false) : null
                            highlightColorPicker ? setHighlightColorPicker(false) : null
                        }}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        // renderElement={renderElement}
                        renderLeaf={renderLeaf}


                        className={`${styles.textField} mx-3 p-1 mb-5`} />
                </Slate>
            </div>

        </div></>
    )
}

export default BrailleEditor