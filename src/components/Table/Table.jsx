import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import './Table.css';

export default function Table({
  columns,
  rows,
  rowSelectedFunction,
  selectedItem,
  updateItem,
  deleteItem,
  addItem,
}) {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowSelected={(gridSelection) =>
          rowSelectedFunction(gridSelection.data)
        }
      />
      <div className="actionsToolbar">
        <Button
          data-testid="btn-cadastrar"
          className="actions"
          variant="contained"
          color="primary"
          onClick={addItem}
        >
          Incluir
        </Button>
        <Button
          data-testid="btn-excluir"
          className="actions"
          variant="contained"
          color="secondary"
          disabled={!selectedItem}
          onClick={deleteItem}
        >
          Excluir
        </Button>
        <Button
          data-testid="btn-alterar"
          className="actions"
          variant="contained"
          color="primary"
          disabled={!selectedItem}
          onClick={updateItem}
        >
          Alterar
        </Button>
      </div>
    </>
  );
}
