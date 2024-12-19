import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from '../features/userSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
     
      const isTokenValid = true; 

      if (isTokenValid) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        dispatch(setUser(storedUser)); 
      } else {
        dispatch(logoutUser()); 
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [token, user, dispatch]);

  return user && token;
};

export default useAuthCheck;
