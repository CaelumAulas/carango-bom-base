import { API_URL } from '../Constants';

const UserService = {
  create(user) {
    return fetch(API_URL + '/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },

  update(user) {
    return fetch(API_URL + '/users/' + user.id, {
      method: 'PUT',
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch(API_URL + '/users/' + id).then((r) => r.json());
  },

  getAll() {
    return fetch(API_URL + '/users').then((r) => r.json());
  },

  delete(user) {
    return fetch(API_URL + '/users/' + user.id, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default UserService;
