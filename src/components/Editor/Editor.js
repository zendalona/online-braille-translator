import React, { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import styles from '../../styles/Editor.module.css'
import BrailleEditor from '../BrailleEditor/BrailleEditor'
import TextEditor from '../TextEditor/TextEditor'
function Editor() {
    const [component, setComponent] = useState(null)
    const brailleEditor = useMemo(() => withHistory(withReact(createEditor())), [])
    useEffect(() => {

        setComponent([<TextEditor brailleEditor={brailleEditor} />, <BrailleEditor brailleEditor={brailleEditor} />])

    }, [])

    return (<>
        <section className="container-fluid py-4">
            <div className={styles.editorBox}>

                {component}

            </div>
        </section></>
    )
}

export default Editor