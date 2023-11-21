"use strict";

//CONSTANTS

const BASE_URL = "http://localhost:5678/api/";
const WORKS_URL = BASE_URL + "works";
const CATEGORIES_URL = BASE_URL + "categories";

const galleryDiv = document.querySelector('.gallery');
const filtersContainer = document.querySelector(".filters");
const body = document.querySelector("body");
const modaleContainer = document.querySelector('.modale-container');
const postPicture = document.querySelector(".post-picture");
const figure = document.querySelector('.modale-image');
const addButton = document.querySelector('.add');
const fileInput = document.createElement('input');
const newPicture = document.querySelector('.post-picture');

const image = figure.querySelector('img');
const modale = document.createElement('section');
const navigate = document.createElement('div');
const leftArrow = document.createElement("span");
const croix = document.createElement('span');
const title = document.createElement('h2');
const gallery = document.createElement('ul');
const rod = document.createElement('div');
const addDel = document.createElement('button');
const li = document.createElement('li');
const background = document.createElement('div');
const validate = document.getElementById("validate");
const addPicture = document.getElementById("add-picture");

// FUNCTIONS


/**
 * Récupère les travaux à partir du serveur.
 */
async function getWorks() {
  try {
    const response = await fetch(WORKS_URL);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Récupère les catégories depuis le serveur.
 */
async function getCategories() {
  try {
    const response = await fetch(CATEGORIES_URL);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Affiche les travaux dans la galerie en fonction de l'ID de catégorie donné.
 *
 * @param {number} categoriesId - L'ID de la catégorie pour filtrer les travaux. Par défaut, 0 si non fourni.
 * @return {Promise<void>} Une promesse qui se résout une fois que les travaux ont été affichés dans la galerie.
 */
async function displayWorks(categoriesId = 0) {
  const works = await getWorks();

  const filteredWorks = categoriesId ? works.filter(image => image.categoryId === categoriesId) : works;

  galleryDiv.innerHTML = "";

  filteredWorks.forEach(image => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.setAttribute('src', image.imageUrl);
    img.setAttribute('alt', image.title);
    figcaption.textContent = image.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryDiv.appendChild(figure);
  });
}

/**
 * Affiche les filtres pour les catégories.
 */
async function displayFilters() {
  const filters = await getCategories();
  filters.unshift({ id: 0, name: "Tous" });

  filters.forEach(filter => {
    const button = document.createElement("button");
    button.textContent = filter.name;
    filtersContainer.appendChild(button);

    button.addEventListener("click", async () => {
      await displayWorks(filter.id);
    });
  });
}

/**
 * Déconnecte l'utilisateur en supprimant le jeton du stockage local et en redirigeant vers la page de connexion.
 */
function logout() {
  localStorage.removeItem("token");
  location.href = "assets/login.html";
}

/**
 * Supprime un élément de travail avec l'ID spécifié.
 *
 * @param {number} id - L'ID de l'élément de travail à supprimer.
 */
function deleteWorks(id) {
  const token = localStorage.getItem('token');
  fetch(`${WORKS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .catch(error => console.log(error));
}

/**
 * Supprime la modale du DOM.
 */
function removeModale() {
  leftArrow.remove();
  modale.appendChild(navigate);
  modale.appendChild(title);
  modale.appendChild(gallery);
  modale.appendChild(rod);
  modale.appendChild(addDel);
}

/**
 * Récupère une liste de travaux et les affiche dans la galerie.
 */
async function worksFunction() {
  const works = await getWorks();

  for (let work of works) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const delet = document.createElement('div');

    delet.classList.add('garbage');

    img.setAttribute('src', work.imageUrl);
    img.setAttribute('alt', work.title);
    delet.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    li.appendChild(img);
    gallery.appendChild(li);
    li.appendChild(delet);

    delet.addEventListener('click', (event) => {
      event.preventDefault();
      deleteWorks(work.id);
    })
  }

  croix.addEventListener('click', () => {
    gallery.innerHTML = '';
  });

  background.addEventListener('click', () => {
    gallery.innerHTML = '';
    removeBackground();
  });
}

/**
 * Envoie les données du formulaire à un serveur en utilisant une requête POST.
 *
 * @param {FormData} formData - Les données du formulaire à envoyer.
 */
function sendFormData() {

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  formData.append('title', document.getElementById('title').value);
  formData.append('category', document.getElementById('category').value);
  console.log(formData)

  const token = localStorage.getItem('token'); // Récupère le token depuis le local storage
  console.log(token);
  fetch(WORKS_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la requête: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Réponse de l\'API :', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
    })
}


/**
 * Affiche une modale de formulaire et gère la sélection d'un fichier image.
 */
function displayFormModale() {

  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', 'image/jpeg, image/png');
  fileInput.setAttribute('max-size', '4194304'); // 4 Mo en octets

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const addImage = document.createElement('img');
      addImage.setAttribute('src', e.target.result);
      addImage.setAttribute('alt', 'Image ajoutée');

      const figure = document.querySelector('.modale-image');
      figure.innerText = '';
      figure.appendChild(addImage);
    };

    reader.readAsDataURL(file);
  });
}

/*
* Gestion des addeventListener
*/
function returnFirstModale() {
  addPicture.style.display = "none";
  title.innerText = 'Galerie photo';
  postPicture.style.display = "none";
  removeModale();
}

function closeSecondeModale() {
  addPicture.style.display = "none";
  postPicture.style.display = "none";
  leftArrow.remove();
  background.classList.remove('darken-background');
}

function addImage(event) {
  event.preventDefault();
  displayFormModale();
  fileInput.click();
}

function validateNewWork(event) {
  event.preventDefault();
  sendFormData();
}

function setModaleListeners() {
  leftArrow.addEventListener('click', returnFirstModale);
  croix.addEventListener('click', closeSecondeModale);
  addButton.addEventListener('click', addImage);
  validate.addEventListener('click', validateNewWork);
}

function removeBackground() {
  background.classList.remove('darken-background');
  background.addEventListener('click', closeFirstModale);
  addPicture.style.display = "none";
  postPicture.style.display = "none";
  leftArrow.remove();
}

function setFirstModaleListeners() {
  croix.addEventListener('click', closeFirstModale);
  croix.addEventListener('click', removeBackground);
  addDel.addEventListener('click', formModale);
}

/*
*
*/

/**
 * Supprime des éléments du DOM et ajoute une nouvelle classe à un élément.
 */
function formModale() {
  gallery.remove();
  addDel.remove();
  rod.remove();

  rod.classList.add('rodmodale');
  title.innerText = 'Ajout photo';

  setModaleListeners();

  leftArrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

  addPicture.style.display = "flex";
  postPicture.style.display = "flex";

  navigate.appendChild(leftArrow);
  modale.appendChild(addPicture);
  modale.appendChild(rod);
  modale.appendChild(postPicture)
}

function closeFirstModale() {
  modale.remove();
}

/**
 * Crée une modale de galerie.
 */
async function createGalleryModale() {
  worksFunction();

  modale.classList.add('modale');
  navigate.classList.add('navigate');
  title.classList.add('title-gallery');
  rod.classList.add('rod');
  addDel.classList.add('button-gallery');
  background.classList.add('darken-background');

  title.innerText = 'Galerie photo';
  addDel.innerText = 'Ajouter une photo';
  croix.innerHTML = '<i class="fa-solid fa-xmark "></i>';

  setFirstModaleListeners();
  background.addEventListener('click', closeFirstModale);
  navigate.appendChild(croix);
  modale.appendChild(navigate);
  modale.appendChild(title);
  modale.appendChild(gallery);
  modale.appendChild(rod);
  modale.appendChild(addDel);
  modaleContainer.appendChild(background);
  modaleContainer.appendChild(modale);
}

/**
 * Affiche la section admin du site web.
*/
function displayAdmin() {
  const projetTitle = document.querySelector("#project-title");
  const login = document.querySelector("#login");
  const headband = document.createElement("div");

  headband.classList.add("headband");
  headband.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Mode édition';
  const firstChild = body.firstChild;
  body.insertBefore(headband, firstChild);

  login.innerHTML = '<button class="logout">logout</button>';
  login.addEventListener("click", logout);

  const modify = document.createElement("button");
  modify.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modifier';

  projetTitle.appendChild(modify);

  modify.addEventListener("click", () => {
    createGalleryModale();
  });
}

/**
 * Change l'affichage en fonction de la présence d'un jeton dans le stockage local.
 */
function switchDisplay() {
  displayWorks();
  if (localStorage.getItem("token")) {
    displayAdmin();
  } else {
    displayFilters();
  }
}

//MAIN

switchDisplay();


