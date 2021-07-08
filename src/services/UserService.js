const UserService = {
  create(user) {
    return fetch("https://carango-bom-api.herokuapp.com/usuarios", {
      method: "POST",
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },

  update(user) {
    return fetch("https://carango-bom-api.herokuapp.com/usuarios/" + user.id, {
      method: "PUT",
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },

  getById(id) {
    return fetch("https://carango-bom-api.herokuapp.com/usuarios/" + id).then(
      (r) => r.json()
    );
  },

  getAll() {
    return fetch("https://carango-bom-api.herokuapp.com/usuarios").then((r) =>
      r.json()
    );
  },

  delete(user) {
    return fetch("https://carango-bom-api.herokuapp.com/usuarios/" + user.id, {
      method: "DELETE",
    }).then((r) => r.json());
  },
};

export default UserService;
