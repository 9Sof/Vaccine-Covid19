import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ConfirmForm from "../components/ConfirmForm";
import { Layout } from "antd";


const USERS_API = "http://localhost:8000/users";

const Confirmation = () => {
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});
  const getUser = async () => {
    await axios
      .get(`${USERS_API}/${params.id}`)
      .then((response) => {
        // handle success
        if (response.data.status === "success") {
          setUser(response.data.user);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        // handle error
        history.push("/");
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout style={window.innerWidth < 768 ? {} : { height: "100vh" }}>
      <Layout.Header
        className="text-center text-2xl p-5 text-white"
        style={{ background: "#145287" }}
      >
        <h1 className="text-white">Vaccine Covid-19</h1>
      </Layout.Header>
      <Layout.Content className="bg-white">
        <ConfirmForm user={user} />
      </Layout.Content>
      <Layout.Footer className="text-center">
        <p>By Madsoffee Yako</p>
      </Layout.Footer>
    </Layout>
  );
};

export default Confirmation;
