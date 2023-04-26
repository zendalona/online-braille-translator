import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/Toolbar.module.css'

import { ChromePicker } from 'react-color';
import { Editor } from 'slate';
import { useFocused, useSelected } from 'slate-react';
function Toolbar({editor,fontColor,setFontColor}) {
  
  const [showColorPicker, setShowColorPicker] = useState(false)

  const fontColorChange=(color)=>{
    setFontColor(color.hex)
    console.log(color);
    Editor.addMark(editor, 'color', color.hex);

  }







  return (

<div className={`${styles.toolbox} container-fluid`}>


      <div className={`${styles.tools} px-3 col-12`}>
        <div className={`${styles.toolContainer} pe-1`}>
          <div><a href="#" title="Open"><i className="fa fa-folder-open"></i></a></div>
          <div><a href="#" title="Undo"><i className="fas fa-undo"></i></a></div>
          <div><a href="#" title="Redo"><i className="fas fa-redo"></i></a></div>
        </div>
        <div className={`${styles.toolContainer} pe-1`}>
        <div><a onClick={()=>setShowColorPicker(!showColorPicker)} title="font"><i className="fas fa-font">
          <div className={styles.fontColor} style={{background: fontColor}}></div>
        

          </i></a></div>
        </div>
      
      </div>
      {showColorPicker && <div className={styles.colorPicker}> <ChromePicker color={fontColor} onChange={(color)=>fontColorChange(color)}/> </div>}
    </div>
  )
}

export default Toolbar