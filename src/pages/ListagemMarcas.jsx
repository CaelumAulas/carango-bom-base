import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MarcaService from '../services/MarcaService';

import Table from '../components/Table/Table';

const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];

function ListagemMarcas() {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const history = useHistory();

  function cadastrar() {
    history.push('/cadastro-marca');
  }

  function alterar() {
    history.push('/alteracao-marca/' + marcaSelecionada.id);
  }

  function excluir() {
    MarcaService.excluir(marcaSelecionada).then(() => {
      setMarcaSelecionada(null);
      carregarMarcas();
    });
  }

  // TODO: Avaliar remover disable na próxima linha
  // eslint-disable-next-line
  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    MarcaService.listar().then((dados) => setMarcas(dados));
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Table
        linhas={marcas}
        colunas={colunas}
        addItem={cadastrar}
        updateItem={alterar}
        deleteItem={excluir}
        selectedItem={marcaSelecionada}
        rowSelectedFunction={setMarcaSelecionada}
      />
    </div>
  );
}

export default ListagemMarcas;
