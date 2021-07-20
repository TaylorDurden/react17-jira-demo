import { Form, Select, Input } from "antd";

const FormItem = Form.Item;

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  token: string;
  organization: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({
  users = [],
  param,
  setParam,
}: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <FormItem>
        {/* setParam(Object.assign({}, param, {name: e.target.value})) */}
        <Input
          type="text"
          value={param.name}
          onChange={(e: any) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </FormItem>
      <FormItem>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">请选择负责人</Select.Option>
          {users.map((user: any) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
    </Form>
  );
};
