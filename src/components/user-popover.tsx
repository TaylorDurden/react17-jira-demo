import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjectModal } from "page/project-list/util";
import React from "react";
import { useProjects } from "util/projects";
import { useUsers } from "util/users";
import { ButtonNoPadding } from "./lib";

export const UserPopover = () => {
  const { data: users } = useUsers();
  // const pinnnedProjects = users?.filter((user) => project.pin);
  const { open } = useProjectModal();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
