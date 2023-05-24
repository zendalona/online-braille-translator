import { editorsContext } from '@/pages'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import styles from '../../styles/BrailleEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'
import { withHistory } from 'slate-history'
function BrailleEditor({ brailleEditor}) {
   
    const [showColorPicker, setShowColorPicker] = useState(false)
    const { braille, setBraille } = useContext(editorsContext)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const handleChange = (value) => {
        setBraille(value)
        console.log(value);

    }
    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.color) {
            return <span {...attributes} style={{ color: leaf.color }}>{children}</span>
        }
        else {
            return <span {...attributes}>{children}</span>
        }




    }
    return (<>
        <div className="col-12 col-sm-6 px-2">

            <div className={`${styles.brailleEditor} pb-1`}>
                
                {/* <div className={styles.editorIcon}><a href="#" title="Download">
                    <i className="fas fa-download me-3"></i>
                </a></div> */}
                <Slate editor={brailleEditor} value={braille} onChange={(value) => handleChange(value)} >
                <Toolbar state={braille} showColorPicker={showColorPicker} setShowColorPicker={setShowColorPicker}/>
                <Editable
                            onClick={() => showColorPicker ? setShowColorPicker(false) : null}
                            // renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            
                           
                            className={`${styles.textField} mx-3 p-1 mb-5`} />
                </Slate>
            </div>

        </div></>
    )
}

export default BrailleEditor