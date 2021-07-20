import { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "../../util";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "util/projects";
import { useUsers } from "util/users";

// TODO: Id改成number类型
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  const { loading, error, data: projects } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        dataSource={projects || []}
        loading={loading}
        users={users || []}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
