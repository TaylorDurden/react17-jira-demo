import styled from "@emotion/styled";
import { Button, Drawer, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "util/projects";
import { useProjectModal, useProjectsQueryKey } from "./util";

type DrawerProps = React.ComponentProps<typeof Drawer>;

interface ProjectModalProps extends DrawerProps {}

const FormItem = Form.Item;

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProjectDetail, isLoading } =
    useProjectModal();
  const title = editingProjectDetail ? "编辑项目" : "创建项目";
  const useMutateProject = editingProjectDetail
    ? useEditProject
    : useAddProject;
  const queryKey = useProjectsQueryKey();
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(queryKey);
  const [form] = useForm();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProjectDetail, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProjectDetail);
  }, [editingProjectDetail, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <FormItem
                label="项目名称"
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"}></Input>
              </FormItem>
              <FormItem
                label="部门名称"
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名称"}></Input>
              </FormItem>
              <FormItem
                label="负责人"
                name={"personId"}
                rules={[{ required: true, message: "请输入负责人" }]}
              >
                <UserSelect defaultOptionName="负责人"></UserSelect>
              </FormItem>
              <FormItem style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType={"submit"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </FormItem>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
