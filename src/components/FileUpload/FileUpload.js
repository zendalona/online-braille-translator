import { fileSubmit, inputChange } from '@/handlers/handler'
import React, { useState } from 'react'
import { useSlate } from 'slate-react'
import styles from '../../styles/FileUpload.module.css'

function FileUpload({ setShowFileUpload }) {
  const [selectFile, setSelectFile] = useState(null)
  const editor = useSlate()
  return (
    <>
      <div className={styles.outerBox}>
        <div className={`${styles.innerBox} col-11 col-sm-6 `}>
          <div className={`${styles.innerBoxHeader} px-3`}><a onClick={() => setShowFileUpload(false)}> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{ fontSize: 31 }}>
            <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" />
          </svg></a></div>
          <div className={`${styles.fileSelect} mx-sm-5 mx-3 pe-4`}><input onChange={(event)=>{inputChange(event,setSelectFile)}} className='col-10 col-sm-8 ' type="file" name='file' /></div>
          <div className={`${styles.innerBoxFooter} py-2`}><button onClick={() => fileSubmit(editor,selectFile,setShowFileUpload)} className="btn btn-primary" type="button">Submit</button></div>
        </div>
      </div>

    </>
  )
}

export default FileUpload