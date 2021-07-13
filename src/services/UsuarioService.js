import { API_URL } from '../Constants'

const UsuarioService = {
    cadastrar(usuarios) {
        return fetch(API_URL+'/usuarios', {
          method: 'POST',
          body: JSON.stringify(usuarios)
        }).then(r => r.json());
      },
    
      alterar(usuarios) {
        return fetch(API_URL+'/usuarios/' + usuarios.id, {
          method: 'PUT',
          body: JSON.stringify(usuarios)
        }).then(r => r.json());
      },
    
      consultar(id) {
        return fetch(API_URL+'/usuarios/' + id).then(r => r.json());
      },
    
      listar() {
        return fetch(API_URL+'/usuarios').then(r => r.json());
      },
    
      excluir(usuarios) {
        return fetch(API_URL+'/usuarios/' + usuarios.id, {
          method: 'DELETE',
        })
          .then(r => r.json());
      }
};

export default UsuarioService