import { useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import { toast, Toaster } from 'sonner'
import axios from 'axios'
import { IoIosCopy } from "react-icons/io";

function Translate() {

  const [lang, setlang] = useState('select output language');
  const [visible, setVisible] = useState('');
  const [output, setOutput] = useState('');
  const [source, setSource] = useState('');
  const [translating, setTranslating] = useState(false);

  const languages = [
    'rust',
    'java',
    'c',
    'c++',
    'python',
    'go',
    'c#',
  ];

  const translateCode = async () => {
    if (!source) {
      toast.error("Please provide a source code");
      return;
    }
    if (lang === 'select output language') {
      toast.error("Please provide an output language");
      return;
    }

    try {
      setTranslating(true);
      const res = await axios.post('http://localhost:5000/translate/code', {
        source, lang
      });

      //console.log(res.data);
      setOutput(res.data.data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message);
    }
    finally {
      setTranslating(false);
    }
  }

  const copy = ()=> {
    if(!output){
      toast.error("No code available to copy");
      return;
    }

    navigator.clipboard.writeText(output);
    toast.success("Output code copied");

  }

  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10'>
        <Navbar />
        <Toaster richColors position='top-center' />

        <h1 className={`text-center w-full mt-5 mb-2 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Code Translate</h1>

        <div className='h-auto lg:px-5 py-4 w-full flex flex-col lg:flex-row justify-start items-center lg:items-start lg:py-10 gap-3'>
          <textarea onChange={(e) => setSource(e.target.value)} className='w-full rounded-md lg:rounded-lg py-3 px-3 text-black outline-none bg-gray-200 h-72 lg:h-[350px]' placeholder='Enter Source Code' />

          <div className='flex flex-col justify-center items-center gap-3 relative'>
            <p onClick={() => setVisible(!visible)} className='w-auto active:scale-95 px-4 lg:w-72 py-2 bg-blue-500 text-white rounded-md lg:rounded-lg cursor-pointer hover:opacity-75 duration-150 text-[12px] lg:text-sm text-center capitalize ease-in-out'>{lang}</p>
            <p className='w-auto active:scale-95 px-4 lg:w-72 py-2 bg-black text-white rounded-md lg:rounded-lg cursor-pointer hover:opacity-75 duration-150 text-[12px] lg:text-sm text-center ease-in-out' onClick={translateCode}>{translating ? "Translating . . ." : "Translate"}</p>
            <div className={`w-auto ${visible ? "block" : "hidden"} lg:w-72 absolute left-1/2 -translate-x-1/2 top-10 rounded-md py-1 px-1 flex flex-col justify-start items-center bg-blue-300`}>
              {languages.map((lang, index) => {
                return <span key={index} onClick={() => { setlang(lang); setVisible(false); }} className='px-4 capitalize w-full text-center py-2 rounded-md hover:bg-blue-200 duration-150 ease-in-out cursor-pointer text-black'>{lang}</span>
              })}
            </div>
          </div>

          <div className='w-full h-auto flex relative justify-center items-center'>
            <span onClick={copy} className='w-auto absolute top-4 right-2 bg-white px-2 py-2 rounded-full flex justify-center items-center gap-2 cursor-pointer active:scale-95 duration-150 ease-in-out'>Copy Code<IoIosCopy/></span>
            <textarea value={output} onChange={(e) => setSource(e.target.value)} className='w-full rounded-md lg:rounded-lg py-3 px-3 text-black outline-none bg-gray-200 h-72 lg:h-[350px]' placeholder='Translated Code' />
          </div>
        </div>

      </div>
    </>
  )
}

export default Translate
