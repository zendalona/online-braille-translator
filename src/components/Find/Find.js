import { searchWord } from '@/handlers/handler'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import styles from '../../styles/Find.module.css'

function Find({ editor, search, setSearch, setShowFind }) {
    const result = useRef([])
    const index = useRef(-1)
    const [isFound, setIsFound] = useState(true)
    const handleChange = (event) => {
        setSearch(event.target.value)

    }
    const handleKeyPress = (event) => {

        if (event.code === 'Enter') {
            event.preventDefault()
            result.current = searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            }else{
                setIsFound(true)
            }
            index.current = 0
            if (result.current.length > 0) {
                console.log(editor);
                index.current = 0
                Transforms.select(editor, {
                    anchor: { path: result.current[0].path, offset: result.current[0].start },
                    focus: { path: result.current[0].path, offset: result.current[0].start + result.current[0].length },
                })
                ReactEditor.focus(editor);
            }

        }
    }

    const nextClick = () => {
        if (index.current == -1) {
            result.current = searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            }else{
                setIsFound(true)
            }
        }
        index.current = index.current + 1
        if (index.current >= result.current.length) {
            index.current = 0
        }
        Transforms.select(editor, {
            anchor: { path: result.current[index.current].path, offset: result.current[index.current].start },
            focus: { path: result.current[index.current].path, offset: result.current[index.current].start + result.current[index.current].length },
        })
        ReactEditor.focus(editor);


    }
    const prevClick = () => {
        if (index.current == -1) {
            result.current = searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            }else{
                setIsFound(true)
            }
            index.current = 0
        } else {
            index.current = index.current - 1
        }

        if (index.current < 0) {
            index.current = result.current.length - 1
        }
        Transforms.select(editor, {
            anchor: { path: result.current[index.current].path, offset: result.current[index.current].start },
            focus: { path: result.current[index.current].path, offset: result.current[index.current].start + result.current[index.current].length },
        })
        ReactEditor.focus(editor);


    }

    return (
        <Draggable bounds='parent'>
            <div className={`col-6 col-sm-2 ${styles.findContainer} py-3`} style={{ boxShadow: '1px 1px 3px' }}>
                <div className={`${styles.findHead} px-4 my-3`}><span><strong>Find</strong></span><i onClick={() => { setShowFind(false) }} className="fa fa-close" /></div>
                <div className={`col-12 ${styles.findBody} px-4 pe-4 my-2`}><span>Word</span><input value={search} onChange={handleChange} onKeyDown={handleKeyPress} type="text" className="col-8" /></div>
                {!isFound && <span style={{ display: 'flex', justifyContent: 'center' }}>Not found</span>}
                <div className={`${styles.findFooter} px-3 my-3`}><button onClick={prevClick} className="btn btn-primary" type="button">Previous</button><button onClick={nextClick} className="btn btn-primary" type="button">Next</button></div>
            </div>
        </Draggable>

    )
}

export default Find