import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router"

export default function ProtectedRoute () {
    const [authentication, setAuthentication] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchAuthentication() {
             const url = 'http://localhost:3000/api/users/me';
             try {
                const response = await fetch(url, {credentials: "include"});
                setAuthentication(response.ok);
             } catch {
                setAuthentication(false);
             }
        }
        fetchAuthentication();
    },[])
if(authentication === null) return <p className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">A carregar...</p>
if(authentication === false) return <Navigate to="/login"/>
return <Outlet/>;
}
