"use strict";

//CONSTANTS

const BASE_URL       = "http://localhost:5678/api/"; 
const WORKS_URL      = BASE_URL + "works";
const CATEGORIES_URL = BASE_URL + "categories";


const galleryDiv       = document.querySelector('.gallery');
const filtersContainer = document.querySelector(".filters");
const body             = document.querySelector("body");
const modaleContainer  = document.querySelector('.modale-contener');
const postPicture      = document.querySelector(".post-picture");
const figure           = document.querySelector('.modale-image');
const addButton        = document.querySelector('.add');
const fileInput        = document.createElement('input');
const newPicture       = document.querySelector('.post-picture');

const image            = figure.querySelector('img');

const modale           = document.createElement('section');
const navigate         = document.createElement('div');
const leftArrow        = document.createElement("span");
const croix            = document.createElement('span');
const title            = document.createElement('h2');
const gallery          = document.createElement('ul');
const rod              = document.createElement('div');
const addDel           = document.createElement('button');
const li               = document.createElement('li');

const validate         = document.getElementById("validate");
const addPicture       = document.getElementById("add-picture");




// VARIABLES

// FUNCTIONS

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

function logout() {
    localStorage.removeItem("token");
    location.href = "assets/login.html";
}

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

function fermerModale() {
    modaleContainer.removeChild(modale);
}

function removeModale() {
    leftArrow.remove();
    modale.appendChild(navigate);
    modale.appendChild(title);
    modale.appendChild(gallery);
    modale.appendChild(rod);
    modale.appendChild(addDel);
}

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

        croix.addEventListener('click', () => {
            gallery.removeChild(li);
            gallery.removeChild(delet);
        });

        delet.addEventListener('click', (event) => {
            event.preventDefault();
            deleteWorks(work.id);
        })
    }
}

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
    // Faites quelque chose avec la réponse de l'API
    })
    .catch(error => {
    console.error('Erreur lors de l\'envoi du formulaire :', error);
    // Gérez les erreurs lors de l'envoi du formulaire
})  
}

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

function formModale() {
    gallery.remove();
    addDel.remove();
    rod.remove();

    rod.classList.add('rodmodale');
    title.innerText = 'Ajout photo';

    leftArrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    leftArrow.addEventListener('click', () => {
        addPicture.style.display = "none";
        title.innerText = 'Galerie photo';
        removeModale();
        postPicture.style.display = "none";
    });

    croix.addEventListener('click', () => {
        addPicture.style.display = "none";
        leftArrow.remove();
        postPicture.style.display = "none";
    });

    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        displayFormModale();
        fileInput.click();
    })

    validate.addEventListener('click', (event) => {
        event.preventDefault();
        sendFormData();
    })

    addPicture.style.display  = "flex";
    postPicture.style.display = "flex";

    navigate.appendChild(leftArrow);
    modale.appendChild(addPicture);
    modale.appendChild(rod);
    modale.appendChild(postPicture)
}

async function createGalleryModale() {
    worksFunction();

    modale.classList.add('modale');
    navigate.classList.add('navigate');
    title.classList.add('title-gallery');
    rod.classList.add('rod');
    addDel.classList.add('button-gallery');

    title.innerText   = 'Galerie photo';
    addDel.innerText  = 'Ajouter une photo';
    croix.innerHTML   = '<i class="fa-solid fa-xmark "></i>';

    croix.addEventListener('click', fermerModale);
    addDel.addEventListener('click', () => {
        formModale();
    });

    navigate.appendChild(croix);
    modale.appendChild(navigate);
    modale.appendChild(title);
    modale.appendChild(gallery);
    modale.appendChild(rod);
    modale.appendChild(addDel);
    modaleContainer.appendChild(modale);
}

function displayAdmin() {
    const projetTitle = document.querySelector("#project-title");
    const login       = document.querySelector("#login");
    const headband    = document.createElement("div");
    
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


