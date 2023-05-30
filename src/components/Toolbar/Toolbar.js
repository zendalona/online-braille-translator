import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/Toolbar.module.css'

import { ChromePicker } from 'react-color';
import { Editor } from 'slate';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { downloadClick, newClick } from '@/handlers/handler';
import FileUpload from '../FileUpload/FileUpload';

function Toolbar({ state, fontColorPicker, setFontColorPicker, highlightColorPicker, setHighlightColorPicker }) {
  const [fontColor, setFontColor] = useState("#000000")
  const [highlight, setHighlight] = useState("#ffffff")
  const [showFileUpload, setShowFileUpload] = useState(false)
  const editor = useSlate();

  //console.log(editor);


  const fontColorChange = (color) => {
    setFontColor(color.hex)
    console.log(color);
    Editor.addMark(editor, 'color', color.hex);

  }

  const highlightChange = (color) => {
    setHighlight(color.hex)
    Editor.addMark(editor, 'backgroundColor', color.hex);
  }



  useEffect(() => {
    let color = true;
    let backgroundColor = true;

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
        stylesObj.backgroundColor = nodeStyles.getPropertyValue('background-color');
        console.log(stylesObj.backgroundColor);
        console.log(stylesObj.color);
        if (styles.length != 0) {
          if (stylesObj.color != styles[0].color && stylesObj.backgroundColor != styles[0].backgroundColor) {
            backgroundColor = false
            color = false
            break;
          }
          else if (stylesObj.color != styles[0].color) {
            color = false

          }
          else if (stylesObj.backgroundColor != styles[0].backgroundColor) {
            backgroundColor = false
          }
        } else {
          styles.push(stylesObj);
        }
        currentNode = currentNode.nextSibling;

      }


      color ? setFontColor(styles[0].color) : setFontColor("")
      backgroundColor?setHighlight(styles[0].backgroundColor):setHighlight("")

    }




  }, [editor.selection])






  return (

    <div className={`${styles.toolbox} container-fluid`}>


      <div className={`${styles.tools} px-3 col-12`}>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><a onClick={() => { newClick(editor) }} title="New"><i className="fas fa-file"></i></a></div>
          <div><a onClick={() => setShowFileUpload((previous) => !previous)} title="Open"><i className="fa fa-folder-open"></i></a></div>
          <div><a onClick={() => { downloadClick(state) }} title="Download"><i className="fas fa-download"></i></a></div>

        </div>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><a href="#" title="Undo"><i className="fas fa-undo"></i></a></div>
          <div><a href="#" title="Redo"><i className="fas fa-redo"></i></a></div>
        </div>

        <div className={`${styles.toolContainer} pe-2`}>
          <div><a onClick={() => setFontColorPicker(!fontColorPicker)} title="font color"><i className="fas fa-font">
            <div className={styles.colorIndicate} style={{ background: fontColor }}></div>


          </i></a></div>
          <div><a onClick={() => setHighlightColorPicker(!highlightColorPicker)} title="highlight"><i className="fas fa-highlighter">
            <div className={styles.colorIndicate} style={{ background: highlight }}></div>
          </i></a></div>

        </div>

      </div>
      {fontColorPicker && <div className={styles.colorPicker}> <ChromePicker color={fontColor} onChange={(color) => fontColorChange(color)} /> </div>}
      {highlightColorPicker && <div className={styles.colorPicker}> <ChromePicker color={highlight} onChange={(color) => highlightChange(color)} /> </div>}
      {showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}
    </div>
  )
}

export default Toolbar