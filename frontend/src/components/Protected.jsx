import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({children}) {

    const[verified, setVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        const verifyToken = async () => {
            try {

                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/verify-token?token=${token}`, {
                    withCredentials: true
                });

                if(res.status === 200){
                    setVerified(true);
                }
            } catch (err) {
                setVerified(false);
                navigate('/auth');
                localStorage.removeItem('token');
                console.log(err.message);
            }
        }

        verifyToken();
    }, []);

  return <>{children}</>
}

export default Protected
