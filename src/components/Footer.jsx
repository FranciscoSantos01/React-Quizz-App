import { useQuestionData } from "../hooks/useQuestionData"


export const Footer = () => {
    const{correct,wrong,unAnswered}= useQuestionData()
  return (
    <footer>
        <strong> {`✅correctas:${correct} - incorrectas: ❌-${wrong} - ❓ sin responder:${unAnswered} `} </strong>
    </footer>
  )
}
