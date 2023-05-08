import { useQuestionStore } from "../store/question"




export const useQuestionData = ()=>{
    const questions = useQuestionStore(state=> state.questions)
    
    let correct = 0;
    let wrong= 0;
    let unAnswered = 0;

    questions.forEach(question=>{
        if(question.isCorrectUserAnswer === undefined){
            return unAnswered++;
        }
        if(question.isCorrectUserAnswer !== true){
            return wrong++
        } else{
            return correct++
        }
    })


     return{correct,wrong,unAnswered}
}