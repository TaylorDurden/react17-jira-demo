import { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "../../util";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "util/projects";
import { useUsers } from "util/users";
import { useUrlQueryParam } from "util/url";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";

// TODO: Id改成number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export const ProjectListScreen = (props: {
  setProjectModalOpen: (visible: boolean) => void;
}) => {
  // 基本类型，可以放在依赖里；组件状态，可以放在依赖里；非组件状态的对象，绝不可以放到依赖里；
  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // setParam({name: '123'})
  const [param, setParam] = useProjectSearchParams();
  const {
    loading,
    error,
    data: projects,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  console.log(useUrlQueryParam(["name"]));

  return (
    <Container>
      <Row spaceBetween={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        dataSource={projects || []}
        loading={loading}
        users={users || []}
        refresh={retry}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
