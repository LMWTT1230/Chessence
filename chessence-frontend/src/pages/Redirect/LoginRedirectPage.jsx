import { useIsAuthenticated,
    useMsal } from "@azure/msal-react";
import { loginRequest } from '../../authConfig';

export default function RedirectPage() {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    
    return (
        <>
            <p>{isAuthenticated ?
                "Authenticated" : "Not Authenticated"}</p>
            {accounts.map((user) => 
                    <p>Hello, {user.name} ({user.username})!</p> )}
            {isAuthenticated ? 
                <button onClick={() => instance.logout()}>Logout</button> :
                <button onClick={() => instance.loginRedirect(loginRequest)}>Login</button>}
        </>
    )
}