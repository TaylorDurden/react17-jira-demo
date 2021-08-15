import { Button, List, Modal, Row } from "antd";
import { PageContainer } from "components/lib";
import dayjs from "dayjs";
import { useProjectById } from "page/kanban/util";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Epic } from "types/epic";
import { useDeleteEpic, useEpics } from "util/epic";
import { useTasks } from "util/task";
import { CreateEpic } from "./create-epic";
import { useEpicQueryKey, useEpicSearchParams } from "./util";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectById();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDelete = (epic: Epic) => {
    Modal.confirm({
      title: "确定删除？",
      okText: "删除",
      cancelText: "取消",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  const metaTitle = (epic: Epic) => (
    <Row style={{ justifyContent: "space-between" }}>
      <span>{epic.name}</span>
      <Button type={"link"} onClick={() => confirmDelete(epic)}>
        删除
      </Button>
    </Row>
  );
  const metaDesc = (epic: Epic) => (
    <div>
      <div>开始时间：{dayjs(epic.startDate).format("YYYY-MM-DD")}</div>
      <div>结束时间：{dayjs(epic.endDate).format("YYYY-MM-DD")}</div>
    </div>
  );
  const ListMeta = (epic: Epic) => (
    <List.Item.Meta title={metaTitle(epic)} description={metaDesc(epic)} />
  );
  return (
    <PageContainer>
      <Row style={{ justifyContent: "space-between" }}>
        <h1>{currentProject?.name} Epic(任务组)</h1>
        <Button onClick={() => setEpicCreateOpen(true)}>创建任务组</Button>
      </Row>

      <List
        style={{ overflowY: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            {ListMeta(epic)}
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      ></List>
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </PageContainer>
  );
};
