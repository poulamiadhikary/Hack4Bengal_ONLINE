import Navbar from '../../components/Navbar.jsx';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { stack } from '../../data/stack.js';

function Stack() {

    const languages = [
        'C++',
        'Java',
        'Python'
    ];

    const [array, setArray] = useState([]);
    const [size, setSize] = useState(0);
    const [lang, setLang] = useState(stack[0].lang);
    const [code, setCode] = useState(stack[0].code);
    const [created, setCreated] = useState(false);
    const [element, setElement] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const createStack = () => {
        if (!size) {
            toast.error("Enter stack size");
            return;
        }

        if (size > 7) {
            toast.error("Size should be not greater than 7");
            return;
        }

        setCreated(true);
        toast.success("Stack created");
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard");
    }

    const pushElement = () => {
        if (array.length > size - 1) {
            toast.error("STACK OVERFLOW");
            return;
        }

        if (!element) {
            toast.error("Please enter element");
            return;
        }

        setArray([...array, element]);
        setMessages([...messages, `${element} pushed in stack`]);
        toast.success(`${element} pushed in stack`);
        setElement(null);
    }

    const popElement = () => {
        if (array.length === 0) {
            toast.error("STACK IS EMPTY");
            return;
        }

        setArray([...array.slice(0, -1)]);
        setMessages([...messages, 'Element popped from stack']);
    }

    return (
        <>
            <div className='w-full min-h-screen flex flex-col justify-start items-center pb-10 px-5'>
                <Navbar />
                
                <div className={`w-full md:w-[80%] rounded-md h-auto  duration-200 ease-in-out px-10 flex flex-col justify-start items-center gap-3`}>

                    <h1 className={`text-center w-full  text-3xl font-bold duration-200 ease-in-out py-5 font-Titillium`}>Stack Data Structure</h1>

                    <hr className='w-full h-[1px] bg-zinc-600' />

                    <div className={`w-full rounded-md h-auto  duration-200 ease-in-out px-10 py-5 flex flex-col justify-start items-center gap-3`}>
                        <p className={` md:text-start duration-200 ease-in-out text-[10px] lg:text-sm w-full text-center`}>A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle, meaning the last element added to the stack will be the first one to be removed.<br /><br />

                            Key Operations: <br />

                            1. Push: Add an element to the top of the stack. <br />
                            2. Pop: Remove the top element from the stack. <br />
                            3. Peek: Return the top element without removing it. <br /><br />

                            Characteristics: <br />

                            1. LIFO order: Elements are added and removed in reverse order. <br />
                            2. No random access: Elements can only be accessed from the top. <br />
                            3. Efficient insertion and deletion: O(1) time complexity for push and pop operations. <br />
                        </p>

                        <hr className='w-full h-[1px] bg-zinc-600 opacity-55 lg:opacity-80' />

                        <div className={`w-full px-2 py-5 flex flex-col justify-center items-center gap-2 ${created ? "hidden" : "block"}`}>
                            <input type="number" className={`w-[70%] lg:w-[40%] duration-200 bg-gray-200 ease-in-out px-3 py-1 rounded-md outline-none`} placeholder='Enter stack size (maximum 7)' onChange={(e) => setSize(e.target.value)} />
                            <button className={`bg-blue-500 text-white rounded-md py-1 px-4 cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={createStack}>Create Stack</button>
                        </div>

                        <div className={`w-full ${created ? "block" : "hidden"} py-2 lg:py-5 rounded-md px-4  duration-200 ease-in-out h-auto flex flex-col justify-center items-center lg:flex-row gap-5`}>
                            <div className='w-full h-auto py-2 flex flex-col justify-around items-center lg:h-full lg:w-1/2'>
                                <div className='w-full py-3 h-full flex flex-col justify-center items-center gap-2'>
                                    <input type="number" className={`w-full  bg-gray-200 duration-200 ease-in-out px-3 py-1 outline-none rounded-md`} value={element} placeholder='Enter element' onChange={(e) => setElement(e.target.value)} />
                                    <div className='w-full flex justify-center items-center gap-2'>
                                        <button className={`bg-blue-500 text-white rounded-md py-1 px-4 cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={pushElement}>Push Element</button>
                                        <button className={`bg-red-500 text-white rounded-md py-1 px-4 cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={popElement}>Pop Element</button>
                                    </div>
                                </div>

                                <div className={`w-full rounded-md py-3 flex flex-col bg-gray-200 justify-center items-center gap-2 overflow-y-auto content`}>
                                    <p className='text-xl font-semibold mb-2'>Operations History</p>

                                    {messages.length > 0 && messages.map((msg, index) => {
                                        return <p key={index} className={` duration-200 ease-in-out text-sm`}>{msg}</p>
                                    })}
                                </div>
                            </div>

                            <div className='w-full h-auto py-2 flex flex-col justify-center items-center lg:h-full lg:w-1/2'>
                                <div className={`h-auto px-1 py-2 w-1/3 border-b-2 border-r-2 border-l-2  duration-200 ease-in-out flex flex-col justify-end items-center gap-2`}>
                                    {array.length > 0 && array.map((elem, index) => {
                                        return <span key={index} className={` duration-200 ease-in-out w-full rounded-md py-2 px-2 bg-black text-white text-center`}>{elem}</span>
                                    }).reverse()}
                                </div>
                            </div>
                        </div>

                        <div className={`w-full h-auto flex flex-wrap justify-start py-2 px-3 items-center gap-3`}>
                            {languages.map((lang, index) => {
                                return <span className={`border-2  px-3 py-1 rounded-md cursor-pointer`} onClick={() => { setLang(lang); setCode(stack[index].code) }}>{lang}</span>
                            })}
                        </div>

                        <div className={`w-full bg-gray-200 lg:rounded-lg  rounded-md py-3 px-4 duration-200 ease-in-out`}>
                            <pre className={` duration-200 ease-in-out font-mono overflow-x-auto`}>{code}</pre>
                        </div>

                        <p className={`bg-blue-400 rounded-md  duration-200 ease-in-out px-5 py-2 mt-4 cursor-pointer text-white hover:opacity-75`} onClick={copyToClipboard}>Copy to Clipboard</p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Stack;
