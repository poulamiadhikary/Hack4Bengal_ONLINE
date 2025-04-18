import Navbar from '../components/Navbar.jsx';
import { allQuestions } from '../data/quiz/questions/allQuiz.js';
import { IoMdSearch } from "react-icons/io";
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Quiz() {

  const [category, setCategory] = useState('development');
  const [searchterm, setSearchTerm] = useState('');
  const [found, setFound] = useState(null);
  const [isFound, setIsFound] = useState(true);
  const navigate = useNavigate();

  const search = () => {
    if (!searchterm) {
      toast.error("Please enter a keyword");
      return;
    }

    const term = searchterm.toLowerCase();
    const result = allQuestions.find((item) => {
      return item.title === term
    });

    if (result) {
      setFound(result);
      //console.log(result);
    }
    else {
      setIsFound(false);
    }
  }

  const naviagtePage = (data) => {
    navigate(`/quiz/${data.title}`, { state: data});
  }

  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-start items-center relative pb-10 px-5'>
        <Navbar />
        <Toaster richColors position='top-center' />

        <h1 className={`text-center w-full mt-3 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Quiz</h1>

        <div className='w-full lg:w-[70%] h-auto gap-3 lg:gap-0 mt-5 flex flex-col lg:flex-row justify-center items-center'>
          <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className='w-full rounded-full lg:rounded-l-full lg:rounded-r-none outline-none bg-gray-200 pr-10 py-2 px-3' placeholder='Enter keyword : react, cpp' />
          <span onClick={search} className='w-full lg:w-[5%] cursor-pointer hover:opacity-70 ease-in-out duration-200 bg-blue-500 text-white h-full flex justify-center rounded-full lg:rounded-l-none gap-2 lg:rounded-r-full items-center py-3'> <span className='lg:hidden'>Search</span> <IoMdSearch /></span>
        </div>

        <div className='w-full sm:w-auto overflow-x-auto mt-5 h-auto rounded-full border-[1px] border-blue-400  py-2 px-3 flex justify-center items-start gap-3'>
          <p onClick={() => setCategory('development')} className={`w-auto ${category === 'development' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>Development</p>
          <p onClick={() => setCategory('cs')} className={`w-auto ${category === 'cs' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>CS </p>
          <p onClick={() => setCategory('programming')} className={`w-auto ${category === 'programming' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>Programming</p>
          <p onClick={() => setCategory('database')} className={`w-auto ${category === 'database' ? "bg-blue-400 text-white" : "bg-white text-black"} text-[12px] lg:text-sm px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 duration-150 ease-in-out`}>Database</p>
        </div>

        <div className={`${found === null && isFound === true ? "block" : "hidden"} w-full lg:w-[90%] mt-5 py-3 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 `}>
          {allQuestions.map((ques, index) => {
            return <div key={index} className={`${ques.category === category ? "block" : "hidden"} cursor-pointer hover:shadow-2xl duration-150 ease-in-out h-auto py-5 px-5 rounded-md bg-gray-200 w-full flex flex-col justify-center items-center `}>
              <h1 className='font-bold capitalize text-xl sm:text-2xl'>{ques.title}</h1>
              <p className='text-[12px] capitalize md:text-sm'>Category : {category}</p>
              <p className='w-full rounded-full bg-blue-400 text-white flex justify-center items-center py-2 text-[12px] mt-2 lg:text-sm cursor-pointer hover:opacity-75 ease-in-out duration-200 active:scale-95' onClick={() => naviagtePage(ques)}>Take Quiz</p>
            </div>
          })}
        </div>

        <div className={`w-full ${found ? "block" : "hidden"} lg:w-[90%] mt-5 py-3 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 ${isFound ? "block" : "hidden"}`}>
          <div className={`h-auto py-5 px-5 rounded-md bg-gray-200 w-full flex flex-col justify-center items-center `}>
            <h1 className='font-bold capitalize text-xl sm:text-2xl'>{found?.title}</h1>
            <p className='text-[12px] capitalize md:text-sm'>Category : {found?.category}</p>
            <p className='w-full rounded-full bg-blue-400 text-white flex justify-center items-center py-2 text-[12px] mt-2 lg:text-sm cursor-pointer hover:opacity-75 ease-in-out duration-200 active:scale-95' onClick={() => naviagtePage(ques)}>Take Quiz</p>
          </div>
        </div>

        <div className={`mt-5 ${!isFound ? "block" : "hidden"} w-full py-5 px-5 flex flex-col justify-center items-center gap-2 bg-gray-200 rounded-md lg:rounded-lg`}>
          <h1 className='text-3xl font-bold'>Sorry :(</h1>
          <p className='text-center text-[12px] md:text-sm lg:text-lg'>We don't have what you are looking for ☹️</p>
        </div>

      </div>
    </>
  )
}

export default Quiz
