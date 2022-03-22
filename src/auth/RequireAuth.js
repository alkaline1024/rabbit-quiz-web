import { useLocation, Outlet, Navigate } from "react-router";
import { useAuth, appAuthProvider } from "./auth";

function RequireAuth() {
    let auth = useAuth();
    let location = useLocation();

    if (appAuthProvider.isAuthenticated === false) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
}

export { RequireAuth };