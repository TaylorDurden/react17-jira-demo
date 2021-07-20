import { EpicScreen } from "page/epic";
import { KanbanScreen } from "page/kanban";
import React from "react";
import { Navigate } from "react-router";
import { Link, Route, Routes } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        <Route path={"/epic"} element={<EpicScreen />}></Route>
        <Navigate to={window.location.pathname + "/kanban"} />
      </Routes>
    </div>
  );
};
