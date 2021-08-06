import React from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const nowDate = new Date();
  const startRegister = new Date("2021-08-10 09:00:00");

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Content className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-6vh font-bold m-0" style={{ color: "#5081d3" }}>
            Vaccine
            <span style={{ color: "#ff0000ab" }}> Covid-19</span>
          </h1>
          {nowDate >= startRegister ? (
            <Link to="/register">
              <Button className="m-5" shape="round" type="primary" size="large">
                ลงทะเบียน
              </Button>
            </Link>
          ) : (
            <p className="text-center text-2vh ">
              สามารถเข้ามาลงทะเบียนได้ในวันที่ 10 สิงหาคม 2564
            </p>
          )}
        </div>
      </Layout.Content>
      <Layout.Footer className="text-center">
        <p>By Madsoffee Yako</p>
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
