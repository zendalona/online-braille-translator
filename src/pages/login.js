import Login from '@/components/Authentication/Login'
import React from 'react'

function login() {
  return (
    <Login/>
  )
}

export default login

export async function getServerSideProps({req,res}) {
    var session = req.isAuthenticated()
    
    
    if (session) {
      return{
        redirect:{
          destination:'/'
        }
      }
    }
   return{
    props:{
        
    }
   }
  }