export const SearchPanel = ({ users = [], param, setParam }: any) => {
  return (
    <form>
      <div>
        {/* setParam(Object.assign({}, param, {name: e.target.value})) */}
        <input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(e) =>
            setParam({
              ...param,
              personId: e.target.value,
            })
          }
        >
          <option value="">请选择负责人</option>
          {users.map((user: any) => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};
