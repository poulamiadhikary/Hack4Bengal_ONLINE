import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, Toaster } from 'sonner';

function AuthPage() {

  const [option, setOption] = useState('login');
  const [visible, setVisible] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [logging, setLogging] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Password and confirm password must be same");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be 8 characters or more");
      return;
    }

    try {
      setRegistering(true);

      const res = await axios.post('http://localhost:5000/register', {
        name, email, password
      });

      //console.log(res.data);

      if (res.status === 200) {
        setRegistering(false);
        toast.success("User registered");
        setOption('signup');
      }

    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message);
    }
  }

  const login = async () => {
    if (!email || !password) {
      toast.error("Both email and passwords are required");
      return;
    }

    try {
      setLogging(true);

      const res = await axios.post('http://localhost:5000/login', {
        email, password
      });

      //console.log(res.data);

      if (res.data.success) {
        setLogging(false);
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }

    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message);
    }
    finally {
      setLogging(false);
    }
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-start items-center gap-2 relative'>
        <Toaster richColors position='top-center' />
        <h1 className="w-full text-center py-5 text-lg tracking-wider mb-10">QUANTICA</h1>

        <Link to='/' className="absolute top-7 left-5 cursor-pointer rotate-180 text-[15px] sm:text-[20px]"><IoIosArrowForward /></Link>

        <div className='w-[90%] border-[1px] border-black sm:w-[70%] md:w-[50%] lg:w-[40%] h-auto rounded-md py-2 px-2 backdrop-blur-3xl bg-white/10 flex justify-between items-center'>
          <p onClick={() => setOption('login')} className={`${option === 'login' ? "bg-black text-white" : "text-black bg-transparent"} rounded-md text-center w-full px-3 py-2 hover:opacity-80 duration-200 ease-in-out cursor-pointer active:scale-95`}>Login</p>
          <p onClick={() => setOption('signup')} className={`${option === 'signup' ? "bg-black text-white" : "text-black bg-transparent"} rounded-md text-center w-full px-3 py-2 hover:opacity-80 duration-200 ease-in-out cursor-pointer active:scale-95`}>Sign Up</p>
        </div>

        <div className={`${option === 'login' ? "block" : "hidden"} border-[1px] border-black w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-auto py-3 px-3 rounded-md backdrop-blur-3xl bg-white/10 mt-2 flex flex-col justify-start items-center gap-2`}>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full outline-blue-400 duration-200 ease-in-out bg-gray-200 px-3 py-2 rounded-md" placeholder="Enter email" />
          <div className="w-full flex justify-center items-center relative">
            <input onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} className="w-full outline-blue-400 duration-200 ease-in-out pr-10 bg-gray-200 px-3 py-2 rounded-md" placeholder="Enter password" />
            <span onClick={() => setVisible(!visible)} className="opacity-75 absolute top-3 right-5 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
          </div>
          <p className="w-full flex justify-center items-center gap-2 bg-blue-500 cursor-pointer text-white hover:opacity-75 active:scale-95 duration-200 ease-in-out py-2 rounded-md" onClick={login}>{logging ? "Logging . . ." : "Enter"} <IoIosArrowForward /></p>
        </div>

        <div className={`${option === 'signup' ? "block" : "hidden"} border-[1px] border-black w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-auto py-3 px-3 rounded-md backdrop-blur-3xl bg-white/10 mt-2 flex flex-col justify-start items-center gap-2`}>
          <input onChange={(e) => setName(e.target.value)} type="text" className="w-full outline-blue-400 duration-200 ease-in-out bg-gray-200 px-3 py-2 rounded-md" placeholder="Enter full name" />
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full outline-blue-400 duration-200 ease-in-out bg-gray-200 px-3 py-2 rounded-md" placeholder="Enter email" />
          <div className="w-full flex justify-center items-center relative">
            <input onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} className="w-full outline-blue-400 duration-200 ease-in-out pr-10 bg-gray-200 px-3 py-2 rounded-md" placeholder="Enter password" />
            <span onClick={() => setVisible(!visible)} className="opacity-75 absolute top-3 right-5 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
          </div>
          <div className="w-full flex justify-center items-center relative">
            <input onChange={(e) => setConfirmPassword(e.target.value)} type={visible ? "text" : "password"} className="w-full outline-blue-400 duration-200 ease-in-out pr-10 bg-gray-200 px-3 py-2 rounded-md" placeholder="Confirm password" />
            <span onClick={() => setVisible(!visible)} className="opacity-75 absolute top-3 right-5 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
          </div>
          <p className="w-full flex justify-center items-center gap-2 bg-blue-500 cursor-pointer text-white hover:opacity-75 active:scale-95 py-2 duration-200 ease-in-out rounded-md" onClick={register}>{registering ? "Registering . . ." : "Create Account"} <IoIosArrowForward /></p>
        </div>
      </div>
    </>
  )
}

export default AuthPage
