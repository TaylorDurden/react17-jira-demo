import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "util/use-async";

const FormItem = Form.Item;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, loading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error) {
      onError(error);
    }
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
        <LongButton loading={loading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </FormItem>
    </Form>
  );
};
