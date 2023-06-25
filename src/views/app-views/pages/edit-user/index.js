import React, { useEffect } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { connect } from "react-redux";
import { fetchUser } from "store/slices/usersSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditUser({ fetchUser, user, loading, showMessage, message }) {
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(id);
  }, []);

  //sending imitation
  const onFinish = () => {
    navigate("/app/pages/user-list", { replace: true });
  };

  if (showMessage) return <>{message}</>;
  if (loading) return <>Loading...</>;

  return (
    <>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          initialValues={{
            name: user.name,
            email: user.email,
            username: user.username,
            phoneNumber: user.phone,
            website: user.website,
            address: user.address?.street,
            city: user.address?.city,
            postcode: user.address?.zipcode,
          }}
          onFinish={onFinish}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Website" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label="Address" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="City" name="city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Post code" name="postcode">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
const mapStateToProps = ({ users }) => {
  console.log(users, "auth");
  const { loading, message, showMessage, user } = users;
  return { loading, message, showMessage, user };
};

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
