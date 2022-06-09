import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContextProvider";
import { isAdmin } from "./util/authUtil";


const AdminRoute = ({ children }) => {    

    const { auth } = useAuthContext();

    return isAdmin() ? children : !auth ? <Navigate to={'/login'} /> : <Navigate to={'/not-found'} />;
}

export default AdminRoute;