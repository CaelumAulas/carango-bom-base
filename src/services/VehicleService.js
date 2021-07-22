import { API_URL } from '../Constants';

const VehicleService = {
  create(vehicle) {
    return fetch(API_URL + '/vehicle', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    }).then((r) => r.json());
  },

  update(vehicle) {
    return fetch(API_URL + '/vehicle/' + vehicle.id, {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch(API_URL + '/vehicle/' + id).then((r) => r.json());
  },
  getAll() {
    return fetch(API_URL + '/vehicle').then((r) => r.json());
  },
  delete(vehicle) {
    return fetch(API_URL + '/vehicle/' + vehicle.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default VehicleService;
