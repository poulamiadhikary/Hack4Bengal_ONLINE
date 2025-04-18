import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar";

function RoadmapWindow() {

    const location = useLocation();
    const roadmap = location.state;

    console.log(roadmap);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10">
            <Navbar/>

            <div className="w-full flex flex-col justify-start items-center gap-2">
                <h1 className="capitalize mt-2 font-bold text-2xl">{roadmap.title}</h1>
                <h1 className="capitalize text-sm mb-4">Category - {roadmap.category}</h1>

                {roadmap.roadmap.map((road, index)=> {
                    return <p key={index} className="w-full bg-gray-200 rounded-md py-3 px-3 font-bold mb-5">{index+1}. <span className="font-normal capitalize px-3">{road.text}</span></p>
                })}
            </div>
      </div>
    </>
  )
}

export default RoadmapWindow
