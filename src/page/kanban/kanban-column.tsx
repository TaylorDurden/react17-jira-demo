import { Kanban } from "types/kanban";
import { useTasks, useTaskTypes } from "util/task";
import { useTaskModal, useTaskSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./create-task";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  const { startEdit } = useTaskModal();
  return (
    <KanbanColumnContainer>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card
            onClick={() => startEdit(task.id)}
            key={task.id}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
          >
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </KanbanColumnContainer>
  );
};

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img alt={""} src={name === "task" ? taskIcon : bugIcon} />;
};

export const KanbanColumnContainer = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(209, 220, 221);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
