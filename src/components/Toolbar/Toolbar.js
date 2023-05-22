import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/Toolbar.module.css'

import { ChromePicker } from 'react-color';
import { Editor } from 'slate';
import { useFocused, useSelected, useSlate } from 'slate-react';

function Toolbar({ showColorPicker, setShowColorPicker }) {
  const [fontColor, setFontColor] = useState("#000000")
  const editor = useSlate();

  //console.log(editor);


  const fontColorChange = (color) => {
    setFontColor(color.hex)
    console.log(color);
    Editor.addMark(editor, 'color', color.hex);

  }



  useEffect(() => {
    let same = true;

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      console.log(selection.rangeCount);
      const range = selection.getRangeAt(0);


      const styles = [];
      let currentNode = range.startContainer.parentNode.parentNode.parentNode;

      while (currentNode !== range.endContainer.parentNode.parentNode.parentNode.nextSibling) {


        const stylesObj = {};
        const nodeStyles = window.getComputedStyle(currentNode.childNodes[0]);
        stylesObj.color = nodeStyles.getPropertyValue('color');
        console.log(stylesObj.color);
        if (styles.length != 0) {
          if (stylesObj.color === styles[0].color) {
            styles.push(stylesObj);
          }
          else {
            same = false
            break;
          }
        } else {
          styles.push(stylesObj);
        }
        currentNode = currentNode.nextSibling;

      }



      if (same) {
        setFontColor(styles[0].color)

      }
      else {
        setFontColor("")
      }
    }




  }, [editor.selection])






  return (

    <div className={`${styles.toolbox} container-fluid`}>


      <div className={`${styles.tools} px-3 col-12`}>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><a href="#" title="New"><i className="fas fa-file"></i></a></div>
          <div><a href="#" title="Open"><i className="fa fa-folder-open"></i></a></div>
          <div><a href="#" title="Download"><i className="fas fa-download"></i></a></div>

        </div>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><a href="#" title="Undo"><i className="fas fa-undo"></i></a></div>
          <div><a href="#" title="Redo"><i className="fas fa-redo"></i></a></div>
        </div>

        <div className={`${styles.toolContainer} pe-2`}>
          <div><a onClick={() => setShowColorPicker(!showColorPicker)} title="font color"><i className="fas fa-font">
            <div className={styles.colorIndicate} style={{ background: fontColor }}></div>


          </i></a></div>
          <div><a  title="highlight"><i className="fas fa-highlighter">
            <div className={styles.colorIndicate} style={{ background: fontColor }}></div>
          </i></a></div>

        </div>

      </div>
      {showColorPicker && <div className={styles.colorPicker}> <ChromePicker color={fontColor} onChange={(color) => fontColorChange(color)} /> </div>}
    </div>
  )
}

export default Toolbar