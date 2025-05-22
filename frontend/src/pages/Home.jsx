import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import protectedRoutes from "../components/protectedRoutes";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await protectedRoutes('/home');
            console.log(isAuth)
            if (!isAuth) {
                navigate('/login');
            }   
        };
        checkAuth();
    }, [navigate]);

    const handleLoggingOut = async () => {
        try{
            const response = await fetch('/logout', {
                method: 'POST', 
                credentials: 'include'
            })
            navigate('/login')
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Main Page</h1>
            <button onClick={handleLoggingOut}>Log out</button>
        </div>
    );
};

export default Home;



