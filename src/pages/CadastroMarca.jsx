import { Button, TextField, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErros from '../hooks/useErros';
import BrandService from '../services/BrandService';

const useStyles = makeStyles(() => ({
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
}));

function CadastroMarca() {
  const [marca, setMarca] = useState('');
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  const validacoes = {
    marca: (dado) => {
      if (dado && dado.length >= 3) {
        return { valido: true };
      } else {
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' };
      }
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      BrandService.getById(id).then((m) => setMarca(m.nome));
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          if (id) {
            BrandService.update({ id, nome: marca }).then((res) => {
              history.goBack();
            });
          } else {
            BrandService.create({ nome: marca }).then((res) => {
              setMarca('');
              history.goBack();
            });
          }
        }
      }}
    >
      <TextField
        value={marca}
        onChange={(evt) => setMarca(evt.target.value)}
        onBlur={validarCampos}
        helperText={erros.marca.texto}
        error={!erros.marca.valido}
        name="marca"
        id="marca"
        label="Marca"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <div className={classes.actionsToolbar}>
        <Button
          variant="contained"
          className={classes.actions}
          color="primary"
          type="submit"
          disabled={!possoEnviar()}
        >
          {id ? 'Alterar' : 'Cadastrar'}
        </Button>

        <Button
          variant="contained"
          className={classes.actions}
          color="secondary"
          onClick={cancelar}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default CadastroMarca;
