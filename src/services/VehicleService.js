const VehicleService = {
  create(marca) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos', {
      method: 'POST',
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  update(marca) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos/' + marca.id, {
      method: 'PUT',
      body: JSON.stringify(marca),
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
  delete(marca) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos/' + marca.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default VehicleService;
