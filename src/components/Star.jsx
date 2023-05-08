import { useQuestionStore } from "../store/question"

const LIMIT_QUESTIONS = 10;

export const Star = () => {
    const fetchingQuestions = useQuestionStore(state=> state.fetchQuestions)

    const handleClick  = ()=>{
        fetchingQuestions(LIMIT_QUESTIONS)
    }
  return (
    <div style={{marginTop:'20px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:15}}>
      <span style={{fontSize:20, color:'white', fontWeight:'bold'}}>Develop with React + zustand</span> 
        <button onClick={handleClick} className="btn-start">Start Game!</button>
    </div>
  )
}
