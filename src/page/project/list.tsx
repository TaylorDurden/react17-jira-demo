export const List = ({ dataSource, users = [] }: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data: any) => (
          <tr key={data.id}>
            <td>{data.name}</td>
            <td>
              {users.find((user: any) => user.id === data.personId)?.name ||
                "暂无"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
