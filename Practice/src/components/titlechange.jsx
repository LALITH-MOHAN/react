import React,{useState,useEffect} from 'react'

function Title(){

    const[count,setcount]=useState(0);

    useEffect(()=>{
        console.log("STATE CHANGES")
        document.title=`COUNT IS ${count}`;

    },[count]);

    return(
       <div>
             <p>CLICKED {count} times</p>
             <button onClick={()=>setcount(count+1)}>CLICK</button>
       </div>
    );
}

export default Title