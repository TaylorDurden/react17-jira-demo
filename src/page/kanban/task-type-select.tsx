import { IdSelect } from "components/id-select";
import { useTaskTypes } from "util/task";
import { useUsers } from "util/users";

type TaskTypeSelectProps = React.ComponentProps<typeof IdSelect>;

export const TaskTypeSelect = (props: TaskTypeSelectProps) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
