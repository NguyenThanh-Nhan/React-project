// import Header from "../container/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  let Cmp = props.Cmp;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <>
      <Cmp />
    </>
  );
}

export default Protected;
