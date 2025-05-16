import React,{use, useContext} from "react";
import { Userdet } from "./context";

function Child(){
    const name=useContext(Userdet)
    return <h1>{name}</h1>
}

export default Child