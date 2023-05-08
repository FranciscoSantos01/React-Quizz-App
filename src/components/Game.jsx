/* eslint-disable react/prop-types */
import { useQuestionData } from "../hooks/useQuestionData"
import { useQuestionStore } from "../store/question"
import { Footer } from "./Footer"
// import { Timer } from "./Timer"



const getBackgroundColor = (info, index)=>{
    const{userSelectedAnswer,answer} = info
    if(userSelectedAnswer == null) return 'transparent'
    if(index !== answer && index !== userSelectedAnswer) return 'transparent'
    if(index === answer) return 'green'
    if(index === userSelectedAnswer) return 'red';

    return 'transparent'
}



// eslint-disable-next-line react/prop-types
const Questions = ({info})=>{
    const selectedAnswer = useQuestionStore(state=>state.selectedAnswer)
    const handleClick = (answerIndex)=>()=>{
        selectedAnswer(info?.id,answerIndex)
    }
return(
    <div className="game-card">
        <h3 className="question">{info?.question}</h3>
        <ul className={info.userSelectedAnswer !== undefined ? 'disabled' : "options"}>
            {
                info?.options.map((item,index)=>(
                    <li 
                    style={{background:getBackgroundColor(info,index)}} 
                    onClick={handleClick(index)} 
                    key={index}>
                      {item}
                    </li>
                ))
            }
        </ul>
    </div>
)
}

export const Game = () => {
    const questions = useQuestionStore(state=>state.questions)
    const currentQuestion = useQuestionStore(state=> state.currentQuestions)
    const prevQuestion = useQuestionStore(state=>state.goBackQuestion)
    const nextQuestion = useQuestionStore(state=>state.goNextQuestion)
    const savePlayer = useQuestionStore(state => state.savePlayer)
    const reset = useQuestionStore(state => state.reset)
    const{unAnswered,correct}= useQuestionData()
    const questionInfo = questions[currentQuestion];
    
   const handleReset = ()=>{
       let points = correct * 5;
       savePlayer(points);
       reset();
   }

    if(unAnswered === 0){
        return(
            <>
            <h3 className="gameOver">Game over!!</h3>
            <strong style={{fontSize:20}}>Your Score:</strong>
            <span className="score" >{correct * 5}</span>
            <button onClick={handleReset} className="btn-start">Reset Game</button>
            </>
        )
    }
  return (
    <>
    <div className="arrows">
    <i onClick={prevQuestion} style={{fontSize:25, color:'white'}} className={currentQuestion === 0 ?"fa-solid fa-arrow-left arrowDisabled" :"fa-solid fa-arrow-left"}></i>
     {currentQuestion + 1} / {questions.length}
    <i onClick={nextQuestion} style={{fontSize:25, color:'white'}} className={currentQuestion >= questions.length - 1 ?"fa-solid fa-arrow-right arrowDisabled" :"fa-solid fa-arrow-right"}></i>
    </div>
    <Questions info={questionInfo} />
    <Footer />
    {/* <Timer /> */}
    </>
  )
}
