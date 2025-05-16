import React,{useEffect,useState,useRef} from "react";

function Rendercount(){
    const[name,setname]=useState("");
    const render_c=useRef(0); //to count the renders
    
    useEffect(()=>{
        render_c.current=render_c.current+1
    }) // side effects occur for every render

    return(
        <div>
            <input type="text" onChange={(e)=>setname(e.target.value)}></input>
            <h1>NAME:{name}</h1>
            <h2>RENDER COUNT: {render_c.current}</h2>
        </div>
    );
}

export default Rendercount