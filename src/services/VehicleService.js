import { API_URL } from '../Constants';

const VehicleService = {
  create(vehicle) {
    return fetch(API_URL + '/veiculos', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    }).then((r) => r.json());
  },

  update(vehicle) {
    return fetch(API_URL + '/veiculos/' + vehicle.id, {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch(API_URL + '/veiculos/' + id).then((r) => r.json());
  },
  getAll() {
    return fetch(API_URL + '/veiculos').then((r) => r.json());
  },
  delete(vehicle) {
    return fetch(API_URL + '/veiculos/' + vehicle.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default VehicleService;
