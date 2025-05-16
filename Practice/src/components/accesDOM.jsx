import React,{useRef} from "react";

function Access(){
    const inpele=useRef();

    function handleclick()
    {
        inpele.current.style.width="300px"
        inpele.current.focus();
    }

    return(
    <div>
        <input type="text" ref={inpele}/>
        <button onClick={handleclick}>CLICK</button>
    </div>
    );
}

export default Access;