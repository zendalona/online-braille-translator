
import Editor from '@/components/Editor/Editor'
import Toolbar from '@/components/Toolbar/Toolbar'
import Head from 'next/head'
import { createContext, useState } from 'react'


export const editorsContext = createContext()

export default function Home() {
  const [text, setText] = useState([{ type: "paragraph", children: [{ text: "" }] }])
  const [braille, setBraille] = useState([{ type: "paragraph", children: [{ text: "" }] }])
  const [active, setActive] = useState('')


  return (
    <>
      <Head>
        <title>Braille Translator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <editorsContext.Provider value={{ braille, setBraille, text, setText, active }}>
        {/* <Toolbar/> */}
        <Editor />
      </editorsContext.Provider>
    </>
  )
}
