import { API_URL } from '../Constants';

const BrandService = {
  create(brand) {
    return fetch(API_URL + '/marcas', {
      method: 'POST',
      body: JSON.stringify(brand),
    }).then((r) => r.json());
  },

  update(brand) {
    return fetch(API_URL + '/marcas/' + brand.id, {
      method: 'PUT',
      body: JSON.stringify(brand),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch(API_URL + '/marcas/' + id).then((r) => r.json());
  },

  getAll() {
    return fetch(API_URL + '/marcas').then((r) => r.json());
  },

  delete(brand) {
    return fetch(API_URL + '/marcas/' + brand.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default BrandService;
