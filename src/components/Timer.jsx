import { useEffect, useState } from "react"


export const Timer = () => {
    const[timer, setTimer]= useState(20)

    useEffect(()=>{
        const countDown = setInterval(() => {
            if(timer <= 0){
                clearInterval(countDown)
            } else{
                setTimer(timer - 1);
            }
        }, 1000);
    },[timer])
  return (
    <div style={{marginTop:10}}>
        {
            timer <= 0 
            ? <p>Times up</p>
            : (
            <h3>{timer} seconds left </h3>
            )
        }
    </div>
  )
}
