import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps<T, K> {
  projects: T[];
  users: K[];
}

export const List = ({ projects, users = [] }: ListProps<Project, User>) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project: any) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user: any) => user.id === project.personId)?.name ||
                "暂无"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
