import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Modal,
  notification,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const USERS_API = "http://localhost:8000/users";

const RegisterForm = () => {
  const history = useHistory();
  const otpRef = useRef(null);
  const [otp, setOTP] = useState("");
  const [checkOTP, setCheckOTP] = useState(false);
  const [OTPmock, setOTPmock] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idCard, setIdCard] = useState("");

  const postOTP = async (phone_number, id_card) => {
    await axios
      .post(`${USERS_API}/otp`, { phone_number, id_card })
      .then((response) => {
        // handle success
        if (response.data.status === "success") {
          setOTPmock(response.data.phoneOTP[phone_number]);
        } else {
          otpRef.current.style.contentVisibility = "hidden";
          notification.error({
            message: "ไม่สำเร็จ!",
            description:
              "หลายเลขประจำตัวบัตรประชาชนหรือเบอร์โทร มีการลงทะเบียนแล้ว",
          });
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const postRegister = async (values) => {
    await axios
      .post(`${USERS_API}/register`, { ...values })
      .then((response) => {
        // handle success
        if (response.data.status === "success") {
          notification.success({
            message: "สำเร็จ!",
            description: "ลงทะเบียนเรียบร้อยแล้ว",
          });
          history.push(`/${response.data.user.id}`);
        }
        if (response.data.status === "date full") {
          notification.error({
            message: "ไม่สำเร็จ!",
            description: `จำนวนการจองฉีดวัคซัน ในวันที่ ${response.data.date} เต็มแล้ว`,
          });
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(OTPmock);
    if (+otp === OTPmock) {
      setCheckOTP(true);
      otpRef.current.style.contentVisibility = "hidden";
    }
  }, [otp, OTPmock]);

  useMemo(() => {
    setOTPmock(null);
    setOTP("");
    setCheckOTP(false);
    if (phoneNumber && idCard) {
      otpRef.current.style.contentVisibility = "hidden";
    }
  }, [phoneNumber, idCard]);

  const onOTP = (phone_number, id_card) => {
    if (phone_number && id_card) {
      postOTP(phone_number, id_card);
      otpRef.current.style.contentVisibility = "auto";
    }
  };

  const onSubmit = (values) => {
    Modal.confirm({
      title: "ลงทะเบียนฉีด Vaccine Covid-19?",
      icon: <ExclamationCircleOutlined />,
      content: "กด ยืนยัน เพื่อทำงานการลงทะเบียน",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk() {
        console.log("ยืนยัน");
        postRegister(values);
      },
      onCancel() {
        console.log("ยกเลิก");
      },
    });
  };

  const onFinish = (values) => {
    !checkOTP ? onOTP(values.phone_number, values.id_card) : onSubmit(values);
  };

  const GenderSelector = (
    <Form.Item name="name_prefix" noStyle>
      <Select
        placeholder="คำนำหน้า"
        style={{
          width: 100,
        }}
      >
        <Select.Option value="นาย">นาย</Select.Option>
        <Select.Option value="นาง">นาง</Select.Option>
        <Select.Option value="นางสาว">นางสาว</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <h1
        style={{ fontSize: "2vh", fontWeight: "bold", margin: "2vh auto" }}
        className="text-center  "
      >
        ลงทะเบียนฉีด Vaccine Covid-19
      </h1>
      <Row>
        <Col span={5}></Col>
        <Col span={14}>
          <Form name="nest-messages" onFinish={onFinish} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  name="first_name"
                  label="ชื่อ (ภาษาไทย)"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาใส่ชื่อให้ครบถ้วนของคุณ!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("name_prefix")) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("กรุณาใส่ชื่อให้ครบถ้วนของคุณ!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input addonBefore={GenderSelector} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  name="last_name"
                  label="นามสกุล (ภาษาไทย)"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาใส่นามสกุลของคุณ!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  name="id_card"
                  label="หลายเลขประจำตัวบัตรประชาชน"
                  rules={[
                    {
                      required: true,
                      message:
                        "กรุณาใส่ข้อมูลหลายเลขประจำตัวบัตรประชาชนให้ครบถ้วน!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || value.length === 13) {
                          if (!isNaN(value)) {
                            return Promise.resolve();
                          }
                        }
                        return Promise.reject(
                          new Error(
                            "กรุณาใส่ข้อมูลหลายเลขประจำตัวบัตรประชาชนให้ครบถ้วน!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    maxLength="13"
                    onChange={(e) => setIdCard(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  name="birthdate"
                  label="วัน เดือน ปีเกิด"
                  rules={[
                    {
                      required: true,
                      type: "object",
                      message: "กรุณาใส่ข้อมูลวันเกิดให้ครบถ้วน!",
                      whitespace: true,
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  name="email"
                  label="อีเมล์"
                  rules={[
                    {
                      type: "email",
                      message: "อีเมล์ไม่ถูกต้อง!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  name="phone_number"
                  label="เบอร์โทร"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาใส่เบอร์โทรให้ครบถ้วน!",
                      whitespace: true,
                    },
                    () => ({
                      validator(_, value) {
                        if (!value || value.length === 10) {
                          if (!isNaN(value)) {
                            return Promise.resolve();
                          }
                        }
                        return Promise.reject(
                          new Error("กรุณาใส่เบอร์โทรให้ครบถ้วน!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    maxLength="10"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Item>
              </Col>
              {checkOTP && (
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="mb-0"
                    name="vaccination_date"
                    label="วันที่ขอนัดฉีด Vaccine Covid-19"
                    rules={[
                      {
                        required: true,
                        type: "object",
                        message: "กรุณาใส่วันที่ขอนัดฉีดวัคซีนให้ครบถ้วน!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <div
              className=" m-auto"
              ref={otpRef}
              style={{ contentVisibility: "hidden", width: "150px" }}
            >
              <Form.Item className="mb-0" label="กรอกหมายเลขรหัส OTP">
                <Input value={otp} onChange={(e) => setOTP(e.target.value)} />
              </Form.Item>
            </div>

            {!checkOTP ? (
              <Form.Item className="text-center p-5">
                <Button
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  รับ OTP
                </Button>
              </Form.Item>
            ) : (
              <Form.Item className="text-center p-5">
                <Button
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  ลงทะเบียน
                </Button>
              </Form.Item>
            )}
          </Form>
        </Col>
        <Col span={5}></Col>
      </Row>
    </div>
  );
};

export default RegisterForm;
