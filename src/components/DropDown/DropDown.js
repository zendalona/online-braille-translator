import React, { useState } from 'react'
import styles from "../../styles/DropDown.module.css"
function DropDown({name}) {
   
        const [isOpen, setIsOpen] = useState(false);

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        }

        return (
            <>
                <div className={styles.dropdown}>
                    <button className={styles.dropBtn} onClick={toggleDropdown}>
                       {name?name:"Account"}
                    </button>
                    {isOpen && (
                        <div className={styles.dropdownContent}>
                            {/* Dropdown content goes here */}
                            {
                                name?<a href="/logout">Logout</a>:<a href="/login">Login</a>
                            }
                            
                        </div>
                    )}
                </div>

            </>
        )
    }

    export default DropDown