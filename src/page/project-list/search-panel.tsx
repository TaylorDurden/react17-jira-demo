import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "types/project";
import { User } from "types/user";

const FormItem = Form.Item;
interface SearchPanelProps {
  users: User[];
  // param: {
  //   name: string;
  //   personId: string;
  // };
  param: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        ></UserSelect>
        {/* <Select
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
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </FormItem>
    </Form>
  );
};
