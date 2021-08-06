import { Button, Col, Input, Row } from "antd";
import { UserSelect } from "components/user-select";
import { useSetUrlSearchParam } from "util/url";
import { TaskTypeSelect } from "./task-type-select";
import { useTaskSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row style={{ marginBottom: 20 }} gutter={16}>
      <Col>
        <Input
          style={{ width: "20rem" }}
          placeholder={"任务名"}
          value={searchParams.name}
          onChange={(evt) => setSearchParams({ name: evt.target.value })}
        />
      </Col>
      <Col>
        <UserSelect
          defaultOptionName={"经办人"}
          value={searchParams.processorId}
          onChange={(value) => setSearchParams({ processorId: value })}
        />
      </Col>
      <Col>
        <TaskTypeSelect
          defaultOptionName={"类型"}
          value={searchParams.typeId}
          onChange={(value) => setSearchParams({ typeId: value })}
        />
      </Col>
      <Col>
        <Button onClick={reset}>清除筛选器</Button>
      </Col>
    </Row>
  );
};
