import { findEnter, findNext, findPrev, searchWord } from '@/handlers/handler'
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

    const keyPress = (event) => { 
        findEnter(event, index, result, search, setIsFound, editor)
    }

    const nextClick = () => {
        findNext(index, result, search, setIsFound, editor)
    }

    const prevClick = () => {
        findPrev(index, result, search, setIsFound, editor)
    }

    return (
        <Draggable bounds='parent'>
            <div className={`col-6 col-sm-4 col-xl-2 ${styles.findContainer} py-3`} style={{ boxShadow: '1px 1px 3px' }}>
                <div className={`${styles.findHead} px-4 my-3`}><span><strong>Find</strong></span><i onClick={() => { setShowFind(false) }} className="fa fa-close" /></div>
                <div className={`col-12 ${styles.findBody} px-4 pe-4 my-2`}><span>Word</span><input value={search} onChange={handleChange} onKeyDown={keyPress} type="text" className="col-8" /></div>
                {!isFound && <span style={{ display: 'flex', justifyContent: 'center' }}>Not found</span>}
                <div className={`${styles.findFooter} px-3 my-3`}><button onClick={prevClick} className="btn btn-primary" type="button">Previous</button><button onClick={nextClick} className="btn btn-primary" type="button">Next</button></div>
            </div>
        </Draggable>

    )
}

export default Find