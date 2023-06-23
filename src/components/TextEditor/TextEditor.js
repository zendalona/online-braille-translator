import { editorsContext, shortcutContext, socketContext } from '@/pages'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createEditor, Editor, Node, path, Path, Range, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import axios from 'axios'

import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react'
import styles from '../../styles/TextEditor.module.css'
import Toolbar from '../Toolbar/Toolbar'
import { searchWord } from '@/handlers/handler'
import Find from '../Find/Find'
import FileAndReplace from '../FileAndReplace/FileAndReplace'
import Loading from '../LoadingScreen/Loading'
import Worker from 'worker-loader!../../../src/workers/worker.js';
import { useUpdateEffect } from 'usehooks-ts'


function TextEditor({ brailleEditor }) {
    const textEditor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [fontColorPicker, setFontColorPicker] = useState(false)
    const [highlightColorPicker, setHighlightColorPicker] = useState(false)
    const [backgroundPicker, setBackgroundPicker] = useState(false)
    const [background, setBackground] = useState("#ffffff")
    const [language, setLanguage] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [showFind, setShowFind] = useState(false)
    const [showReplace, setShowReplace] = useState(false)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const worker = useRef()
    const [languagesList, setLanguagesList] = useState([])


    const { text, setText, setBraille, lineLimit, setLineLimit } = useContext(editorsContext)
    const socket = useContext(socketContext)
    const { textEditorFocus, setTextEditorFocus, translateRef } = useContext(shortcutContext)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])



    const handleChange = (value) => {
        setText(value)

    }

    const handleClick = () => {
        const { selection } = textEditor
        //console.log(selection);
        const check = Range.isCollapsed(selection);
        console.log(check);

        if (check) {
            var plainText = text.map(n => Node.string(n)).join('')
            console.log(plainText);
        }
        else {
            var plainText = Editor.string(textEditor, selection)
            console.log(plainText);
        }


        socket.emit('translate', { text: plainText, language: language }, () => {
            setLoading(true)
        })








        // axios.post('/api/translate', { text: text, language: language }).then(({data}) => {
        //     console.log(data);

        //     


        // })

        // console.log(text);
        // const plainText = text.map(n => Node.string(n)).join('\n')
        // console.log(plainText);

    };

    useEffect(() => {
        axios.get('/languages/language-table-dict.txt').then((response) => {
            const languages = response.data.split('\n')
            languages.every((line) => {
                const [language, table, symbol] = line.trim().split(' ')
                setLanguagesList((prev) => [...prev, { language, table, symbol }])
                return true
            })
            //console.log(languagesList.current);

        })


    }, [])

    useUpdateEffect(() => {
        if(!loading){
            setTimeout(() => {
                alert("Translation completed")
                
            }, 0);
        }

    }, [loading])



    useEffect(() => {
        worker.current = new Worker()

        worker.current.addEventListener('message', async function (e) {
            var datas = e.data
            const { selection } = brailleEditor
            // for (const data of datas) {
            //     const { selection } = brailleEditor
            //     Transforms.insertText(brailleEditor, data, {
            //         at: selection ? selection.anchor : Editor.end(brailleEditor, [])
            //     })
            //     await new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             resolve()

            //         }, 0.1);
            //     })
            // }
            Editor.withoutNormalizing(brailleEditor, () => {
                Transforms.insertText(brailleEditor, datas, {
                            at: selection ? selection.anchor : Editor.end(brailleEditor, [])
                        })
            })
            setLoading(false)

        });

        return () => {
            worker.current.terminate()
        }
    }, [])




    const brailleResult = (brailleText) => {
        console.log(lineLimit);

        worker.current.postMessage({ brailleText, lineLimit })






    }

    useEffect(() => {
        if (textEditorFocus) {
            //console.log('focus');

            ReactEditor.focus(textEditor)
        }
        //console.log("focus changed");

    }, [textEditorFocus])



    useEffect(() => {
        if (socket) {
            socket.on('result', brailleResult)

            return () => {
                socket.off('result', brailleResult)
            }
        }
    }, [socket, lineLimit])


    const selectLanguage = (value) => {
        if (value === "")
            setIsDisabled(true)
        else
            setIsDisabled(false)

        setLanguage(value)
        console.log(value);
    }

    const Leaf = ({ attributes, children, leaf }) => {

        return <span {...attributes} style={{ ...leaf }}>{children}</span>
    }











    return (
        <>
            <div className="col-12 col-sm-6 px-2">

                <div className={styles.textEditor}>


                    <Slate editor={textEditor} value={text} onChange={(value) => handleChange(value)}>
                        <Toolbar state={text} fontColorPicker={fontColorPicker} setFontColorPicker={setFontColorPicker}
                            highlightColorPicker={highlightColorPicker} setHighlightColorPicker={setHighlightColorPicker}
                            background={background} setBackground={setBackground} backgroundPicker={backgroundPicker}
                            setBackgroundPicker={setBackgroundPicker} setShowFind={setShowFind} setShowReplace={setShowReplace}
                            name="text editor" />
                        <Editable aria-label='text editor'
                            onClick={() => {
                                fontColorPicker ? setFontColorPicker(false) : null
                                highlightColorPicker ? setHighlightColorPicker(false) : null
                                backgroundPicker ? setBackgroundPicker(false) : null
                            }}
                            // renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some rich text…"
                            spellCheck

                            onFocusCapture={() => { setTextEditorFocus(true) }}
                            onBlur={() => { setTextEditorFocus(false) }}
                            className={`${styles.textField} mx-3 p-1`}
                            style={{ backgroundColor: background }} />
                    </Slate>
                    <div className={`${styles.editorFooter} px-3 py-2`} >
                        <div className='col-6'>
                        <label className="me-2">Language</label>
                            <select className='col-12' autoFocus={true} onChange={(event) => selectLanguage(event.target.value)}>
                            <option value="" defaultValue>Select a language</option>
                            {
                                languagesList.map((list, index) => {
                                    return <option value={list.table}>{list.language}</option>
                                })
                            }


                        </select></div><button ref={translateRef} className="btn btn-primary btn-sm" disabled={isDisabled} type="button" onClick={handleClick}>Translate</button>
                    </div>
                    {showFind && <Find editor={textEditor} search={search} setSearch={setSearch} setShowFind={setShowFind} />}
                    {showReplace && <FileAndReplace editor={textEditor} search={search} setSearch={setSearch} setShowReplace={setShowReplace} />}
                    {loading && <Loading />}
                </div>
            </div></>
    )
}

export default TextEditor