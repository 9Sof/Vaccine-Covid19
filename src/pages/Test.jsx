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

const Test = () => {
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

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header className="text-center" style={{ background: "#f0f2f5" }}>
        <h1 style={{ color: "black" }}>TEST Vaccine Covid-19</h1>
      </Layout.Header>
      <Layout.Content>
        <Form
            style={window.innerWidth < 768 ? { padding: "20px 20%" } : { padding: "20px 35%" }}
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
                  () => ({
                    validator(_, value) {
                      if (!value || value.length === 13) {
                        return Promise.resolve();
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
                  () => ({
                    validator(_, value) {
                      if (!value || value.length === 10) {
                        return Promise.resolve();
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
            <Button type="primary" htmlType="submit">
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

export default Test;
