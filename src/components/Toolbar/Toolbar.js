import React from 'react'
import styles from '../../styles/Toolbar.module.css'
function Toolbar() {
  return (
    <div className={`${styles.toolbox} container-fluid`}>
        
       
            <div className={`${styles.tools} px-3 col-12`}>
                <div className={`${styles.toolContainer} pe-1`}>
                    <div><a href="#" title="Open"><i className="fa fa-folder-open"></i></a></div>
                    <div><a href="#" title="Undo"><i className="fas fa-undo"></i></a></div>
                    <div><a href="#" title="Redo"><i className="fas fa-redo"></i></a></div>
                </div>
            </div>
    
    </div>
  )
}

export default Toolbar