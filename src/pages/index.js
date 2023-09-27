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


import Editor from '@/components/Editor/Editor'
import Toolbar from '@/components/Toolbar/Toolbar'
import { redirect } from 'next/dist/server/api-utils'
import Head from 'next/head'
import { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'


export const editorsContext = createContext()
export const socketContext = createContext()
export const shortcutContext = createContext()

export default function Home() {
  const [text, setText] = useState([{ type: "paragraph", children: [{ text: "", color: "var(--fcolor)", fontSize: 16 }] }])
  const [braille, setBraille] = useState([{ type: "paragraph", children: [{ text: "", color: "var(--fcolor)", fontSize: 16 }] }])
  const [active, setActive] = useState('')
  const socket = useRef()
  const [textEditorFocus, setTextEditorFocus] = useState(false)
  const [brailleEditorFocus, setBrailleEditorFocus] = useState(false)
  const [lineLimit, setLineLimit] = useState(20)
  const translateRef = useRef()

  useEffect(() => {
    socket.current = io({ forceNew: true });

    return () => {
      socket.current.disconnect()
    }
  }, [])

  const handleKeyDown = (event) => {
    console.log(event);

    if (event.key === '1' && event.altKey) {
      event.preventDefault()
      setBrailleEditorFocus(false)
      setTextEditorFocus(true)
    }
    else if (event.key === '2' && event.altKey) {
      event.preventDefault()
      setTextEditorFocus(false)
      setBrailleEditorFocus(true)
      console.log(textEditorFocus);
    }
    else if (event.key === 't' && event.altKey) {
      event.preventDefault()
      if (!translateRef.disabled) {
        translateRef.current.click()
      }
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)


    return () => {
      document.removeEventListener('keydown', handleKeyDown)

    }
  }, [])




  return (
    <>

      <socketContext.Provider value={socket.current}>
        <editorsContext.Provider value={{ braille, setBraille, text, setText, lineLimit, setLineLimit }}>
          <shortcutContext.Provider value={{ textEditorFocus, setTextEditorFocus, brailleEditorFocus, setBrailleEditorFocus, translateRef }}>

            {/* <Toolbar/> */}
            <Editor />
          </shortcutContext.Provider>
        </editorsContext.Provider>
      </socketContext.Provider>
    </>
  )
}


export async function getServerSideProps({req,res}) {
  var session = req.isAuthenticated()
  
  
  if (!session) {
    return{
      redirect:{
        destination:'/login'
      }
    }
  }
  var user=req.user
  return {
    props: {
      session: user
    }
  }
}