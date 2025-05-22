const protectedRoutes = async (route) => {
    try {
        const response = await fetch(route, {
            method: 'GET',
            credentials: 'include'
        });

        console.log('Status:', response.status);
        
        if (!response.ok) {
            return false;
        } else{
            const data = await response.json();
            console.log(data.userId);
            return true;
        }

        
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
}

export default protectedRoutes;