import { useIsAuthenticated } from "@azure/msal-react";

export default function RedirectPage() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
            <p>{isAuthenticated ?
                "Authenticated" : "Not Authenticated"}</p>
        </>
    )
}