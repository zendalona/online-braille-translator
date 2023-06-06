import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/Toolbar.module.css'

import { ChromePicker } from 'react-color';
import { Editor, Range } from 'slate';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { downloadClick, newClick } from '@/handlers/handler';
import FileUpload from '../FileUpload/FileUpload';

function Toolbar({ state, fontColorPicker, setFontColorPicker, highlightColorPicker, setHighlightColorPicker,background,setBackground,backgroundPicker,setBackgroundPicker }) {
  const [fontColor, setFontColor] = useState("#000000")
  const [highlight, setHighlight] = useState("")
  const [fontSize, setFontSize] = useState(16)
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

  const backgroundChange = (color) => {
    setBackground(color.hex)
    
  }

  const fontSizeChange = (action, size) => {
    if (action === "increase") {
      if (fontSize < 50) {
        setFontSize((previous) => previous + 1)
        Editor.addMark(editor, 'fontSize', fontSize + 1);
      }
    } else if (action === "decrease") {
      if (fontSize > 10) {
        setFontSize((previous) => previous - 1)
        Editor.addMark(editor, 'fontSize', fontSize - 1);
      }
    } else {
      size = Number(size)



      setFontSize(size)

      Editor.addMark(editor, 'fontSize', size);


    }

  }



  useEffect(() => {
    let color = true;
    let backgroundColor = true;
    let fontSize = true;

    const selection = editor.selection
    const leaf = []
    if (selection) {
      const range = Editor.range(editor, selection);
      for (const [node, path] of Editor.nodes(editor, { at: range })) {
        if (!color && !backgroundColor && !fontSize) {
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
              node.fontSize != leaf[0].fontSize ? fontSize = false : fontSize = true;
            }
          }
        }
      }
      color ? leaf[0].color ? setFontColor(leaf[0].color) : setFontColor("#000000") : setFontColor("");
      backgroundColor ? leaf[0].backgroundColor ? setHighlight(leaf[0].backgroundColor) : setHighlight("") : setHighlight("");
      fontSize ? leaf[0].fontSize ? setFontSize(leaf[0].fontSize) : setFontSize(16) : setFontSize(null);


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

          <div><a onClick={() => setBackgroundPicker(!backgroundPicker)} title="background color"><svg class="bi bi-palette-fill tool-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
          </svg></a></div>

        </div>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><a onClick={() => fontSizeChange('decrease', null)} title="Decrease font size"><i className="fas fa-minus"></i></a></div>
          <div><input className={styles.fontSize} value={fontSize} onChange={(e) => fontSizeChange('custom', e.target.value)} /></div>
          <div><a onClick={() => fontSizeChange('increase', null)} title="Increase font size"><i className="fas fa-plus"></i></a></div>
        </div>

      </div>
      {fontColorPicker && <div className={styles.colorPicker}> <ChromePicker color={fontColor} onChange={(color) => fontColorChange(color)} /> </div>}
      {highlightColorPicker && <div className={styles.colorPicker}> <ChromePicker color={highlight} onChange={(color) => highlightChange(color)} /> </div>}
      {backgroundPicker && <div className={styles.colorPicker}> <ChromePicker color={background} onChange={(color) => backgroundChange(color)} /> </div>}
      {showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}
    </div>
  )
}

export default Toolbar