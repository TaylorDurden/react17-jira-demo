import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { CleanObject, useDebounce, useMount } from "../../util";
import { useHttp } from "util/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 500);
  const httpClient = useHttp();

  useEffect(() => {
    httpClient("projects", { data: CleanObject(debouncedParam) }).then(
      setProjects
    );
  }, [debouncedParam]);

  useMount(() => {
    httpClient("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List projects={projects} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
