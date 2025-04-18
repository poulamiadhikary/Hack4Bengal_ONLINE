import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { FaEye, FaTiktok } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'sonner';
import axios from 'axios';

function Settings() {

    const [change, setChange] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    const changePassword = async () => {
        if (!currentPassword || !newPassword) {
            toast.error("Both fields are required");
            return;
        }

        if(newPassword.length < 8){
            toast.error("New password must be 8 characters or long");
            return;
        }

        try {
            const res = await axios.put(`http://localhost:5000/change`, {
                id ,currentPassword, password: newPassword
            });

            if(res.data.success){
                toast.success("Password changed");
            }
            //console.log(res.data);

        } catch (err) {
            console.log(err.message);
            toast.error(err.response?.data?.message);
        }
    }

    const updateProfile = async () => {
        if (!name || !email) {
            toast.error("Empty fields are not allowed");
            return;
        }

        try {
            const res = await axios.put(`http://localhost:5000/update`, {
                email, name, id
            });

            if (res.data.success) {
                toast.success("Profile Updated");
            }
            //console.log(res.data);

        } catch (err) {
            console.log(err.message);
            toast.error(err.response?.data?.message);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token');

            try {
                const res = await axios.get(`http://localhost:5000/get?token=${token}`);
                //console.log(res.data);
                setName(res.data.data.name);
                setEmail(res.data.data.email);
                setId(res.data.data._id);
            } catch (err) {
                console.log(err.message);
                toast.error(err.response?.data?.message);
            }
        }

        getUser();
    }, []);


    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-start items-center px-5 pb-10">
                <Navbar />
                <Toaster richColors position="top-center" />

                <h1 className={`text-center w-full mt-5 mb-2 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Settings</h1>

                <div className="w-full h-auto md:w-[60%] lg:w-[40%] py-4 px-3 rounded-md lg:rounded-lg bg-gray-200 mt-4 flex flex-col justify-start items-center gap-4">
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-2 py-2 rounded-md bg-white outline-none" placeholder="Update name" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-2 py-2 rounded-md bg-white outline-none" placeholder="Update email" />
                    <p className="w-full py-2 cursor-pointer hover:opacity-75 duration-200 ease-in-out text-center bg-blue-500 text-white rounded-md" onClick={updateProfile}>Update Profile</p>
                </div>

                <div className={` w-full  md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center gap-2 bg-gray-200 py-3 px-3 mt-5 rounded-md relative`}>
                    <div className="w-full flex justify-center items-center relative">
                        <input onChange={(e) => setCurrentPassword(e.target.value)} type={visible ? "text" : "password"} className="w-full outline-blue-400 duration-200 ease-in-out pr-10 bg-white px-3 py-2 rounded-md" placeholder="Enter current password" />
                        <span onClick={() => setVisible(!visible)} className="opacity-75 absolute top-3 right-5 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                    <div className="w-full flex justify-center items-center relative">
                        <input onChange={(e) => setNewPassword(e.target.value)} type={visible ? "text" : "password"} className="w-full outline-blue-400 duration-200 ease-in-out pr-10 bg-white px-3 py-2 rounded-md" placeholder="Enter new password" />
                        <span onClick={() => setVisible(!visible)} className="opacity-75 absolute top-3 right-5 cursor-pointer">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                    <p onClick={changePassword} className="w-full mt-3 cursor-pointer py-2 text-center bg-blue-500 duration-200 hover:opacity-75 ease-in-out text-white rounded-md">Change Password</p>
                </div>

                <p onClick={logout} className="w-auto px-10 font-bold mt-5 py-2 hover:opacity-75 text-center text-red-600 rounded-md flex justify-center items-center gap-2 cursor-pointer"><CiLogout /> Logout</p>


            </div>
        </>
    )
}

export default Settings
