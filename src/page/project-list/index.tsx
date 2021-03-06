import { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "../../util";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "util/projects";
import { useUsers } from "util/users";
import { useUrlQueryParam } from "util/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, PageContainer, Row } from "components/lib";
import { Profiler } from "components/profiler";

export const ProjectListScreen = () => {
  // 基本类型，可以放在依赖里；组件状态，可以放在依赖里；非组件状态的对象，绝不可以放到依赖里；
  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // setParam({name: '123'})
  const [param, setParam] = useProjectSearchParams();
  const {
    error,
    data: projects,
    isLoading,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  console.log(useUrlQueryParam(["name"]));
  const { open } = useProjectModal();

  return (
    <Profiler id={"项目列表"}>
      <PageContainer>
        <Row spaceBetween={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding onClick={() => open()} type="link">
            创建项目
          </ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List
          dataSource={projects || []}
          loading={isLoading}
          users={users || []}
          // refresh={retry}
        ></List>
      </PageContainer>
    </Profiler>
  );
};

ProjectListScreen.whyDidYouRender = false;

// const Container = styled.div`
//   padding: 3.2rem;
// `;
