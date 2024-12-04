import React, { useEffect, useState } from 'react'

const MyForm = () => {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    
    useEffect(()=>{
        return()=>{
            console.log("Tab has been closed")
        }
    },[])


  return (
    <div>
        <form action="">
            <label htmlFor="user" className='username'>username</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </form>
    </div>
  )
}

export default MyForm