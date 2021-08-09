import { Button, Form, Input, Modal } from "antd";
import { FormProps, useForm } from "antd/lib/form/Form";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "util/task";
import { TaskTypeSelect } from "./task-type-select";
import { useTaskModal, useTasksQueryKey } from "./util";

const layout: Partial<FormProps> = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormItem = Form.Item;

export const TaskModal = () => {
  const { editingTask, editingTaskId, close, isLoading } = useTaskModal();
  const [form] = useForm();
  const { mutateAsync: editTask } = useEditTask(useTasksQueryKey());
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = () => {
    editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
    form.resetFields();
  };

  const confirmDelete = () => {
    close();
    Modal.confirm({
      title: "确定删除？",
      okText: "删除",
      cancelText: "取消",
      onOk() {
        deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
    return () => {
      form.resetFields();
    };
  }, [editingTask, form]);

  return (
    <Modal
      forceRender={true}
      visible={Boolean(editingTaskId)}
      onOk={onOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="确认"
      confirmLoading={isLoading}
      title={"编辑任务"}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <FormItem
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </FormItem>
        <FormItem label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName="经办人" />
        </FormItem>
        <FormItem label={"任务类型"} name={"typeId"}>
          <TaskTypeSelect />
        </FormItem>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={confirmDelete}
          style={{ fontSize: "14px" }}
          size={"small"}
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};
