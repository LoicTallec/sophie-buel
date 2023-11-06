"use strict";

//CONSTANTS
const BASE_URL       = "http://localhost:5678/api/"; 
const WORKS_URL      = BASE_URL + "works";
const CATEGORIES_URL = BASE_URL + "categories";

const galleryDiv       = document.querySelector('.gallery');
const filtersContainer = document.querySelector(".filters");
const body             = document.querySelector("body");


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
        createModale();
    });
}

function createModale() {
    const modaleContainer = document.querySelector('.modale-contener');

    // Créer l'élément de la modale
    const modale = document.createElement('div');
    modale.classList.add('modale');

    // Créer le contenu de la modale
    const contenu = document.createElement('div');
    contenu.classList.add('contenu');
    contenu.innerHTML = '<p>Galerie photo</p>';

    // Ajouter le contenu à la modale
    modale.appendChild(contenu);
    
    // Créer la croix de fermeture
    const croix = document.createElement('span');
    croix.innerHTML = '<i class="fa-solid fa-xmark "></i>';
    croix.addEventListener('click', fermerModale);

    // Ajouter la croix à la modale
    modale.appendChild(croix);
    
    // Ajouter la modale au conteneur
    modaleContainer.appendChild(modale);

    // Fermer la modale lorsque l'utilisateur clique sur la croix
    function fermerModale() {
        modaleContainer.removeChild(modale);
    }
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

