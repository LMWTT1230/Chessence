import { useIsAuthenticated,
    useMsal } from "@azure/msal-react";
import { loginRequest } from '../../authConfig';
//https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
//https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#sign-a-user-in-using-the-login-apis-provided-by-azuremsal-browser
export default function RedirectPage() {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    
    return (
        <>
            <p>{isAuthenticated ?
                "Authenticated" : "Not Authenticated"}</p>
            {accounts.map((user) => 
                    <p key={user.id}>Hello, {user.name} ({user.username})!</p> )}
            {isAuthenticated ? 
                <button onClick={() => instance.logout()}>Logout</button> :
                <button onClick={() => instance.loginRedirect(loginRequest)}>Login</button>}
        </>
    )
}