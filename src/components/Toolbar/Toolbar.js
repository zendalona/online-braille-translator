import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/Toolbar.module.css'

import { ChromePicker } from 'react-color';
import { Editor, Range } from 'slate';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { downloadClick, newClick } from '@/handlers/handler';
import FileUpload from '../FileUpload/FileUpload';

function Toolbar({ state, fontColorPicker, setFontColorPicker, highlightColorPicker, setHighlightColorPicker }) {
  const [fontColor, setFontColor] = useState("#000000")
  const [highlight, setHighlight] = useState("")
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

    const selection = editor.selection
    const leaf = []
    if (selection) {
      const range = Editor.range(editor, selection);
      for (const [node, path] of Editor.nodes(editor, { at: range })) {
        if (!color && !backgroundColor) {
          break;
        } else {
          const isPathIncluded = Range.includes(range, path);
          if (isPathIncluded && node.hasOwnProperty('text')) {
            if (leaf.length === 0) {
              leaf.push(node);

            }
            else {
              node.color != leaf[0].color ? color = false : color = true;
              node.backgroundColor != leaf[0].backgroundColor ? backgroundColor = false : backgroundColor = true;

            }
          }
        }
      }
      color ? leaf[0].color ? setFontColor(leaf[0].color) : setFontColor("#000000") : setFontColor("");
      backgroundColor ? leaf[0].backgroundColor ? setHighlight(leaf[0].backgroundColor) : setHighlight("") : setHighlight("");



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
        <div className={`${styles.toolContainer} pe-2`}>
          <div><a href="#" title="Decrease font size"><i className="fas fa-minus"></i></a></div>
          <div><a href="#" title="Font size"><div className={styles.fontSize}><span>10</span></div></a></div>
          <div><a href="#" title="Increase font size"><i className="fas fa-plus"></i></a></div>
        </div>

      </div>
      {fontColorPicker && <div className={styles.colorPicker}> <ChromePicker color={fontColor} onChange={(color) => fontColorChange(color)} /> </div>}
      {highlightColorPicker && <div className={styles.colorPicker}> <ChromePicker color={highlight} onChange={(color) => highlightChange(color)} /> </div>}
      {showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}
    </div>
  )
}

export default Toolbar