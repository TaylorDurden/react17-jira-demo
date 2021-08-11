import { Kanban } from "types/kanban";
import { useTasks, useTaskTypes } from "util/task";
import { useKanbanQueryKey, useTaskModal, useTaskSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "./mark";
import { useDeleteKanban } from "util/kanban";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "./drag-drop";

const MenuItem = Menu.Item;

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      key={task.id}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <KanbanColumnContainer {...props} ref={ref}>
      <Row spaceBetween={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>

      <TaskContainer>
        <Drop
          type={"ROW"}
          direction={"vertical"}
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: "1rem" }}>
            {tasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                index={taskIndex}
                draggableId={"task" + task.id}
              >
                {/* div包括子元素，可以传递ref到div上 */}
                <div>
                  <TaskCard key={task.id} task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </KanbanColumnContainer>
  );
});

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img alt={"TaskTypeIcon"} src={name === "task" ? taskIcon : bugIcon} />
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey());
  const confirmDelete = () => {
    Modal.confirm({
      title: "确定删除？",
      okText: "删除",
      cancelText: "取消",
      onOk() {
        deleteKanban({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <MenuItem key={"deleteKanban"}>
        <Button type={"link"} onClick={confirmDelete}>
          删除
        </Button>
      </MenuItem>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
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
