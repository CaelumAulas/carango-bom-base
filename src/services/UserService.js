import { API_URL } from '../Constants';

const UserService = {
  create(user) {
    return fetch(API_URL + '/usuarios', {
      method: 'POST',
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },

  update(user) {
    return fetch(API_URL + '/usuarios/' + user.id, {
      method: 'PUT',
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch(API_URL + '/usuarios/' + id).then((r) => r.json());
  },

  getAll() {
    return fetch(API_URL + '/usuarios').then((r) => r.json());
  },

  delete(user) {
    return fetch(API_URL + '/usuarios/' + user.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default UserService;
