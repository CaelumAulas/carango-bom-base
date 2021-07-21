import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserService from '../../services/UserService';

import Table from '../../components/Table/Table';

const columns = [{ field: 'username', headerName: 'Nome', width: 200 }];

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const history = useHistory();

  function create() {
    history.push('/cadastro-usuario');
  }

  function update() {
    history.push('/alteracao-usuario/' + selectedUser.id);
  }

  function deleteUser() {
    UserService.delete(selectedUser);
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(null);
  }

  async function fetchUsers() {
    const users = await UserService.getAll();
    setUsers(users);
  }

  useEffect(() => fetchUsers(), []);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Table
        rows={users}
        columns={columns}
        addItem={create}
        updateItem={update}
        deleteItem={deleteUser}
        selectedItem={selectedUser}
        rowSelectedFunction={setSelectedUser}
      />
    </div>
  );
}
