import React,{useState} from 'react'

function ObjCounter() {
    const [details,setdetail]= useState({name:"",count:0}) //usestate with object

  return (
    <div>
        <input type='text' onChange={(e)=>setdetail((prev)=>({...prev,name:e.target.value}))} ></input> 
        <h1>NAME: {details.name}</h1>
        <h1>COUNTER: {details.count}</h1>
        <button onClick={()=>setdetail((prev)=>({...prev,count:prev.count+1}))}>click</button>
    </div>
  )
}

export default ObjCounter