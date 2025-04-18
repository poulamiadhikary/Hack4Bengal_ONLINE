import React, { useState } from 'react';
import { linkedList } from '../../data/linkedlist.js';
import { toast } from 'sonner';
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from '../../components/Navbar.jsx';

function LinkedList() {

    const languages = [
        'C++',
        'Java',
        'Python'
    ];

    const [array, setArray] = useState([]);
    const [lang, setLang] = useState(linkedList[0].lang);
    const [code, setCode] = useState(linkedList[0].code);
    const [element, setElement] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [atIndex, setAtIndex] = useState(false);
    const [index, setIndex] = useState(-1);
    const [deleteIndex, setDeleteIndex] = useState(-1);

    const pushAtFront = () => {
        if (!element) {
            toast.error("Please enter element to insert");
            return;
        }

        setArray([element, ...array]);
        setMessages([...messages, `${element} pushed at front`]);
        toast.success(`${element} pushed at front`);
        setElement('');
    }

    const pushAtEnd = () => {
        if (!element) {
            toast.error("Please enter element to insert");
            return;
        }

        setArray([...array, element]);
        setMessages([...messages, `${element} pushed at end`]);
        toast.success(`${element} pushed at end`);
        setElement('');
    }

    const deleteAtEnd = () => {
        if (array.length === 0) {
            toast.error("LIST IS EMPTY");
            return;
        }

        const newArray = array.slice(0, -1);
        setArray(newArray);
        setMessages([...messages, `Last node deleted`]);
        toast.success(`Last node deleted`);
    }

    const deleteAtFront = () => {
        if (array.length === 0) {
            toast.error("LIST IS EMPTY");
            return;
        }

        const newArray = array.slice(1);
        setArray(newArray);
        setMessages([...messages, `First node deleted`]);
        toast.success(`First node deleted`);
    }

    const insertAtPosition = () => {
        if (index === -1) {
            toast.error("Index is required");
            return;
        }

        if (!element) {
            toast.error("Element is required");
            return;
        }

        if (index > array.length) {
            toast.error("Please enter valid index");
            return;
        }

        array.splice(index, 0, element);
        setArray([...array]);
        setMessages([...messages, `${element} pushed at index ${index}`]);
        toast.success(`${element} pushed at index ${index}`);
    }

    const deleteAtPosition = () => {
        if (deleteIndex === -1) {
            toast.error("Index is required");
            return;
        }

        if (array.length === 0) {
            toast.error("LIST IS EMPTY");
            return;
        }

        if (deleteIndex > array.length) {
            toast.error("Enter valid index");
            return;
        }

        array.splice(deleteIndex, 1);
        setArray([...array]);
        setMessages([...messages, `Element deleted from index ${deleteIndex}`]);
        toast.success(`Element deleted from index ${deleteIndex}`);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard");
    }

    return (
        <>
            <div className='w-full px-5 pb-10 min-h-screen flex flex-col justify-start items-center relative'>

                <Navbar />

                <h1 className={`text-center w-full py-3 text-3xl font-bold duration-200 ease-in-out font-Titillium mt-4`}>Linked List Data Structure</h1>

                <hr className='w-full h-[1px] bg-zinc-600' />


                {/* linked list */}
                <div className={`w-full h-auto flex justify-center items-center`}>
                    <div className={`w-full md:w-[80%] rounded-md h-auto  duration-200 ease-in-out px-10 py-5 flex flex-col justify-start items-center gap-3`}>
                        <p className={` md:text-start duration-200 ease-in-out text-[10px] lg:text-sm w-full text-center`}>A linked list is a linear data structure in which elements are not stored at contiguous memory locations. Instead, each element, called a "node," points to the next node in the sequence, forming a chain-like structure.  <br /><br />

                            Characteristics: <br />

                            1. Dynamic Memory Allocation: Memory is allocated dynamically, allowing for efficient use of memory. <br />
                            2. Non-Contiguous Memory: Nodes are stored at non-contiguous memory locations <br />
                            3. Node Structure: Each node contains two primary components: data and a reference (or "link") to the next node.  <br />
                            4. Sequential Access: Nodes are accessed sequentially, one after the other<br /><br />

                            Key Operations:  <br />

                            1. Insertion: Adding a new node to the list.  <br />
                            2. Deletion: Removing a node from the list. <br />
                            3. Traversal: Iterating through the nodes in the list.<br />
                            4. Search: Finding a specific node in the list.  <br />
                            5. Update: Modifying the data of a node in the list. <br />
                        </p>

                        <hr className='w-full h-[1px] bg-zinc-600 opacity-55 lg:opacity-80' />

                        <div className={`w-full py-2 lg:py-5 rounded-md px-4  duration-200 ease-in-out h-auto flex flex-col justify-center items-center gap-5`}>
                            <div className='w-full h-auto py-2 flex flex-col justify-around items-center lg:h-full lg:w-1/2'>
                                <div className='w-full py-3 h-full flex flex-col justify-center items-center gap-2'>
                                    <input type="number" className={`w-full bg-gray-200 sm:w-[60%] md:w-[40%] lg:w-[80%]  duration-200 ease-in-out px-3 py-1 outline-none rounded-md`} value={element} placeholder='Enter element' onChange={(e) => setElement(e.target.value)} />
                                    <div className='w-full flex justify-center items-center gap-2'>
                                        <button className={`bg-cyan-500 text-white rounded-md py-1 px-4 lg:py-2 text-[12px] cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={pushAtFront}>Push At Front</button>
                                        <button className={`bg-purple-500 text-white rounded-md py-1 px-4 lg:py-2 text-[12px] cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={pushAtEnd}>Push At End</button>
                                        <button className={`bg-orange-400 text-white rounded-md py-1 px-4 lg:py-2 text-[12px] cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={insertAtPosition}>Push At Index</button>
                                    </div>

                                    <input type="number" className={`bg-gray-200 duration-200 w-full sm:w-[60%] md:w-[40%] lg:w-[80%] ease-in-out px-2 py-1 lg:py-2 rounded-md outline-none`} placeholder='Enter insert index' onChange={(e) => setIndex(e.target.value)} />

                                    <hr className='w-full h-[1px] lg:h-[1.5px] bg-zinc-600 my-2' />

                                    <div className='w-full flex justify-center items-center gap-2'>
                                        <button className={`bg-red-400 text-white rounded-md py-1 px-4 lg:py-2 text-[12px] cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={deleteAtFront}>Delete At Front</button>
                                        <button className={`bg-red-600 text-white rounded-md py-1 px-4 lg:py-2 text-[12px] cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={deleteAtEnd}>Delete At End</button>
                                        <button className={`bg-red-800 text-white rounded-md py-1 px-4 lg:py-2 text-[12px] cursor-pointer hover:opacity-80 duration-200 ease-in-out`} onClick={deleteAtPosition}>Delete At Index</button>
                                    </div>

                                    <input type="number" className={`bg-gray-200 duration-200 w-full sm:w-[60%] md:w-[40%] lg:w-[80%] ease-in-out px-2 py-1 lg:py-2 rounded-md outline-none`} placeholder='Enter delete index' onChange={(e) => setDeleteIndex(e.target.value)} />
                                </div>

                                <div className={`w-full bg-gray-200 rounded-md py-3 flex flex-col justify-center items-center gap-2 overflow-y-auto content`}>
                                    <p className='text-xl font-semibold mb-2'>Operations History</p>
                                    {messages.length > 0 && messages.map((msg, index) => {
                                        return <p key={index} className={`duration-200 ease-in-out text-sm`}>{msg}</p>
                                    })}
                                </div>
                            </div>

                            <div className='w-full h-auto py-2 border-[1px] border-black rounded-md flex justify-start items-center lg:h-full lg:w-1/2 gap overflow-x-auto content'>
                                {array.length > 0 && array.map((node, index) => {
                                    return <div key={index} className={`w-auto flex justify-center items-center`}>
                                        <span className={` py-2 px-3 rounded-md duration-200 ease-in-out cursor-pointer hover:-translate-y-3`}>{node}</span>
                                        <span className={` rotate-180 text-lg duration-200 ease-in-out`}>{index !== array.length ? <IoIosArrowRoundBack /> : ""}</span>
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className={`w-full h-auto flex flex-wrap justify-start px-3 items-center gap-3`}>
                            {languages.map((lang, index) => {
                                return <span className={`border-2 px-3 py-1 rounded-md cursor-pointer`} onClick={() => { setLang(lang); setCode(linkedList[index].code) }}>{lang}</span>
                            })}
                        </div>

                        <div className={`w-full bg-gray-200 rounded-md lg:rounded-lg py-3 px-4 duration-200 ease-in-out`}>
                            <pre className={` duration-200 ease-in-out font-mono overflow-x-auto`}>{code}</pre>
                        </div>

                        <p className={`bg-blue-400 rounded-md  duration-200 ease-in-out px-5 py-2 mt-4 cursor-pointer text-white hover:opacity-75`} onClick={copyToClipboard}>Copy to Clipboard</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default LinkedList;