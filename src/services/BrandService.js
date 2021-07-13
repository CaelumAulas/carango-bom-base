import { API_URL } from '../Constants'

const BrandService = {
  create(marca) {
    return fetch(API_URL+'/marcas', {
      method: 'POST',
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  update(marca) {
    return fetch(API_URL+'/marcas/' + marca.id, {
      method: 'PUT',
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch(API_URL+'/marcas/' + id).then(
      (r) => r.json()
    );
  },

  getAll() {
    return fetch(API_URL+'/marcas').then((r) =>
      r.json()
    );
  },

  delete(marca) {
    return fetch(API_URL+'/marcas/' + marca.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default BrandService;
