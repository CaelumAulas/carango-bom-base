import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import { Button, Fab, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '100px',
  },
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
}));

export default function Tabela({
  colunas,
  linhas,
  rowSelectedFunction,
  selectedItem,
  updateItem,
  deleteItem,
  addItem,
}) {
  const classes = useStyles();

  return (
    <>
      <DataGrid
        rows={linhas}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          rowSelectedFunction(gridSelection.data)
        }
      />
      <div className={classes.actionsToolbar}>
        <Button
          data-testid="btn-cadastrar"
          className={classes.actions}
          variant="contained"
          color="primary"
          onClick={addItem}
        >
          Incluir
        </Button>
        <Button
          data-testid="btn-excluir"
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!selectedItem}
          onClick={deleteItem}
        >
          Excluir
        </Button>
        <Button
          data-testid="btn-alterar"
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!selectedItem}
          onClick={updateItem}
        >
          Alterar
        </Button>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={addItem}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
