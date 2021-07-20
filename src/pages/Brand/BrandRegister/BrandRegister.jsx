import { Button, TextField, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErros from '../../../hooks/useErros';
import BrandService from '../../../services/BrandService';

const useStyles = makeStyles(() => ({
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
}));

function BrandRegister() {
  const [brand, setBrand] = useState('');
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  const validacoes = {
    brand: (dado) => {
      if (dado && dado.length >= 3) {
        return { valido: true };
      } else {
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' };
      }
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.push('/marcas');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (possoEnviar()) {
      if (id) {
        await BrandService.update({ id, nome: brand });
        history.push('/marcas');
      } else {
        await BrandService.create({ nome: brand });
        history.push('/marcas');
      }
    }
  }

  useEffect(() => {
    if (id) {
      BrandService.getById(id).then((response) => setBrand(response.nome));
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={brand}
        onChange={(evt) => setBrand(evt.target.value)}
        onBlur={validarCampos}
        helperText={erros.brand.texto}
        error={!erros.brand.valido}
        name="brand"
        id="brand"
        label="Marca"
        type="text"
        variant="outlined"
        fullWidth
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

export default BrandRegister;
