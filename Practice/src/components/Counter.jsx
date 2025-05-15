import React,{useState} from "react";

function Counter(){
    const[count,setcount]=useState(0);

    return(
        <div>
            <h1>COUNTING:{count}</h1>
            <button onClick={()=>setcount(count+1)}>CLICK</button>
        </div>
    );
}

export default Counter