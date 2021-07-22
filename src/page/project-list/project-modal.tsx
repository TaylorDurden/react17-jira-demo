import { Button, Drawer } from "antd";
import React from "react";

type DrawerProps = React.ComponentProps<typeof Drawer>;

interface ProjectModalProps extends DrawerProps {
  onClose: () => void;
}

export const ProjectModal = (props: ProjectModalProps) => {
  return (
    <Drawer onClose={props.onClose} visible={props.visible} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
