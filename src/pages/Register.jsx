import React from "react";
import { Layout } from "antd";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <Layout style={window.innerWidth < 768 ? {} : { height: "100vh" }}>
      <Layout.Header
        className="text-center text-2xl p-5 text-white"
        style={{ background: "#145287" }}
      >
        <h1 className="text-white">ลงทะเบียนฉีด Vaccine Covid-19</h1>
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
