import React from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Content className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl">Vaccine Covid-19</h1>
          <Link to="/register">
            <Button className="m-5" shape="round" type="primary" size="large">
              ลงทะเบียน
            </Button>
          </Link>
        </div>
      </Layout.Content>
      <Layout.Footer className="text-center">
        <p>By Madsoffee Yako</p>
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
