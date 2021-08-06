import React from "react";
import { Layout } from "antd";
import RegisterForm from "../components/RegisterForm";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const nowDate = new Date();
  const startRegister = new Date("2021-08-10 09:00:00");
  
  if(nowDate <= startRegister){
    history.push("/");
  }
  
  return (
    <Layout style={window.innerWidth < 768 ? {} : { height: "100vh" }}>
      <Layout.Header
        className="text-center text-2xl p-5 text-white"
        style={{ background: "#145287" }}
      >
        <h1 className="text-white">Vaccine Covid-19</h1>
      </Layout.Header>
      <Layout.Content className="bg-white">
        <RegisterForm />
      </Layout.Content>
      <Layout.Footer className="text-center">
        <p>By Madsoffee Yako</p>
      </Layout.Footer>
    </Layout>
  );
};

export default Register;
