import React,{useState} from "react"; //import usestate

function Counter(){
    const[count,setcount]=useState(0); //usestate crates with varible name as count and function as setcount

    return(
        <div>
            <h1>COUNTING:{count}</h1>  
            <button onClick={()=>setcount(count+1)}>CLICK</button> 
        </div>
    );
}

export default Counter