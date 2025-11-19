import { useEffect, useState } from "react";  

type SessionInfo = {
    isLoggedIn: boolean;
    name: string | null;
    role: string | null;
};

export function useSession() {
    const [role, setRole] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/auth/session", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data: SessionInfo = await response.json();
                    setIsLoggedIn(data.isLoggedIn);
                    setName(data.name);
                    setRole(data.role);
                } else {
                    setIsLoggedIn(false);
                    setName(null);
                    setRole(null);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                setIsLoggedIn(false);
                setName(null);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return { isLoggedIn, name, role, loading };
}