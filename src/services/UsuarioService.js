const UsuarioService = {
    cadastrar(usuarios) {
        return fetch('https://carango-bom-api.herokuapp.com/usuarios', {
          method: 'POST',
          body: JSON.stringify(usuarios)
        }).then(r => r.json());
      },
    
      alterar(usuarios) {
        return fetch('https://carango-bom-api.herokuapp.com/usuarios/' + usuarios.id, {
          method: 'PUT',
          body: JSON.stringify(usuarios)
        }).then(r => r.json());
      },
    
      consultar(id) {
        return fetch('https://carango-bom-api.herokuapp.com/usuarios/' + id).then(r => r.json());
      },
    
      listar() {
        return fetch('https://carango-bom-api.herokuapp.com/usuarios').then(r => r.json());
      },
    
      excluir(usuarios) {
        return fetch('https://carango-bom-api.herokuapp.com/usuarios/' + usuarios.id, {
          method: 'DELETE',
        })
          .then(r => r.json());
      }
};

export default UsuarioService