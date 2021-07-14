import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import VehicleService from '../../../services/VehicleService';

import Table from '../../../components/Table/Table';

const columns = [
  { field: 'modelo', headerName: 'Modelo', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  { field: 'nome-marca', headerName: 'Marca', width: 200 },
  { field: 'valor', headerName: 'Valor', width: 200 },
];

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const history = useHistory();

  function create() {
    history.push('/cadastro-veiculo');
  }

  function update() {
    history.push('/alteracao-veiculo/' + selectedVehicle.id);
  }

  function deleteVehicle() {
    VehicleService.delete(selectedVehicle);
    setVehicles(
      vehicles.filter((vehicle) => vehicle.id !== selectedVehicle.id)
    );
    setSelectedVehicle(null);
  }

  useEffect(() => fetchVehicles(), []);

  function fetchVehicles() {
    VehicleService.getAll().then((data) => {
      data = data.map((elem) => {
        return { 'nome-marca': elem.marca.nome, ...elem };
      });
      setVehicles(data);
    });
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Table
        rows={vehicles}
        columns={columns}
        addItem={create}
        updateItem={update}
        deleteItem={deleteVehicle}
        selectedItem={selectedVehicle}
        rowSelectedFunction={setSelectedVehicle}
      />
    </div>
  );
}

export default VehicleList;
