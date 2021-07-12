const VehicleService = {
  create(vehicle) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    }).then((r) => r.json());
  },

  update(vehicle) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos/' + vehicle.id, {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos/' + id).then(
      (r) => r.json()
    );
  },
  getAll() {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos').then((r) =>
      r.json()
    );
  },
  delete(vehicle) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos/' + vehicle.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default VehicleService;
