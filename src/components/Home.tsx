import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { RootState } from "../redux/store";

const Home = () => {
  const dipatch = useDispatch();
  const [message, setMessage] = useState("You are not logged in");
  const auth = useSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");
        setMessage("Hi ${data.first_name} ${data.last_name}");
        dipatch(setAuth(true));
      } catch (e) {
        setMessage("You are not authenticated");
        dipatch(setAuth(false));
      }
    })();
  }, [dipatch]);

  return (
    <div className="container mt-5 text-center">
      <h3>{auth ? message : "You are not authenticated"}</h3>
    </div>
  );
};
export default Home;
