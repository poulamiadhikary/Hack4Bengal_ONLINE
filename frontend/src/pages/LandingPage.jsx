import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { GoArrowUpRight } from "react-icons/go";

function LandingPage() {
  return (
    <>
      <div className="w-full h-auto flex flex-col justify-start items-center">

        <div className="w-full h-screen bg-white flex flex-col justify-start items-center">
          <h1 className="w-full text-center py-5 text-lg tracking-wider">QUANTICA</h1>

          <div className="w-[95%] h-auto rounded-md border-[1px] border-black lg:rounded-lg backdrop-blur-3xl bg-white/10 py-5 px-5">
            <h1 className="w-full text-center text-3xl lg:text-5xl font-bold">Unleash your true potential</h1>
            <p className="w-full text-center text-[12px] lg:text-lg py-3">Come & join a space to fuel your tech enthusiasm</p>
            <div className="w-full flex justify-center items-center px-10 lg:py-3">
              <Link to='/auth' className="flex w-auto px-5 py-2 rounded-full text-[12px] justify-center items-center gap-2 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 cursor-pointer hover:opacity-80 duration-200 ease-in-out text-white">Try. It's free <IoIosArrowForward /></Link>
            </div>
          </div>

          <div className="w-full h-10 px-5 flex justify-center items-center mt-3 gap-5 lg:mt-8">
            <Marquee pauseOnHover={true}>
                <p className="text-2xl lg:text-5xl font-bold text-blue-500 mx-5">QUIZ</p>
                <p className="text-2xl lg:text-5xl font-bold text-blue-500 mx-5">WEB PLAYGROUND</p>
                <p className="text-2xl lg:text-5xl font-bold text-blue-500 mx-5">RESOURCES</p>
                <p className="text-2xl lg:text-5xl font-bold text-blue-500 mx-5">VISUALIZER</p>
                <p className="text-2xl lg:text-5xl font-bold text-blue-500 mx-5">NOTES</p>
                <p className="text-2xl lg:text-5xl font-bold text-blue-500 mx-5">AI STUDIO</p>
            </Marquee>
          </div>

          <div className="w-full py-5 px-4 mt-3 grid grid-cols-2 md:grid-cols-4 justify-items-center gap-3">
              <div className="w-full px-5 flex flex-col justify-center items-center group overflow-hidden rounded-md h-36 border-[1px] border-blue-500 relative cursor-pointer duration-200 ease-in-out">
                <div className="z-20 h-[700px] w-[700px] absolute bottom-72 right-72 group-hover:-bottom-28 group-hover:-right-28 duration-500 ease-in-out rounded-full bg-blue-500"></div>
                <p className="z-30 capitalize text-center text-[13px] font-bold sm:text-lg text-black group-hover:text-white">Practice frontend at </p>
                <Link className="z-30 text-[12px] lg:text-sm text-blue-500 group-hover:underline group-hover:text-white flex justify-center items-center gap-1 cursor-pointer">Playground <GoArrowUpRight /></Link>
              </div>
              <div className="w-full px-5 flex flex-col justify-center items-center group overflow-hidden rounded-md h-36 border-[1px] border-blue-500 relative cursor-pointer duration-200 ease-in-out">
                <div className="z-20 h-[700px] w-[700px] absolute bottom-72 right-72 group-hover:-bottom-28 group-hover:-right-28 duration-500 ease-in-out rounded-full bg-blue-500"></div>
                <p className="z-30 capitalize text-center text-[13px] font-bold sm:text-lg text-black group-hover:text-white">Discover AI at </p>
                <Link className="z-30 text-[12px] lg:text-sm text-blue-500 group-hover:underline group-hover:text-white flex justify-center items-center gap-1 cursor-pointer">AI Studio <GoArrowUpRight /></Link>
              </div>
              <div className="w-full px-5 flex flex-col justify-center items-center group overflow-hidden rounded-md h-36 border-[1px] border-blue-500 relative cursor-pointer duration-200 ease-in-out">
                <div className="z-20 h-[700px] w-[700px] absolute bottom-72 right-72 group-hover:-bottom-28 group-hover:-right-28 duration-500 ease-in-out rounded-full bg-blue-500"></div>
                <p className="z-30 capitalize text-center text-[13px] font-bold sm:text-lg text-black group-hover:text-white">Test knowledge at </p>
                <Link className="z-30 text-[12px] lg:text-sm text-blue-500 group-hover:underline group-hover:text-white flex justify-center items-center gap-1 cursor-pointer">Quiz <GoArrowUpRight /></Link>
              </div>
              <div className="w-full px-5 flex flex-col justify-center items-center group overflow-hidden rounded-md h-36 border-[1px] border-blue-500 relative cursor-pointer duration-200 ease-in-out">
                <div className="z-20 h-[700px] w-[700px] absolute bottom-72 right-72 group-hover:-bottom-28 group-hover:-right-28 duration-500 ease-in-out rounded-full bg-blue-500"></div>
                <p className="z-30 capitalize text-center text-[13px] font-bold sm:text-lg text-black group-hover:text-white">Practice frontend at </p>
                <Link className="z-30 text-[12px] lg:text-sm text-blue-500 group-hover:underline group-hover:text-white flex justify-center items-center gap-1 cursor-pointer">Playground <GoArrowUpRight /></Link>
              </div>
              
          </div>

        </div>

      </div>
    </>
  )
}

export default LandingPage
