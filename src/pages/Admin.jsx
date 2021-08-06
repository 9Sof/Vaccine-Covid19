import React, { useState, useEffect } from "react";
import { Input, DatePicker, Space, Button } from "antd";
import axios from "axios";

const USERS_API = "http://localhost:8000/users";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const getUsers = () => {
    axios
      .get(`${USERS_API}/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        return error;
      });
  };

  const postSearch = () => {
    axios
      .post(`${USERS_API}/searching/`, {
        id: userId || "",
        first_name: firstName || "",
        last_name: lastName || "",
        phone_number: phoneNumber || "",
        startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
        endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
      })
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    console.log("render");
    users && getUsers();
  }, []);

  const onSearch = () => {
    postSearch();
  };
  return (
    <div className="m-5">
      <Space direction="horizontal">
        <Input
          onChange={(e) => setUserId(e.target.value)}
          className="mr-2 mb-2 w-44"
          placeholder="หมายเลขรหัสการจอง"
          allowClear
        />
        <DatePicker.RangePicker
          onChange={(val) => {
            setStartDate((val && val[0]) || "");
            setEndDate((val && val[1]) || "");
          }}
          placeholder={["ตั้งแต่วันที่นัดหมาย", "จนถึงวันที่นัดหมาย"]}
          className="mr-2 mb-2 w-80"
        />
        <Input
          onChange={(e) => setFirstName(e.target.value)}
          className="mr-2 mb-2 w-44"
          placeholder="ชื่อ (ภาษาไทย)"
          allowClear
        />
        <Input
          onChange={(e) => setLastName(e.target.value)}
          className="mr-2 mb-2 w-44"
          placeholder="นามสกุล (ภาษาไทย)"
          allowClear
        />
        <Input
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mr-2 mb-2 w-44"
          placeholder="เบอรโทรศัพท์"
          allowClear
        />

        <Button onClick={onSearch} type="primary" className="mr-2 mb-2">
          ค้นหา
        </Button>
      </Space>
      <div className="mt-3">
        <table
          className="min-w-full divide-y divide-gray-200"
          style={{ border: "0.3px #e5e7eb solid" }}
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                หมายเลขรหัสการจอง
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                วันที่นัดหมาย
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                ชื่อ - นามสกุล
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                รหัสบัตรประชาชน
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                <p>วัน/เดือน/ปีเกิด </p>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                อีเมล์
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 tracking-wider">
                เบอร์โทรศัพท์
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-center divide-y divide-gray-200">
            {users
              .sort(
                (a, b) =>
                  new Date(a.vaccination_date).getTime() -
                  new Date(b.vaccination_date).getTime()
              )
              .map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(user.vaccination_date).toLocaleDateString(
                      "en-UK"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.name_prefix} {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.id_card}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(user.birthdate).toLocaleDateString("en-UK")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {user.phone_number}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
