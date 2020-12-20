const BASE_URL = 'https://reqres.in/api/users';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    procesarFetch(numsecs.value, user.value - 1);
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
  fetch(BASE_URL + '?delay=' + numSecs, listUsuariosConf())
    .then((resultado) => resultado.json())
    .then((resultadoJson) => mostrarUsuario(resultadoJson.data[user]))
    .then((person) => fetch(POSTMAN_URL, createUsuariosConf(person)))
    .then((resultado) => resultado.json())
    .then((json) => {
      document.getElementById('name').innerHTML = json.json.first_name;
    });
}

async function procesarFetchAwait(numSecs, user) {
  // devuelve una promesa, y en resultado tenemos el response.
  const resultado = await fetch(
    BASE_URL + '?delay=' + numSecs,
    listUsuariosConf()
  );
  // response.json() returns a promise resolved to a JSON object
  const json = await resultado.json();
  const person = mostrarUsuario(json.data[user]);

  // devuelve una promesa, y en resultado2 tenemos el response.
  const resultado2 = await fetch(POSTMAN_URL, createUsuariosConf(person));
  const json2 = await resultado2.json();
  document.getElementById('name').innerHTML = json2.json.first_name;
}

function mostrarUsuario(json) {
  document.getElementById('id').innerHTML = json.id;
  document.getElementById('email').innerHTML = json.email;
  return json;
}
