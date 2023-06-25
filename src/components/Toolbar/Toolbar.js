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


import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/Toolbar.module.css'

import { ChromePicker } from 'react-color';
import { Editor, Range } from 'slate';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { backgroundChange, downloadClick, fontColorChange, fontSizeChange, highlightChange, newClick, redoClick, undoClick } from '@/handlers/handler';
import FileUpload from '../FileUpload/FileUpload';

function Toolbar({ state, fontColorPicker, setFontColorPicker, highlightColorPicker, setHighlightColorPicker,
  background, setBackground, backgroundPicker, setBackgroundPicker, setShowFind, setShowReplace, name }) {
  const [fontColor, setFontColor] = useState("#000000")
  const [highlight, setHighlight] = useState("")
  const [fontSize, setFontSize] = useState(16)
  const [showFileUpload, setShowFileUpload] = useState(false)


  const editor = useSlate();

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
          <div><button onClick={() => { newClick(editor) }} aria-label={`${name} new`} title="New"><i className="fas fa-file"></i></button></div>
          <div><button onClick={() => setShowFileUpload((previous) => !previous)} aria-label={`${name} open`} title="Open"><i className="fa fa-folder-open"></i></button></div>
          <div><button onClick={() => { downloadClick(state) }} aria-label={`${name} download`} title="Download"><i className="fas fa-download"></i></button></div>

        </div>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><button onClick={() => undoClick(editor)} aria-label={`${name} undo`} title="Undo"><i className="fas fa-undo"></i></button></div>
          <div><button onClick={() => redoClick(editor)} aria-label={`${name} redo`} title="Redo"><i className="fas fa-redo"></i></button></div>
        </div>

        <div className={`${styles.toolContainer} pe-2`}>
          <div><button onClick={() => setFontColorPicker(!fontColorPicker)} aria-label={`${name} font color`} title="font color"><i className="fas fa-font">
            <div className={styles.colorIndicate} style={{ background: fontColor }}></div>


          </i></button></div>
          <div><button onClick={() => setHighlightColorPicker(!highlightColorPicker)} aria-label={`${name} highlight`} title="highlight"><i className="fas fa-highlighter">
            <div className={styles.colorIndicate} style={{ background: highlight }}></div>
          </i></button></div>

          <div><button onClick={() => setBackgroundPicker(!backgroundPicker)} aria-label={`${name} background color`} title="background color"><svg class="bi bi-palette-fill tool-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
          </svg></button></div>

        </div>
        <div className={`${styles.toolContainer} pe-2`}>
          <div><button onClick={() => fontSizeChange('decrease', null, fontSize, setFontSize, editor)} aria-label={`${name} decrease font size`} title="Decrease font size"><i className="fas fa-minus"></i></button></div>
          <div><input aria-label={`${name} font size`} className={styles.fontSize} value={fontSize} onChange={(e) => fontSizeChange('custom', e.target.value, fontSize, setFontSize, editor)} /></div>
          <div><button onClick={() => fontSizeChange('increase', null, fontSize, setFontSize, editor)} aria-label={`${name} increase font size`} title="Increase font size"><i className="fas fa-plus"></i></button></div>
        </div>

        <div className={`${styles.toolContainer} pe-2`}>
          <div><button onClick={() => setShowFind((prev) => !prev)} aria-label={`${name} find`} title="Find"><i className="fas fa-search"></i></button></div>
          <div><button onClick={() => setShowReplace((prev) => !prev)} aria-label={`${name} find and replace`} title="Find And Replace"><i className="fas fa-search"></i></button></div>

        </div>

      </div>
      {fontColorPicker && <div className={styles.colorPicker}> <ChromePicker color={fontColor} onChange={(color) => fontColorChange(color, setFontColor, editor)} /> </div>}
      {highlightColorPicker && <div className={styles.colorPicker}> <ChromePicker color={highlight} onChange={(color) => highlightChange(color, setHighlight, editor)} /> </div>}
      {backgroundPicker && <div className={styles.colorPicker}> <ChromePicker color={background} onChange={(color) => backgroundChange(color, setBackground)} /> </div>}
      {showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}

    </div>
  )
}

export default Toolbar