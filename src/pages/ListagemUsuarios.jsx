import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UsuarioService from '../services/UsuarioService';

import Tabela from '../components/Tabela';

const colunas = [{ field: 'nome', headerName: 'Usuario', width: 200 }];

function ListagemUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState();
  const history = useHistory();

  function cadastrar() {
    history.push('/cadastro-usuario');
  }

  function alterar() {
    history.push('/alteracao-usuario/' + usuarioSelecionado.id);
  }

  function excluir() {
    UsuarioService.excluir(usuarioSelecionado).then(() => {
      setUsuarioSelecionado(null);
      carregarUsuarios();
    });
  }

  useEffect(() => carregarUsuarios(), []);

  function carregarUsuarios() {
    UsuarioService.listar().then((dados) => setUsuarios(dados));
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Tabela
        linhas={usuarios}
        colunas={colunas}
        addItem={cadastrar}
        updateItem={alterar}
        deleteItem={excluir}
        selectedItem={usuarioSelecionado}
        rowSelectedFunction={setUsuarioSelecionado}
      />
    </div>
  );
}

export default ListagemUsuarios;
