import styled from "@emotion/styled";
import { Menu } from "antd";
import { EpicScreen } from "page/epic";
import { KanbanScreen } from "page/kanban";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { Link, Route, Routes } from "react-router-dom";

const MenuItem = Menu.Item;

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <MenuItem key="kanban">
            <Link to={"kanban"}>看板</Link>
          </MenuItem>
          <MenuItem key="epic">
            <Link to={"epic"}>任务组</Link>
          </MenuItem>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />}></Route>
          <Route path={"/epic"} element={<EpicScreen />}></Route>
          <Navigate to={window.location.pathname + "/kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr; // 左边16rem，右边自适应
`;
