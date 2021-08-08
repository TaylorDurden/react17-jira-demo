import styled from "@emotion/styled";
import { Spin } from "antd";
import { PageContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "util/index";
import { useKanbans } from "util/kanban";
import { useTasks } from "util/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectById,
  useTaskSearchParams,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban");
  const { data: currentProject } = useProjectById();
  const { data: kanbanList, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());
  const isLoading = taskLoading || kanbanLoading;
  return (
    <PageContainer>
      <h1>{currentProject?.name} Kanban</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnContainer>
          {kanbanList?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </PageContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
