import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [destLocation, setDestLocation] = useState(null);
  // const apiUrl = "https://webride-server.onrender.com";
  const apiUrl = "http://10.34.238.201:8001";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToast = (message, type) => {
    // toast(message);
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        toast(message);
    }
  };
  const fetchUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`${apiUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading();
    fetchUser();
  }, []);
  return (
    <MapContext.Provider
      value={{
        destLocation,
        setDestLocation,
        apiUrl,
        user,
        setUser,
        loading,
        setLoading,
        addToast,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
