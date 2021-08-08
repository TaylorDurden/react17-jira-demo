import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "util/kanban";
import { KanbanColumnContainer } from "./kanban-column";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());

  const submit = () => {
    addKanban({ name, projectId });
    setName("");
  };

  return (
    <KanbanColumnContainer>
      <Input
        size={"large"}
        placeholder="请输入看板名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
      />
    </KanbanColumnContainer>
  );
};
