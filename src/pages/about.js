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


import styles from '../styles/about.module.css'

export default function about() {
    return (
        <div>

            <div className={`container-fluid ${styles.about_container}`}>
                <h6 className={`${styles.about_head} mt-3`}>BRAILLE TRANSLATOR<br />0.1</h6>
                <p className="col-md-7 mt-2">Braille Translator is a web application which converts any language into Braille using Liblouis.<br /> Braille is a system of tactile communication which allows visually impaired people to read and write.</p>
                <p>copyright(c) 2022-2023 JITHESH M&nbsp; &lt;jitheshmjithooz @ gmail .com&gt;</p>
                <p>Supervised by Zendalona(2022-2023)</p>
                <p className="col-md-7">This program is free software you can redistribute it and or modify it under the terms of GNU General Public License as published by the free software foundation&nbsp; either gpl3 of the license.This program is distributed in the hope that it will be useful, but without any warranty without even the implied warranty of merchantability or fitness for a particular purpose. see the GNU General Public License for more details</p>
                <a href="#">GNU General Public License,version 0.1</a>
                <a className="mt-2" href="/">Visit Home page</a>
                <h6 className="mt-4">Credits</h6>
                <p>Created and Documented by Jithesh M</p>
                <p>Artwork by</p>
                <p className={styles.list}>Nalin Sathyan<br /> Dr.Saritha Namboodiri<br /> Subha I N<br /> Bhavya P V<br /> K.Sathyaseelan</p>
            </div>
        </div>

    )
}
