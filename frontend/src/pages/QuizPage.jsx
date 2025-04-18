import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast, Toaster } from 'sonner';
import { FaStar } from "react-icons/fa";

function QuizPage() {

    const location = useLocation();
    const data = location.state;

    const [questions, setQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [started, setStarted] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [ended, setEnded] = useState(false);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const next = () => {

        if (selectedAnswer === '') {
            toast.error("Please select an option");
            return;
        }

        if (selectedAnswer === questions[current].ans) {
            setScore(prev => prev + 5);
        }

        if (current + 1 === questions.length - 1) {
            setIsLast(true);
        }

        if (current === questions.length-1) {
            setStarted(false);
            setEnded(true);
            return;
        }

        if (current === questions.length - 2) {
            setIsLast(true);
        }

        setCurrent(prev => prev + 1);
        setSelectedAnswer('');
    }

    const leave = () => {
        setDifficulty('');
        setQuestions([]);
        setStarted(false);
        setScore(0);
        setCurrent(0);
        setIsLast(false);
        setSelectedAnswer('');
        setEnded(false);
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10">
                <Navbar />
                <Toaster position="top-center" richColors />

                <h1 className={`text-center w-full mt-3 lg:mt-5 text-3xl font-bold duration-200 ease-in-out capitalize font-Titillium`}>{data?.title}</h1>
                <p className="capitalize text-[12px] md:text-sm lg:text-lg">Category - {data?.category}</p>

                <div className={` ${started ? "hidden" : "block"} w-auto mt-3 px-5 py-2 flex justify-center rounded-full items-center gap-2 border-2 border-blue-500`}>
                    <p onClick={() => { setDifficulty('easy'); setQuestions(data.data[0]); }} className={`${difficulty === 'easy' ? "bg-blue-500 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Easy</p>
                    <p onClick={() => { setDifficulty('medium'); setQuestions(data.data[1]); }} className={`${difficulty === 'medium' ? "bg-blue-500 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Medium</p>
                    <p onClick={() => { setDifficulty('hard'); setQuestions(data.data[2]); }} className={`${difficulty === 'hard' ? "bg-blue-500 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Hard</p>
                </div>

                <div className={`${difficulty === '' ? "hidden" : "block"} ${started ? "hidden" : "block"} py-5 w-full md:w-[60%] mt-5 lg:w-auto px-5 lg:px-10 flex flex-col justify-center items-start gap-2 bg-gray-200 rounded-md`}>
                    <p className="text-sm sm:text-lg">Total Questions : {questions?.length}</p>
                    <p className="text-sm sm:text-lg">Marks Per Question : 5</p>
                    <p className="text-sm sm:text-lg">Total Marks : {questions?.length * 5}</p>
                    <p className={` w-full mt-5 px-5 lg:px-10 py-2 rounded-full bg-blue-500 text-white flex justify-center items-center cursor-pointer hover:opacity-80 text-[12px] md:text-sm lg:text-lg duration-200 ease-in-out`} onClick={() => {setStarted(true); setSelectedAnswer('')}}>Start Quiz</p>
                    <p className="text-sm sm:text-lg font-bold mt-2">NOTE:</p>
                    <p className="text-[12px] lg:text-sm">After you start the quiz you wont be able to skip any of the question.</p>
                    <p className="text-[12px] lg:text-sm">Refreshing the page means you have to again re appear for the quiz.</p>
                </div>

                <div className={`${started ? "block" : "hidden"} w-full bg-gray-200 mt-5 rounded-md lg:rounded-lg md:w-[60%] lg:w-[40%] flex py-4 px-3 flex-col justify-start items-start gap-3`}>
                    {questions.length > 0 && questions[current] && <div className="w-full flex flex-col justify-start items-start gap-3">
                        <h1 className="font-bold text-lg">{current + 1}. {questions[current].question}</h1>
                        <p className={`cursor-pointer ${selectedAnswer === questions[current].option1 ? "bg-blue-400 text-white" : "bg-white text-black"} duration-100 ease-in-out rounded-md border-[1px] border-black w-full px-3 py-2`} onClick={() => setSelectedAnswer(questions[current].option1)}>{questions[current].option1}</p>
                        <p className={`cursor-pointer ${selectedAnswer === questions[current].option2 ? "bg-blue-400 text-white" : "bg-white text-black"} duration-100 ease-in-out rounded-md border-[1px] border-black w-full px-3 py-2`} onClick={() => setSelectedAnswer(questions[current].option2)}>{questions[current].option2}</p>
                        <p className={`cursor-pointer ${selectedAnswer === questions[current].option3 ? "bg-blue-400 text-white" : "bg-white text-black"} duration-100 ease-in-out rounded-md border-[1px] border-black w-full px-3 py-2`} onClick={() => setSelectedAnswer(questions[current].option3)}>{questions[current].option3}</p>
                        <p className={`cursor-pointer ${selectedAnswer === questions[current].option4 ? "bg-blue-400 text-white" : "bg-white text-black"} duration-100 ease-in-out rounded-md border-[1px] border-black w-full px-3 py-2`} onClick={() => setSelectedAnswer(questions[current].option4)}>{questions[current].option4}</p>
                        <p className={`w-full text-center py-2 rounded-md lg:rounded-lg bg-black text-white hover:opacity-80 ease-in-out duration-150 ${selectedAnswer === '' ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={next}>{isLast ? "Finish" : "Next"}</p>
                        <p className="w-full text-center py-2 rounded-md lg:rounded-lg text-red-500 font-bold ease-in-out duration-150 cursor-pointer" onClick={leave}>Leave Quiz</p>
                    </div>}
                </div>

                <div className={`w-full ${ended ? "block" : "hidden"} md:w-[60%] flex flex-col bg-gray-200 mt-4 justify-center items-center gap-3 px-5 py-5 rounded-md lg:rounded-lg lg:w-[40%]`}>
                    <p className={`text-2xl text-yellow-500 lg:text-4xl flex justify-center items-center gap-2 ${score >= 10 && score<=20 ? "block" : "hidden"}`}><FaStar /></p>
                    <p className={`text-2xl text-yellow-500 lg:text-4xl flex justify-center items-center gap-2 ${score >= 21 && score<=40 ? "block" : "hidden"}`}><FaStar /><FaStar /></p>
                    <p className={`text-2xl text-yellow-500 lg:text-4xl flex justify-center items-center gap-2 ${score >= 41 && score<=60 ? "block" : "hidden"}`}><FaStar /><FaStar /><FaStar /></p>
                    <p className={`text-2xl text-yellow-500 lg:text-4xl flex justify-center items-center gap-2 ${score >= 61 && score<=80 ? "block" : "hidden"}`}><FaStar /><FaStar /><FaStar /><FaStar /></p>
                    <p className={`text-2xl text-yellow-500 lg:text-4xl flex justify-center items-center gap-2 ${score >= 81 && score<=100 ? "block" : "hidden"}`}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>

                    <h1 className="text-xl lg:text-2xl ">No. of questions attended : {questions.length}</h1>
                    <h1 className="text-xl lg:text-2xl ">Your score : {score}</h1>
                </div>


            </div>
        </>
    )
}

export default QuizPage
