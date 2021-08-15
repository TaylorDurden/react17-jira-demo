import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useProjectIdInUrl } from "page/kanban/util";
import { useEffect } from "react";
import { useAddEpic } from "util/epic";
import { useEpicQueryKey } from "./util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    form.resetFields();
    props.onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [props.visible, form]);
  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Container>
          <h1>创建任务组</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <FormItem
              label="任务组名称"
              name={"name"}
              rules={[{ required: true, message: "请输入任务组名称" }]}
            >
              <Input placeholder={"请输入任务组名称"}></Input>
            </FormItem>
            <FormItem style={{ textAlign: "right" }}>
              <Button type="primary" htmlType={"submit"} loading={isLoading}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Container>
      )}
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
