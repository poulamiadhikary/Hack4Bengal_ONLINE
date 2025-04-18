import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { queue } from '../../data/queue.js';
import Navbar from '../../components/Navbar.jsx';

function Queue() {

    const languages = [
        'C++',
        'Java',
        'Python'
    ];

    const [array, setArray] = useState([]);
    const [lang, setLang] = useState(queue[0].lang);
    const [code, setCode] = useState(queue[0].code);
    const [element, setElement] = useState(null);
    const [messages, setMessages] = useState([]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard");
    }

    const enqueue = () => {
        if (!element) {
            toast.error("Please enter element");
            return;
        }

        setArray([...array, element]);
        setMessages([...messages, `${element} pushed in queue`]);
        toast.success(`${element} pushed in queue`);
    }

    const dequeue = () => {
        if (array.length === 0) {
            toast.error("QUEUE IS EMPTY");
            return;
        }

        setArray(array.slice(1));
        setMessages([...messages, `Element dequeued`]);
        toast.success(`Element dequeued`);
    }

    return (
        <>

            <div className='w-full min-h-screen px-5 flex flex-col justify-start items-center pb-10'>

                <Navbar />
                
                <h1 className={`text-center w-full  text-3xl font-bold duration-200 ease-in-out py-5 font-Titillium`}>Queue Data Structure</h1>

                <hr className='w-full h-[1px] bg-zinc-600' />

                <div className={`w-full md:w-[80%] rounded-md h-auto  duration-200 ease-in-out px-10 py-5 flex flex-col justify-start items-center gap-3`}>
                    <p className={` md:text-start duration-200 ease-in-out text-[10px] lg:text-sm w-full text-center`}>A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, meaning that the first element added to the queue is the first one to be removed. <br /><br />

                        Characteristics: <br />

                        1.  Order: Elements are added and removed in a specific order, with the oldest element being removed first. <br />
                        2.  Insertion: New elements are added to the end of the queue.  <br />
                        3.  Deletion: Elements are removed from the front of the queue.  <br />
                        4. Access: Only the front and rear elements are accessible.  <br /><br />

                        Key Operations:  <br />

                        1. Enqueue: Adding a new element to the end of the queue.  <br />
                        2. Dequeue: Removing an element from the front of the queue. <br />
                        3. Peek: Viewing the element at the front of the queue without  <br />
                        4. IsEmpty: Checking if the queue is empty. <br />
                    </p>

                    <hr className='w-full h-[1px] bg-zinc-600 opacity-55 lg:opacity-80' />

                    <div className={`w-full py-2 lg:py-5 rounded-md px-4  duration-200 ease-in-out h-auto flex flex-col justify-center items-center gap-5`}>
                        <div className='w-full h-auto py-2 flex flex-col justify-around items-center lg:h-full lg:w-1/2'>
                            <div className='w-full py-3 h-full flex flex-col justify-center items-center gap-2'>
                                <input type="number" className={` bg-gray-200 w-full sm:w-[60%] md:w-[40%] lg:w-[60%] duration-200 ease-in-out px-3 py-1 outline-none rounded-md`} value={element} placeholder='Enter element' onChange={(e) => setElement(e.target.value)} />
                                <div className='w-full flex justify-center items-center gap-2'>
                                    <button className={`bg-cyan-500 text-white rounded-md py-1 px-4 cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={enqueue}>Enqueue</button>
                                    <button className={`bg-red-500 text-white rounded-md py-1 px-4 cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={dequeue}>Dequeue</button>
                                </div>

                                <hr className='w-full h-[1px] bg-zinc-600 my-2' />
                            </div>

                            <div className={`w-full bg-gray-200 rounded-md py-3 ${messages.length === 0 ? "hidden" : "block"} flex flex-col justify-center items-center gap-2 overflow-y-auto content`}>
                                <p className='text-xl font-semibold mb-2'>Operations History</p>
                                {messages.length > 0 && messages.map((msg, index) => {
                                    return <p key={index} className={` duration-200 ease-in-out text-sm`}>{msg}</p>
                                })}
                            </div>
                        </div>

                        <div className='w-full h-auto py-2 flex justify-start overflow-x-auto content items-center lg:h-full lg:w-1/2 gap-2'>
                            {array.length > 0 && array.map((elem, index) => {
                                return <span key={index} className={`py-2 px-3 rounded-md hover:-translate-y-3 duration-200 ease-in-out cursor-pointer`}>{elem}</span>
                            })}
                        </div>
                    </div>

                    <div className={`w-full h-auto flex flex-wrap justify-start py-2 px-3 items-center gap-3`}>
                        {languages.map((lang, index) => {
                            return <span key={index} className={`border-2  px-3 py-1 rounded-md cursor-pointer`} onClick={() => { setLang(lang); setCode(queue[index].code) }}>{lang}</span>
                        })}
                    </div>

                    <div className={`w-full bg-gray-200 rounded-md py-3 px-4 lg:rounded-lg duration-200 ease-in-out`}>
                        <pre className={` duration-200 ease-in-out font-mono overflow-x-auto`}>{code}</pre>
                    </div>

                    <p className={`bg-blue-400 rounded-md  duration-200 ease-in-out px-5 py-2 mt-4 cursor-pointer text-white hover:opacity-75`} onClick={copyToClipboard}>Copy to Clipboard</p>
                </div>

            </div>

        </>
    );
}

export default Queue;