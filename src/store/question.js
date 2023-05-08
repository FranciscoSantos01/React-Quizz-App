import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import confetti from 'canvas-confetti'

const API_URL = import.meta.env.PROD ? 'https://react-quizz-app-plum.vercel.app' : 'http://localhost:5173'
export const useQuestionStore = create(persist((set,get)=>({
    player: "",
    players: [],
    questions:[],
    currentQuestions: 0,

    fetchQuestions: async(limit)=>{
        const res = await fetch(`${API_URL}/data.json`);
        const json = await res.json()
        const questions = json.sort(()=> Math.random() - 0.5).slice(0,limit);
        set({questions})
    },
    setPlayer: (name)=>{
        set({player:name})
    },
    selectedAnswer: (questionId, answerIndex)=>{
        const{questions}= get()
        const newQuestions = structuredClone(questions);
        const questionIndex = newQuestions.findIndex(q=> q.id === questionId);
        const questionInfo = newQuestions[questionIndex];
        const isCorrectUserAnswer = questionInfo.answer === answerIndex
         
        if(isCorrectUserAnswer) confetti();
        
        newQuestions[questionIndex]={
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer : answerIndex
        }

        set({questions:newQuestions})
    },
    goNextQuestion : ()=>{
        const{currentQuestions,questions} = get()
        const nextQuestion = currentQuestions + 1;

        if(nextQuestion < questions.length){
            set({currentQuestions:nextQuestion})
        }
    },
    goBackQuestion: ()=>{
        const{currentQuestions} = get()
        const prevQuestions = currentQuestions - 1;

        if(prevQuestions>=0){
            set({currentQuestions:prevQuestions})
        }
    },
    reset:()=>{
        set({currentQuestions:0, questions:[], player:""})
    },
    savePlayer:(score)=>{
        const{player,players}= get();
        const newPlayer = structuredClone(players)
        newPlayer.push({name:player,points:score})
        set({players:newPlayer})
    }
}
),{name:'questions'}))