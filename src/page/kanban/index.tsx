import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "util/index";
import { useKanbans } from "util/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectById } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban");
  const { data: currentProject } = useProjectById();
  const { data: kanbanList } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name} Kanban</h1>
      <ColumnContainer>
        {kanbanList?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
