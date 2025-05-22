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

    return (
        <h1>Main Page</h1>
    );
};

export default Home;



