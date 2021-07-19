import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "../../util";
import { useHttp } from "util/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "util/use-async";
import { useProjects } from "util/projects";
import { useUsers } from "util/users";

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
  // const [projects, setProjects] = useState([]);
  // const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 500);
  const httpClient = useHttp();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  const { loading, error, data: projects } = useProjects(debouncedParam);
  const { data: users } = useUsers();

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
