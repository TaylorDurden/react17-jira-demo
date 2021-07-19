import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "util/use-async";

const FormItem = Form.Item;

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { user, register } = useAuth();
  const { run, loading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async ({
    confirmPassword,
    ...values
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (confirmPassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(register(values));
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
        <Input type="text" placeholder="用户名" id={"username"} />
      </FormItem>
      <FormItem
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder="密码" id={"password"} />
      </FormItem>
      <FormItem
        name={"confirmPassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type="password" placeholder="确认密码" id={"confirmPassword"} />
      </FormItem>
      <FormItem>
        <LongButton loading={loading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </FormItem>
    </Form>
  );
};
