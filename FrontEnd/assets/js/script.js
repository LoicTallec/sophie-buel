"use strict";

//CONSTANTS

const BASE_URL       = "http://localhost:5678/api/"; 
const WORKS_URL      = BASE_URL + "works";
const CATEGORIES_URL = BASE_URL + "categories";

const galleryDiv       = document.querySelector('.gallery');
const filtersContainer = document.querySelector(".filters");
const body             = document.querySelector("body");
const modaleContainer  = document.querySelector('.modale-contener');
const modale           = document.createElement('section');
const navigate         = document.createElement('div');
const leftArrow        = document.createElement("span");
const croix            = document.createElement('span');
const title            = document.createElement('h2');
const gallery          = document.createElement('ul');
const rod              = document.createElement('div');
const addDel           = document.createElement('button');
const li               = document.createElement('li');

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
        gallery.appendChild(delet);

        croix.addEventListener('click', () => {
            li.remove();
            delet.remove();
            addPicture.remove();
            leftArrow.remove();
        });
    }
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
        displayFormModale();
    });

    leftArrow.addEventListener('click', () => {
        addPicture.remove();
        leftArrow.remove();
        
    })

    navigate.appendChild(croix);
    modale.appendChild(navigate);
    modale.appendChild(title);
    modale.appendChild(gallery);
    modale.appendChild(rod);
    modale.appendChild(addDel);
    modaleContainer.appendChild(modale);
}

function fermerModale() {
    modaleContainer.removeChild(modale);
}

function displayFormModale() {
    const images = document.querySelectorAll('.modale ul');
    const formContainer = document.createElement("div");
    const pictureAdd = document.createElement("button");

    title.innerText = 'Ajout photo';
    pictureAdd.innerText = '+ Ajouter photo';
    addDel.innerText = 'Valider';
    leftArrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    navigate.appendChild(leftArrow);
    images.forEach(ul => ul.remove())

    
    formContainer.classList.add('gallery-add');

    modale.appendChild(formContainer);
    formContainer.appendChild(addPicture);
    
    addPicture.style.display = "flex";
    addPicture.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(addPicture);

    }) 
}


function switchDisplay() {
    if (localStorage.getItem("token")) {
        displayAdmin();
    } else {
        displayFilters();
    }
}

function logout() {
    localStorage.removeItem("token");
    location.href = "assets/login.html";
}



//MAIN

switchDisplay();
displayWorks();

