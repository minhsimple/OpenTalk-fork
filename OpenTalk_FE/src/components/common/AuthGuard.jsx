import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../../helper/auth';

export default function AuthGuard({ children }) {
    return getAccessToken() ? children : <Navigate to="/login" />;
}