import Navbar from '../../components/Navbar.jsx';
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function AIStudio() {

    const navigate = useNavigate();

    const openPage = (link) => {
        navigate(link);
    }

  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10'>
        <Navbar/>

        <h1 className={`text-center w-full mt-3 mb-2 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>AI Studio</h1>

        <div className='w-full h-auto mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-3'>
            <div onClick={() => openPage('/ai-studio/text')} className='w-full cursor-pointer hover:shadow-2xl duration-200 ease-in-out h-auto rounded-md bg-gray-200 flex flex-col justify-center items-center py-5 px-4'>
                <h1 className='capitalize font-bold text-lg text-center'>Text Generate</h1>
                <p className='capitalize font-normal text-[12px] md:text-sm text-center'>Generate, Rephrase, Craft</p>
                <p className='capitalize w-full font-normal text-[12px] bg-gradient-to-r from-blue-300 via-blue-500 to-purple-700 text-center flex justify-center items-center py-1 lg:py-2 cursor-pointer hover:opacity-80 duration-200 ease-in-out mt-2 px-3 rounded-full text-white'>Try <MdOutlineArrowOutward /> </p>
            </div>
            <div onClick={() => openPage('/ai-studio/code')} className='w-full cursor-pointer hover:shadow-2xl duration-200 ease-in-out h-auto rounded-md bg-gray-200 flex flex-col justify-center items-center py-5 px-4'>
                <h1 className='capitalize font-bold text-lg text-center'>Code Generate</h1>
                <p className='capitalize font-normal text-[12px] md:text-sm text-center'>Fix, Solve, Enhance</p>
                <p className='capitalize w-full font-normal text-[12px] bg-gradient-to-r from-blue-300 via-blue-500 to-purple-700 text-center flex justify-center items-center py-1 lg:py-2 cursor-pointer hover:opacity-80 duration-200 ease-in-out mt-2 px-3 rounded-full text-white'>Try <MdOutlineArrowOutward /> </p>
            </div>
            <div onClick={() => openPage('/ai-studio/summarize-text')} className='w-full cursor-pointer hover:shadow-2xl duration-200 ease-in-out h-auto rounded-md bg-gray-200 flex flex-col justify-center items-center py-5 px-4'>
                <h1 className='capitalize font-bold text-lg text-center'>Text Summarize</h1>
                <p className='capitalize font-normal text-[12px] md:text-sm text-center'>Reacp, Digest, Compact</p>
                <p className='capitalize w-full font-normal text-[12px] bg-gradient-to-r from-blue-300 via-blue-500 to-purple-700 text-center flex justify-center items-center py-1 lg:py-2 cursor-pointer hover:opacity-80 duration-200 ease-in-out mt-2 px-3 rounded-full text-white'>Try <MdOutlineArrowOutward /> </p>
            </div>
            <div onClick={() => openPage('/ai-studio/translate-code')} className='w-full cursor-pointer hover:shadow-2xl duration-200 ease-in-out h-auto rounded-md bg-gray-200 flex flex-col justify-center items-center py-5 px-4'>
                <h1 className='capitalize font-bold text-lg text-center'>Code Translation</h1>
                <p className='capitalize font-normal text-[12px] md:text-sm text-center'>Convert, Share, Run</p>
                <p className='capitalize w-full font-normal text-[12px] bg-gradient-to-r from-blue-300 via-blue-500 to-purple-700 text-center flex justify-center items-center py-1 lg:py-2 cursor-pointer hover:opacity-80 duration-200 ease-in-out mt-2 px-3 rounded-full text-white'>Try <MdOutlineArrowOutward /> </p>
            </div>
        </div>
      </div>
    </>
  )
}

export default AIStudio
