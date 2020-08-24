const form = document.getElementById('form');
const main = document.getElementById('main');

const storageID = localStorage;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const cardID = storeID();
  const card = createCard(cardID, event.target.formInput.value);
  main.prepend(card);
  event.target.formInput.value = '';
});

function storeID() {
  let count = storageID.getItem('lastID') ? storageID.getItem('lastID') : 0;
  storageID.setItem('lastID', ++count);
  return storageID.getItem('lastID');
}

function createCard(id, text) {
  const card = el('div');
  const classAtt = document.createAttribute('class');
  const idAtt = document.createAttribute('id');
  classAtt.value = 'card';
  idAtt.value = `card${id}`;
  card.setAttributeNode(classAtt);
  card.setAttributeNode(idAtt);
  const cardContent = `<div class="card__check">
  <input onclick="checkCard(${id})" class="check__input" type="checkbox" name="todocheck" id="cardCheck${id}">
  <span class="check__custom"></span>
  </div>
  <div class="card__text" id="cardInput${id}">${text}</div>
  <button onclick="removeCard(${id})" id="cardRemove${id}" class="card__remove">
  <svg class="card__svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>
  </button>
  <button onclick="editCard(${id})" class="card__edit" id="cardEdit${id}">EDIT</button>`;
  card.innerHTML = cardContent;
  return card;
}

function editCard(id) {
  const textInput = document.getElementById(`cardInput${id}`);
  const editableAtt = document.createAttribute('contenteditable');
  editableAtt.value = true;
  textInput.setAttributeNode(editableAtt);
  textInput.focus();
  textInput.addEventListener('blur', () => {
    textInput.removeAttribute('contenteditable');
  });
}

function removeCard(id) {
  const card = getCard(id);
  card.classList.add('card--removed');
  function remove() {
    main.removeChild(card);
  }
  setTimeout(remove, 500);
}

function checkCard(id) {
  const card = getCard(id);
  const edit = document.getElementById(`cardEdit${id}`);
  edit.disabled = !edit.disabled;
  card.classList.toggle('card--done');
  edit.classList.toggle('card__edit--done');
}

function el(element) {
  return document.createElement(element);
}

function getCard(id) {
  return document.getElementById(`card${id}`);
}
