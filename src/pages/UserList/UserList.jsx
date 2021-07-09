import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserService from '../../../services/UserService';

import Table from '../../../components/Table/Table';

const columns = [{ field: 'name', headerName: 'Usuario', width: 200 }];

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
    UserService.delete(selectedUser).then(() => {
      setSelectedUser(null);
      fetchUsers();
    });
  }

  useEffect(() => fetchUsers(), []);

  function fetchUsers() {
    UserService.getAll().then((data) => setUsers(data));
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Table
        linhas={users}
        colunas={columns}
        addItem={create}
        updateItem={update}
        deleteItem={deleteUser}
        selectedItem={selectedUser}
        rowSelectedFunction={setSelectedUser}
      />
    </div>
  );
}
