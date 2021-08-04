import React from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";

const Register = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const GenderSelector = (
    <Form.Item name="name_prefix" noStyle>
      <Select
        placeholder="คำนำหน้า"
        style={{
          width: 100,
        }}
        rules={[
          {
            required: true,
            message: "กรุณาเลือกคำนำหน้าชื่อ!",
            whitespace: true,
          },
        ]}
      >
        <Select.Option value="นาย">นาย</Select.Option>
        <Select.Option value="นาง">นาง</Select.Option>
        <Select.Option value="นางสาว">นางสาว</Select.Option>
      </Select>
    </Form.Item>
  );
        console.log(window.innerWidth);
  return (
    <Layout style={window.innerWidth < 768 ? {} : { height: "100vh" }}>
      <Layout.Header
        className="text-center text-2xl p-5 text-white"
        style={{ background: "#145287" }}
      >
        <h1 className="text-white">ลงทะเบียนฉีด Vaccine Covid-19</h1>
      </Layout.Header>
      <Layout.Content className="bg-white">
        <Form
          style={
            window.innerWidth < 1200
              ? { padding: "20px 20%" }
              : { padding: "20px 30%" }
          }
          name="nest-messages"
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="mb-0"
                name="first_name"
                label="ชื่อ (ภาษาไทย)"
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ชื่อของคุณ!",
                    whitespace: true,
                  },
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
                        if (!isNaN(value) || !getFieldValue("id_card")) {
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
                <Input maxLength="13" />
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
                name="phone_number"
                label="เบอร์โทร"
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่เบอร์โทรให้ครบถ้วน!",
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value.length === 10) {
                        if (!isNaN(value) || !getFieldValue("phone_number")) {
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
                <Input maxLength="10" />
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
                name="vaccination_date"
                label="วันที่ขอนัดฉีดวัคซีน"
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
          </Row>
          <Form.Item className="text-center p-5">
            <Button shape="round" type="primary" htmlType="submit" size="large">
              ลงทะเบียน
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
      <Layout.Footer className="text-center">
        <p>By Madsoffee Yako</p>
      </Layout.Footer>
    </Layout>
  );
};

export default Register;
