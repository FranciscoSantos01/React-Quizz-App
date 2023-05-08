import ReactLogo from './assets/react.svg'
import { Game, Player, Star } from './components'
import { useQuestionStore } from './store/question'

export const App = () => {
  const questions = useQuestionStore(state=> state.questions)
  const player = useQuestionStore(state=>state.player)
  const players = useQuestionStore(state=> state.players)
  console.log(questions)
  console.log(player)
  console.log(players)
  return (
    <div style={{display:"flex", flexDirection:'column',justifyContent:'center', alignItems:'center', width:'100%', height:'100vh', padding:15}}>
     <div style={{display:'flex', justifyContent:'center', alignItems:'center',gap:10}}>
     <img src={ReactLogo} alt="logo" width={48} height={48} />
       <h1 style={{fontSize:'2.5rem'}}>React Quizz</h1> 
     </div>
     {questions.length === 0 && <Star /> }
     {questions.length > 0 && player.length === 0 && <Player /> }
     {questions.length > 0 && player.length > 0 && <Game /> }
     
    </div>
  )
}
