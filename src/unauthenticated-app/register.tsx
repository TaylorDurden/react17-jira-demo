import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Form, Button, Input } from "antd";
import { LongButton } from "unauthenticated-app";

const FormItem = Form.Item;

interface Base {
  id: number;
}

interface Advance extends Base {
  name: string;
}

export const RegisterScreen = () => {
  const { user, register } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <FormItem
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        {/* <label htmlFor="username">用户名</label> */}
        <Input type="text" placeholder="用户名" id={"username"} />
      </FormItem>
      <FormItem
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        {/* <label htmlFor="password">密码</label> */}
        <Input type="password" placeholder="密码" id={"password"} />
      </FormItem>
      <FormItem>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </FormItem>
    </Form>
  );
};
