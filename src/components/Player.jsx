import { useState } from "react"
import { useQuestionStore } from "../store/question"


export const Player = () => {
    const[user,setUser]= useState("")
    const setPlayer = useQuestionStore(state=> state.setPlayer)
   
    const handleChange = (event)=>{
        setUser(event.target.value)
    }
    const handlePlayer = ()=>{
        setPlayer(user)
    }
    console.log(user)
  return (
    <div className="playerContainer">
        <input onChange={(e)=> handleChange(e)}  type="text" placeholder='Insert your name' className="field-name" />
        <button onClick={handlePlayer} className="btn-start"> Lets go</button>
    </div>
  )
}
