import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";

type DrawerProps = React.ComponentProps<typeof Drawer>;

interface ProjectModalProps extends DrawerProps {}

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
