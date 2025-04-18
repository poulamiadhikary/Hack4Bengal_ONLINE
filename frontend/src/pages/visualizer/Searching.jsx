import React, { useState } from 'react';
import { toast } from 'sonner';
import { linearSearching, binarySearching } from '../../data/searching.js';
import Navbar from '../../components/Navbar.jsx';

function Searching() {

    const languages = [
        'C++',
        'Java',
        'Python'
    ];

    const [array, setArray] = useState([]);
    const [lang, setLang] = useState(linearSearching[0].lang);
    const [code, setCode] = useState(linearSearching[0].code);
    const [code2, setCode2] = useState(binarySearching[0].code);
    const [size, setSize] = useState(0);
    const [target, setTarget] = useState(-1);
    const [searchIndex, setSearchIndex] = useState(-1);
    const [found, setFound] = useState(false);
    const [running, setRunning] = useState(false);
    const [ispresent, setPresent] = useState(false);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(-1);
    const [mid, setMid] = useState(-1);

    const generateArray = () => {

        if (size === 0) {
            toast.error("Array size should be minimum 5 and maximum 7");
            return;
        }

        if (size > 7) {
            toast.error("Array size should be not more than 7");
            return;
        }

        const newArray = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 100)
        );
        setArray(newArray);
        setSearchIndex(-1);
        setFound(false);
        toast.success(`Array created of size ${newArray.length}`);
    };

    const generateSortedArray = () => {

        if (size === 0) {
            toast.error("Array size should be minimum 5 and maximum 7");
            return;
        }

        if (size > 7) {
            toast.error("Array size should be not more than 7");
            return;
        }

        const newArray = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 100)
        ).sort((a, b) => a - b);
        setArray(newArray);
        setLow(0);
        setHigh(newArray.length - 1);
        setMid(-1);
        setFound(false);
    };

    const startBinarySearch = async () => {
        setRunning(true);
        setFound(false);
        let l = 0, h = array.length - 1;

        while (l <= h) {
            let m = Math.floor((l + h) / 2);
            setMid(m);
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (array[m] === target) {
                setFound(true);
                setSearchIndex(m);
                setRunning(false);
                return;
            } else if (array[m] < target) {
                l = m + 1;
            } else {
                h = m - 1;
            }

            setLow(l);
            setHigh(h);
        }

        toast.error("Element not present");
        setRunning(false);
    };

    const startSearch = async () => {
        setRunning(true);
        setFound(false);
        setSearchIndex(-1);

        for (let i = 0; i < array.length; i++) {
            setSearchIndex(i);
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (array[i] === Number(target)) {
                setFound(true);
                setRunning(false);
                setPresent(true);
                return;
            }
        }

        toast.error("Element not present");
        setPresent(false);
        setRunning(false);
    };

    const [option, setOption] = useState('');

    const copyToClipboard = () => {
        if (option === 'linear') {
            navigator.clipboard.writeText(code);
        }
        else {
            navigator.clipboard.writeText(code2);
        }

        toast.success("Code copied to clipboard");
    }

    return (
        <>
            <div className='w-full px-5 min-h-screen flex flex-col justify-start items-center pb-10'>

                <Navbar />
                
                <h1 className={`text-center w-full py-5 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Searching Algorithms</h1>

                <hr className='w-full h-[1px] bg-zinc-600' />

                {/* linear search */}
                <div className={`w-full h-auto ${option === 'linear' ? "block" : "hidden"} flex justify-center items-center`}>
                    <div className={`w-full md:w-[80%] rounded-md h-auto  duration-200 ease-in-out px-10 py-5 flex flex-col justify-start items-center gap-3`}>
                        <p className={` duration-200 ease-in-out text-lg md:text-xl font-bold`}>Linear Search</p>
                        <p className={` md:text-start duration-200 ease-in-out text-[10px] lg:text-sm w-full text-center`}>Linear Search is a fundamental searching algorithm used to find a specific element within a list or array. It works by iterating through each element in the list, one by one, until it finds the desired element or reaches the end of the list. This straightforward approach makes Linear Search easy to implement and understand, but it can be less efficient for large datasets compared to other searching algorithms. Despite this, Linear Search remains a valuable algorithm in computer science, particularly for small to medium-sized datasets or situations where simplicity is more important than speed.</p>

                        <hr className='w-full h-[1px] bg-zinc-600 opacity-55 lg:opacity-80' />

                        <p className={` md:text-start duration-200 ease-in-out text-[10px] w-full text-center`}>Time Complexity : <span className='font-bold'>O(n)</span> </p>
                        <p className={` md:text-start duration-200 ease-in-out text-[10px] w-full text-center`}>Space Complexity : <span className='font-bold'>O(1)</span> </p>

                        <div className={`w-full ${array.length > 0 ? "hidden" : "block"} h-auto flex flex-col justify-start items-center gap-3`}>
                            <input onChange={(e) => setSize(e.target.value)} type="number" className={`bg-gray-200 h-auto  duration-200 ease-in-out px-3 w-[50%] py-1 lg:py-2 rounded-md outline-none`} placeholder='Enter array size (maximum 7)' />
                            <button className={`bg-blue-500 rounded-md text-white duration-200 ease-in-out px-5 py-1 cursor-pointer hover:opacity-75`} onClick={generateArray}>Generate Array</button>
                        </div>

                        <div className='w-full px-2 py-5 flex justify-center items-center gap-2'>
                            {array.length > 0 && array.map((elem, index) => {
                                return <span key={index} className={`${searchIndex === index ? "bg-yellow-400 -translate-y-3" : "bg-black text-white"} ${found && searchIndex === index ? "bg-emerald-600" : ""} duration-200 ease-in-out p-2 lg:p-4 relative hover:-translate-y-3 cursor-pointer rounded-md`}> <span className={`absolute text-[5px] lg:text-[8px] top-1 left-1 lg:left-2`}>{index}</span> {elem}</span>
                            })}
                        </div>

                        <div className={`w-full ${array.length > 0 ? "block" : "hidden"} h-auto flex flex-col justify-start items-center gap-3`}>
                            <input onChange={(e) => setTarget(e.target.value)} type="number" className={`bg-gray-200 h-auto duration-200 ease-in-out px-3 w-[50%] py-1 lg:py-2 rounded-md outline-none`} placeholder='Enter target element' />
                            <button className={`bg-blue-400 text-white rounded-md  duration-200 ease-in-out px-5 py-1 cursor-pointer hover:opacity-75`} onClick={startSearch}>{running ? "Searching..." : "Start Search"}</button>
                        </div>

                        <p className={`text-green-500 duration-200 ease-in-out text-lg md:text-xl font-semibold ${found ? "block" : "hidden"}`}>{`Element found at index ${searchIndex} 🎉`}</p>

                        <div className={`w-full h-auto flex flex-wrap justify-start py-2 px-3 items-center gap-3`}>
                            {languages.map((lang, index) => {
                                return <span className={`border-2  px-3 py-1 rounded-md cursor-pointer`} onClick={() => { setLang(lang); setCode(linearSearching[index].code) }}>{lang}</span>
                            })}
                        </div>

                        <div className={`w-full bg-gray-200 rounded-md lg:rounded-lg py-3 px-4  duration-200 ease-in-out`}>
                            <pre className={`duration-200 ease-in-out font-mono overflow-x-auto`}>{code}</pre>
                        </div>

                        <p className={`bg-blue-400 rounded-md  duration-200 ease-in-out px-5 py-2 mt-4 cursor-pointer text-white hover:opacity-75`} onClick={copyToClipboard}>Copy to Clipboard</p>
                    </div>
                </div>

                {/* binary search */}
                <div className={`w-full h-auto ${option === 'binary' ? "block" : "hidden"} flex justify-center items-center`}>
                    <div className={`w-full md:w-[80%] rounded-md h-auto duration-200 ease-in-out px-10 py-5 flex flex-col justify-start items-center gap-3`}>
                        <p className={` duration-200 ease-in-out text-lg md:text-xl font-bold`}>Binary Search</p>
                        <p className={` md:text-start duration-200 ease-in-out text-[10px] lg:text-sm w-full text-center`}>Binary Search is an efficient searching algorithm used to find an element in a sorted array. It works by dividing the array into two halves and comparing the target element with the middle element. If the target element is less than the middle element, the search continues in the left half; otherwise, it continues in the right half. This process is repeated until the target element is found or the array is exhausted. </p>

                        <hr className='w-full h-[1px] bg-zinc-600 opacity-55 lg:opacity-80' />

                        <p className={` md:text-start duration-200 ease-in-out text-[10px] w-full text-center`}>Time Complexity : <span className='font-bold'>O(log n)</span> </p>
                        <p className={` md:text-start duration-200 ease-in-out text-[10px] w-full text-center`}>Space Complexity : <span className='font-bold'>O(1)</span> </p>

                        <div className={`w-full ${array.length > 0 ? "hidden" : "block"} h-auto flex flex-col justify-start items-center gap-3`}>
                            <input onChange={(e) => setSize(e.target.value)} type="number" className={` h-auto duration-200 ease-in-out px-3 w-[50%] py-1 lg:py-2 rounded-md outline-none bg-gray-200`} placeholder='Enter array size (maximum 7)' />
                            <button className={`bg-blue-500 text-white rounded-md duration-200 ease-in-out px-5 py-1 cursor-pointer hover:opacity-75`} onClick={generateSortedArray}>Generate Array</button>
                        </div>

                        <div className='w-full px-2 py-5 flex justify-center items-center gap-2'>
                            {array.length > 0 && array.map((elem, index) => {
                                return <span key={index} className={` ${mid === index ? "bg-yellow-400 -translate-y-3" : "text-white bg-black"} ${found && searchIndex === index ? "bg-emerald-600" : ""} duration-200 ease-in-out p-2 lg:p-4 relative hover:-translate-y-3 cursor-pointer rounded-md`}> <span className={`absolute text-[5px] lg:text-[8px] top-1 left-1 lg:left-2`}>{index}</span> {elem}</span>
                            })}
                        </div>

                        <div className={`w-full ${array.length > 0 ? "block" : "hidden"} h-auto flex flex-col justify-start items-center gap-3`}>
                            <input onChange={(e) => setTarget(e.target.value)} type="number" className={`bg-gray-200 h-auto duration-200 ease-in-out px-3 w-[50%] py-1 lg:py-2 rounded-md outline-none`} placeholder='Enter target element' />
                            <button className={`bg-blue-400 text-white rounded-md  duration-200 ease-in-out px-5 py-1 cursor-pointer hover:opacity-75`} onClick={startBinarySearch}>{running ? "Searching..." : "Start Search"}</button>
                        </div>

                        <p className={`text-green-500 duration-200 ease-in-out text-lg md:text-xl font-semibold ${found ? "block" : "hidden"}`}>{`Element found at index ${searchIndex} 🎉`}</p>

                        <div className={`w-full h-auto flex flex-wrap justify-start py-2 px-3 items-center gap-3`}>
                            {languages.map((lang, index) => {
                                return <span className={`border-2  px-3 py-1 rounded-md cursor-pointer`} onClick={() => { setLang(lang); setCode2(binarySearching[index].code) }}>{lang}</span>
                            })}
                        </div>

                        <div className={`w-full bg-gray-200 lg:rounded-lg rounded-md py-3 px-4  duration-200 ease-in-out`}>
                            <pre className={` duration-200 ease-in-out font-mono overflow-x-auto`}>{code2}</pre>
                        </div>

                        <p className={`bg-blue-400 rounded-md  duration-200 ease-in-out px-5 py-2 mt-4 cursor-pointer text-white hover:opacity-75`} onClick={copyToClipboard}>Copy to Clipboard</p>
                    </div>
                </div>

                <div className={`${option === '' ? "block" : "hidden"} w-full rounded-md h-auto py-4 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3 sm:gap-8`}>
                    <div className={`w-full cursor-pointer bg-gray-200 hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => setOption('binary')}>
                        <h3 className={`text-center w-full  text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Binary Search</h3>
                        <p className={`w-full text-center  opacity-55 duration-200 ease-in-out text-sm`}>Binary search implementation with arrays</p>
                    </div>
                    <div className={`w-full cursor-pointer bg-gray-200 hover:shadow-md hover:-translate-y-4 rounded-md h-44  px-5 py-3 duration-200 ease-in-out flex flex-col justify-evenly items-center gap-3`} onClick={() => setOption('linear')}>
                        <h3 className={`text-center w-full  text-xl sm:text-2xl font-semibold duration-200 ease-in-out font-Titillium`}>Linear Search</h3>
                        <p className={`w-full text-center opacity-55 duration-200 ease-in-out text-sm`}>Linear Search implementation with arrays.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Searching;