import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAdminSession } from '../services/api';

const SessionChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await checkAdminSession();

        if (!data.isLoggedIn) {
          console.log('Sesión inválida. Redirigiendo al login.');
          navigate('/login-admin');
        }
      } catch (err) {
        console.error('Error al verificar la sesión:', err);
        navigate('/login-admin');
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default SessionChecker;
