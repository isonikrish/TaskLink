import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../contexts/MainContext';
function ProtectRoute({ children }) {
    const navigate = useNavigate()
    const { isUserThere } = useMainContext();

    return isUserThere ? children : navigate('/');
}

export default ProtectRoute