import Navbar from '../../components/Navbar.jsx';
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import Markdown from 'react-markdown';

import axios from 'axios';

function Text() {

    const [prompt, setPrompt] = useState('');
    const [initial, setInitial] = useState('');
    const [listening, setListening] = useState(false);
    const [visible, setVisible] = useState(false);
    const recognitionRef = useRef(null);
    const[history, setHistory] = useState([]);
    const [data, setData] = useState([]);

    const startrecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setPrompt(prev => prev + ' ' + transcript);
        };

        recognition.onerror = (event) => {
            toast.error(`Error: ${event.error}`);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    }

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setListening(false);
        }
    }

    const generate = async () => {
        if (!prompt) {
            toast.error("Please enter a prompt");
            return;
        }

        const token = localStorage.getItem('token');

        if (initial === '') {
            setInitial(prompt.trim());
        }

        try {
            const res = await axios.post(`http://localhost:5000/gemini/text`, {
                prompt: prompt.trim(), token, initial
            });

            //console.log(res.data);
            setData(res.data.data.textHistory);
            setInitial(res.data.data.initial);
        } catch (err) {
            console.error(err.message);
            toast.error(err.response?.data?.message);
        }
        finally {
            setPrompt('');
        }
    }

    useEffect(()=> {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');

            try{
                const res = await axios.get(`http://localhost:5000/gemini/text?token=${token}`);

               // console.log(res.data.data);
                setHistory(res.data.data);
            }
            catch(err){
                console.log(err.message);
            }
        }

        fetchHistory();
    }, []);

    const truncateText = (text) => {
        return text.length < 30 ? text : text.substring(0, 30) + '. . .';
    }

    return (
        <>
            <div className='w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10 relative'>
                <Navbar />
                <Toaster richColors position='top-center' />

                <h1 className={`text-center w-full mt-5 mb-2 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Text Generation</h1>
                <span onClick={() => setVisible(!visible)} className='absolute top-24 md:top-40 cursor-pointer z-20 left-5'><BsLayoutSidebarReverse /></span>

                <div className={`${visible ? "translate-x-0" : "-translate-x-full"} shadow-2xl left-0 h-full w-[60%] md:w-[30%] lg:w-[20%] z-30 bg-gray-200 flex flex-col justify-start items-center gap-3 absolute top-0 duration-500 overflow-y-auto content ease-in-out`}>
                    <p onClick={() => setVisible(!visible)}><span className=' cursor-pointer z-30 font-semibold flex border-b-[1px] border-black justify-center items-center w-full px-7 py-2 pt-6 text-xl text-center gap-3'><BsLayoutSidebarReverse />History</span></p>
                    <div className='w-full h-full px-3 flex flex-col justify-start items-center gap-3 overflow-y-auto content'>
                        {history.length > 0 && history.map((hist, index)=> {
                            return <p onClick={() => {setData(hist.textHistory); setVisible(false);}} key={index} className='w-full px-4 py-3 text-[10px] lg:text-sm rounded-md bg-white text-black'>{truncateText(hist.initial)}</p>
                        })}
                    </div>
                </div>

                <div className='w-full lg:w-[70%]  h-[73vh] lg:h-[65vh] flex flex-col justify-start gap-3 items-center overflow-y-auto content relative'>
                    {data.length > 0 && data.map((text, index) => {
                        return <div key={index} className={`w-full flex ${text.role === 'user' ? "justify-end items-center" : "justify-start items-center"}`}>
                            <div className={`w-auto px-5 py-3 rounded-md lg:rounded-lg ${text.role === 'user' ? "bg-gray-200 text-black text-[12px] lg:text-sm xl:text-lg" : "bg-blue-500 text-white text-[12px] lg:text-sm xl:text-lg"}`}>
                                <Markdown>
                                    {text.message}
                                </Markdown>
                            </div>
                        </div>
                    })}
                </div>

                <div className='w-full lg:w-[70%] py-2 h-auto flex justify-center items-center gap-3 relative'>
                    <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} className='w-full outline-none lg:rounded-lg h-24 py-2 px-3 pr-10 bg-gray-200 rounded-md' placeholder='Enter your message' />
                    <span onClick={generate} className='p-2 active:scale-95 duration-150 ease-in-out rounded-full text-white bg-gradient-to-r from-blue-300 via-blue-400 to-purple-600 cursor-pointer absolute bottom-5 right-4'><IoSparklesSharp /></span>
                    <span onClick={startrecording} className={`bg-black p-2 active:scale-95 duration-150 ease-in-out rounded-full text-white cursor-pointer absolute bottom-5 right-14 ${listening ? "hidden" : "block"}`}><MdKeyboardVoice /></span>
                    <span onClick={stopRecording} className={`bg-red-500 p-2 active:scale-95 duration-150 ease-in-out rounded-full text-white cursor-pointer absolute bottom-5 right-14 ${listening ? "block" : "hidden"}`}><FaRegStopCircle /></span>
                </div>

            </div>
        </>
    )
}

export default Text
