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


import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Loading.module.css'

function Loading() {
    const [text, setText] = useState("Translating....")

    useEffect(() => {
        const interval = setInterval(() => {
            setText((prev) => prev === 'Translating....' ? 'Translating...' : 'Translating....')
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [])
    return (
        <div className={styles.loading} aria-live="assertive">
            <span className={`col-10 ${styles.loadingText}`} aria-atomic="true">
                <span style={{ color: 'rgb(255, 255, 255)' }} >{text}</span>
            </span>
        </div>

    )
}

export default Loading