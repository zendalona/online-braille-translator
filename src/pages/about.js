import styles from '../styles/about.module.css'

export default function about() {
    return (
        <div>
            
            <div className={`container-fluid ${styles.about_container}`}>
                <h6 className={`${styles.about_head} mt-3`}>BRAILLE TRANSLATOR<br />0.1</h6>
                <p className="col-md-7 mt-2">Braille Translator is a graphical user interface which converts any language into Braille using Liblouis. Braille is a system of tactile communication which allows visually impaired people to read and write.</p>
                <p>copyright(c) 2022-2023 JITHESH M&nbsp; &lt;jitheshmjithooz@gmail.com&gt;</p>
                <p>Supervised by Zendalona(2022-2023)</p>
                <p className="col-md-7">This program is free software you can redistribute it and or modify it under the terms of GNU General Public License as published by the free software foundation&nbsp; either gpl3 of the license.This program is distributed in the hope that it will be useful, but without any warranty without even the implied warranty of merchantability or fitness for a particular purpose. see the GNU General Public License for more details</p><a href="#">GNU General Public License,version 0.1</a><a className="mt-2" href="#">Visit BRAILLE TRANSLATOR Home page</a>
                <h6 className="mt-4">Credits</h6>
                <p>Created and Documented by JITHESH M</p>
                <p>Artwork by</p>
                <p>Nalin Sathyan<br /> Dr.Saritha Namboodiri<br /> Subha I N<br /> Bhavya P V<br /> K.Sathyaseelan</p>
            </div>
        </div>

    )
}
