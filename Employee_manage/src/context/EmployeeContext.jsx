import { createContext,useState } from "react";

export const EmployeeContext= createContext(); //create the context which provide values to entire app

export function EmployeeProvider({children}){
    const[employees,setemployees]=useState([]); //Add the employees here

    function addEmployee(employee){
        setemployees((prev)=>[...prev,employee]); //Add new employees
    }

    function updateEmployee(updatedemployee){
        setemployees((prev)=>prev.map((emp)=>(emp.id==updatedemployee.id?updatedemployee:emp)))
    }

    //delete employee
    function removeEmployee(id){
        setemployees((prev)=>prev.filter((emp)=>id!=emp.id))
    }

    return(
        <EmployeeContext.Provider value={{employees,addEmployee,updateEmployee,removeEmployee}}>
            {children}
        </EmployeeContext.Provider>
    )
}