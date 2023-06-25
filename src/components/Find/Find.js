/*  Braille-Translator

    Copyright (C) 2022-2023 Jithesh M <jitheshmjithooz@gmail.com>
    
    V T Bhattathiripad College, Sreekrishnapuram, Kerala, India

    This project supervised by Zendalona(2022-2023) 

    Project Home Page : www.zendalona.com/braille-translator

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


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
        <Draggable cancel='.btn,i,input' >
            <div className={`col-6 col-sm-4 col-xl-2 ${styles.findContainer} py-3`} style={{ boxShadow: '1px 1px 3px' }}>
                <div className={`${styles.findHead} px-4 my-3`}><span><strong>Find</strong></span><i onClick={() => { setShowFind(false); setSearch(null) }} className="fa fa-close" /></div>
                <div className={`col-12 ${styles.findBody} px-4 pe-4 my-2`}><span>Word</span><input value={search} onChange={handleChange} onKeyDown={keyPress} type="text" className="col-8" /></div>
                {!isFound && <span style={{ display: 'flex', justifyContent: 'center' }}>Not found</span>}
                <div className={`${styles.findFooter} px-3 my-3`}><button onClick={prevClick} className="btn btn-primary" type="button">Previous</button><button onClick={nextClick} className="btn btn-primary" type="button">Next</button></div>
            </div>
        </Draggable>

    )
}

export default Find