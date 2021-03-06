import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Form, Button, Input } from "antd";

const FormItem = Form.Item;

interface Base {
  id: number;
}

interface Advance extends Base {
  name: string;
}

export const LoginScreen = () => {
  const { user, login } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <Form onFinish={handleSubmit}>
      <FormItem
        label="用户名"
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        {/* <label htmlFor="username">用户名</label> */}
        <Input type="text" id={"username"} />
      </FormItem>
      <FormItem
        label="密码"
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        {/* <label htmlFor="password">密码</label> */}
        <Input type="password" id={"password"} />
      </FormItem>
      <FormItem>
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </FormItem>
    </Form>
  );
};
