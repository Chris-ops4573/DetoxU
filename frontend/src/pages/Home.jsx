import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import protectedRoutes from "../components/protectedRoutes";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await protectedRoutes('/home');
            console.log(isAuth)
            if (!isAuth) {
                navigate('/login');
            } else{
                const response = await fetch('/home', {
                    method: 'GET', 
                    credentials: 'include'
                })
                const data = await response.json()
                console.log(data)
                setUser(data.user.username)
            }
        };
        checkAuth();
    }, [navigate, user]);

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
            {user ? <p>Welcome {user}</p> : <p>whyyy</p>}
            <button onClick={handleLoggingOut}>Log out</button>
        </div>
    );
};

export default Home;



