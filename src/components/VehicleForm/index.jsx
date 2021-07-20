import React, { useEffect, useState } from "react";
import InputText from "../InputText";
import InputNumber from "../InputNumber";
import InputCurrency from "../InputCurrency";
import InputSelect from "../InputSelect";
import { Box, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import useErros from "hooks/useErros";
import { validations, minYear, maxYear } from "./validations";

function VehicleForm({ onSubmit, onCancel, brandOptions, existingVehicle }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2021);
  const [value, setValue] = useState(0);

  const [errors, validateFields, canSubmit] = useErros(validations);

  useEffect(() => {
    if (existingVehicle) {
      setBrand(existingVehicle.brand);
      setModel(existingVehicle.model);
      setYear(existingVehicle.year);
      setValue(existingVehicle.value);
    }
  }, [existingVehicle]);

  const handleSubmit = event => {
    event.preventDefault();
    if (canSubmit()) {
      const vehicle = { brand, model, year, value };
      onSubmit(vehicle);
    }
  };

  return (
    <form name="vehicle-form" onSubmit={handleSubmit}>
      <InputSelect
        value={brand}
        onSelect={setBrand}
        itemsSelect={brandOptions}
        label="Marca"
        id="marca"
        required
      />
      <InputText
        label="Modelo"
        name="modelo"
        id="modelo"
        value={model}
        onChange={setModel}
        fullWidth
        required
        margin="normal"
        error={!errors.modelo.valido}
        helperText={errors.modelo.texto}
        onBlur={validateFields}
      />
      <InputNumber
        label="Ano"
        name="ano"
        id="ano"
        value={year}
        onChange={setYear}
        min={minYear}
        max={maxYear}
        fullWidth
        required
        margin="normal"
        error={!errors.ano.valido}
        helperText={errors.ano.texto}
        onBlur={validateFields}
      />
      <InputCurrency
        label="Valor"
        id="valor"
        value={value}
        onChange={setValue}
        minimum={0}
        currencySymbol="R$"
        fullWidth
        required
        margin="normal"
      />
      <Box paddingTop={1} display="flex" justifyContent="flex-end">
        <Box mr={1}>
          <Button variant="contained" color="primary" type="submit">
            {existingVehicle ? "Salvar" : "Cadastrar"}
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </form>
  );
}

VehicleForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default VehicleForm;