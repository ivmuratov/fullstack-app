import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContextProvider"


const AuthRoute = ({ children }) => {

    const { auth } = useAuthContext();

    return auth ? children : <Navigate to={'/login'} />;
}

export default AuthRoute;