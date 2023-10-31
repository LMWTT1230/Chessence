import { useIsAuthenticated,
    useMsal } from "@azure/msal-react";

export default function RedirectPage() {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    
    return (
        <>
            <p>{isAuthenticated ?
                "Authenticated" : "Not Authenticated"}</p>
            {accounts.map((user) => 
                    <p>Hello, {user.name} ({user.username})!</p> )}
        </>
    )
}