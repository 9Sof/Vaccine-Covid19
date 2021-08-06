import { Row, Col, Form, Input } from "antd";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import QRCode from "qrcode.react";

const ConfirmForm = ({ user }) => {
  const birthdate = new Date(user.birthdate).toLocaleDateString("en-UK");
  const vaccination_date = new Date(user.vaccination_date).toLocaleDateString(
    "en-UK"
  );

  return (
    <div>
      <h1
        style={{ fontSize: "2vh", fontWeight: "bold", margin: "2vh auto" }}
        className="text-center  "
      >
        ลงทะเบียนฉีด Vaccine Covid-19 เรียบร้อย
      </h1>
      <Row className="pb-10">
        <Col span={6}></Col>
        <Col span={12}>
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0" label="หมายเลขรหัสยืนยันการจอง">
                  <p>{user.id}</p>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mb-0"
                  label="วันที่ขอนัดฉีด Vaccine Covid-19"
                >
                  <Input
                    style={{ color: "rgba(0, 0, 0, 0.6)", width: "120px" }}
                    value={`${vaccination_date} `}
                    disabled
                    suffix={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0 text-black" label="ชื่อ (ภาษาไทย)">
                  <Input
                    value={`${user.name_prefix} ${user.first_name}`}
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0" label="นามสกุล (ภาษาไทย)">
                  <Input
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    value={user.last_name}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0" label="หลายเลขประจำตัวบัตรประชาชน">
                  <Input
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    value={user.id_card}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0" label="วัน เดือน ปีเกิด">
                  <Input
                    style={{ color: "rgba(0, 0, 0, 0.6)", width: "120px" }}
                    value={`${birthdate} `}
                    disabled
                    suffix={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0" label="อีเมล์">
                  <Input
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    value={user.email ? user.email : "ไม่ได้ระบุ"}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item className="mb-0" label="เบอร์โทร">
                  <Input
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    value={user.phone_number}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={24} className="flex justify-center p-5">
                <QRCode
                  value={`หมายเลขรหัสยืนยันการจอง: ${user.id}, ชื่อ (ภาษาไทย): ${user.name_prefix} ${user.first_name} ${user.last_name}, วันที่ขอนัดฉีด Vaccine Covid-19: ${vaccination_date}`}
                />
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default ConfirmForm;
