import styled from "@emotion/styled";
import { PageContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "util/index";
import { useKanbans } from "util/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectById } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban");
  const { data: currentProject } = useProjectById();
  const { data: kanbanList } = useKanbans(useKanbanSearchParams());
  return (
    <PageContainer>
      <h1>{currentProject?.name} Kanban</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbanList?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </PageContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
