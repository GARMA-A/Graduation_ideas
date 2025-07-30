import { Box } from "@mui/material";
import LoginForm from "../features/Login/LoginForm";
import React from "react";



export default function LoginPage() {
  const [type, setType] = React.useState<"login" | "register">("login");

  const toggleMode = () => {
    setType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  return <>
    <Box component="div" display="flex" justifyContent="center" alignItems="center" height="100vh" >

      <LoginForm type={type} toggleMode={toggleMode} />

    </Box >

  </>

}
