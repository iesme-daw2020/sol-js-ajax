const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetchAwait(numsecs.value, user.value);
  });
});

function listUsuariosConf() {
  let headers = new Headers({
    'cache-control': 'no-cache',
  });

  let conf = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
  };
  return conf;
}

function createUsuariosConf(user) {
  let conf = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
  };
  return conf;
}

function procesarFetch(numSecs, user) {
  fetch(BASE_URL + user + '?delay=' + numSecs, listUsuariosConf())
    .then((resultado) => {
      if (resultado.ok) return resultado.json();
      else throw new Error(resultado.status);
    })
    .then((resultadoJson) => {
      mostrarUsuario(resultadoJson.data);
      return resultadoJson.data;
    })
    .then((person) => fetch(POSTMAN_URL, createUsuariosConf(person)))
    .then((resultado) => resultado.json())
    .then((json) => {
      document.getElementById('name').innerHTML = json.json.first_name;
      document.getElementById('status').innerHTML = 200;
    })
    .catch((error) => {
      document.getElementById('status').innerHTML = error.message;
    });
}

async function procesarFetchAwait(numSecs, user) {
  try {
    // devuelve una promesa, y en resultado tenemos el response.
    const resultado = await fetch(
      BASE_URL + user + '?delay=' + numSecs,
      listUsuariosConf()
    );
    // Si hay error, lanzar 404
    if (!resultado.ok) throw new Error(resultado.status);
    // response.json() returns a promise resolved to a JSON object
    const json = await resultado.json();
    const person = json.data;
    mostrarUsuario(person);

    // devuelve una promesa, y en resultado2 tenemos el response.
    const resultado2 = await fetch(POSTMAN_URL, createUsuariosConf(person));
    const json2 = await resultado2.json();
    document.getElementById('name').innerHTML = json2.json.first_name;
    document.getElementById('status').innerHTML = 200;
  } catch (error) {
    document.getElementById('status').innerHTML = error.message;
  }
}

function mostrarUsuario(person) {
  document.getElementById('id').innerHTML = person.id;
  document.getElementById('email').innerHTML = person.email;
}

function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}
