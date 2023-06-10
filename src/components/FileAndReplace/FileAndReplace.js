import { findEnter, findNext, findPrev, replaceAll, wordReplace } from '@/handlers/handler'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import styles from '../../styles/Find.module.css'

function FileAndReplace({ editor, search, setSearch, setShowReplace }) {

    const result = useRef([])
    const index = useRef(-1)
    const [replace, setReplace] = useState(null)
    const [isFound, setIsFound] = useState(true)
    const [disable, setDisable] = useState(true)
    const handleChange = (event) => {
        setSearch(event.target.value)

    }

    const keyPress = (event) => {
        findEnter(event, index, result, search, setIsFound, editor)
        if (result.current.length > 0) {
            setDisable(false)
        }
        
    }

    const nextClick = () => {
        findNext(index, result, search, setIsFound, editor)
        if (result.current.length > 0) {
            setDisable(false)
        }
    }

    const prevClick = () => {
        findPrev(index, result, search, setIsFound, editor)
        if (result.current.length > 0) {
            setDisable(false)
        }
    }

    const replaceClick = () => {
        if (replace !== null) {
            wordReplace(index, result, replace, setIsFound, editor)
            if (result.current.length === 0) {
                setDisable(true)
            }
        }
    }
    const replaceAllClick = () => {
        if (replace !== null) {
            replaceAll(index, result, replace, setIsFound, editor, search)
            if (result.current.length === 0) {
                setDisable(true)
            }
        }
    }
    const handleReplaceChange = (event) => {
        setReplace(event.target.value)
    }





    return (
        <Draggable cancel='.btn,i,input' >
            <div className={`col-8 col-sm-4 col-xl-3 ${styles.findContainer} py-3`} style={{ boxShadow: '1px 1px 3px' }}>
                <div className={`${styles.findHead} px-4 my-3`}><span><strong>Find And Replace</strong></span><i onClick={()=>setShowReplace(false)} className="fa fa-close" /></div>
                <div className={`col-12 ${styles.findBody} px-4 pe-4 my-2`}><span>Word</span><input value={search} onChange={handleChange}  type="text" className="col-8" /></div>
                <div className={`col-12 ${styles.findBody} px-4 pe-4 my-2`}><span>Replace</span><input value={replace} onChange={handleReplaceChange} onKeyDown={keyPress} type="text" className="col-8" /></div>
                {!isFound && <span style={{ display: 'flex', justifyContent: 'center' }}>Not found</span>}
                <div className={`${styles.findFooter} px-3 my-3`}><button className="btn btn-primary m-1" disabled={disable} onClick={replaceClick} type="button">Replace</button><button className="btn btn-primary m-1" disabled={disable} onClick={replaceAllClick} type="button">Replace All</button><button className="btn btn-primary m-1" onClick={prevClick} type="button">Previous</button><button className="btn btn-primary m-1" onClick={nextClick} type="button">Next</button></div>
            </div>
        </Draggable>
    )
}

export default FileAndReplace