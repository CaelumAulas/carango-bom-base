import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import {
  Grid,
  Select,
  InputLabel,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/VehicleService';

function VehicleRegister() {
  const { id } = useParams();
  const [brandId, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [brands, setBrands] = useState([]);

  const renderMenuItem = (brand) => {
    return (
      <option key={brand.id} value={brand.id}>
        {brand.nome}
      </option>
    );
  };

  async function fetchBrands() {
    await BrandService.getAll().then((response) => setBrands(response));
  }

  const fetchVehicleById = useCallback(async () => {
    if (id) {
      await VehicleService.getById(id).then((response) => {
        setBrand(response.brand.id);
        setModel(response.model);
        setPrice(response.price);
        setYear(response.year);
      });
    }
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    const vehicle = { brandId, model, price, year };
    try {
      if (id) {
        await VehicleService.update({ ...vehicle, id });
      } else {
        await VehicleService.create(vehicle);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => fetchBrands(), []);

  useEffect(() => {
    fetchVehicleById();
  }, [fetchVehicleById]);

  return (
    <Grid container spacing={2}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <InputLabel id="brand-select">Marca</InputLabel>
          <Select
            native={true}
            label="Marca"
            id="brand-select"
            data-testid="select"
            value={brandId}
            onChange={(event) => setBrand(event.target.value)}
          >
            {brands.map(renderMenuItem)}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={model}
            onChange={(evt) => setModel(evt.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            id="model"
            label="Modelo"
            name="model"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={year}
            onChange={(evt) => setYear(evt.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            id="year"
            label="Ano"
            name="year"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={price}
            onChange={(evt) => setPrice(evt.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            id="price"
            label="Valor"
            name="price"
            autoFocus
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              cadastrar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="button" fullWidth variant="contained" color="primary">
              cancelar
            </Button>
          </Grid>
          {error ? <FormHelperText error>{error} </FormHelperText> : null}
        </Grid>
      </form>
    </Grid>
  );
}

export default VehicleRegister;
