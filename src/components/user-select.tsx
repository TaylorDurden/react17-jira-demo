import { useUsers } from "util/users";
import { IdSelect } from "./id-select";

type UserSelectProps = React.ComponentProps<typeof IdSelect>;

export const UserSelect = (props: UserSelectProps) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
