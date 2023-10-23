"use strict";

//CONSTANTS
const images = [
    {
        src: 'assets/images/abajour-tahina.png',
        alt: 'Abajour Tahina',
        caption: 'Abajour Tahina'
    },
    {
        src: 'assets/images/appartement-paris-v.png',
        alt: 'Appartement Paris V',
        caption: 'Appartement Paris V'
    },
    {
        src: 'assets/images/restaurant-sushisen-londres.png',
        alt: 'Restaurant Sushisen - Londres',
        caption: 'Restaurant Sushisen - Londres'
    },
    {
        src: 'assets/images/la-balisiere.png',
        alt: 'Villa “La Balisiere” - Port Louis',
        caption: 'Villa “La Balisiere” - Port Louis'
    },
    {
        src: 'assets/images/structures-thermopolis.png',
        alt: 'Structures Thermopolis',
        caption: 'Structures Thermopolis'
    },
    {
        src: 'assets/images/appartement-paris-x.png',
        alt: 'Appartement Paris X',
        caption: 'Appartement Paris X'
    },
    {
        src: 'assets/images/le-coteau-cassis.png',
        alt: 'Pavillon “Le coteau” - Cassis',
        caption: 'Pavillon “Le coteau” - Cassis'
    },
    {
        src: 'assets/images/villa-ferneze.png',
        alt: 'Villa Ferneze - Isola d’Elba',
        caption: 'Villa Ferneze - Isola d’Elba'
    },
    {
        src: 'assets/images/appartement-paris-xviii.png',
        alt: 'Appartement Paris XVIII',
        caption: 'Appartement Paris XVIII'
    },
    {
        src: 'assets/images/bar-lullaby-paris.png',
        alt: 'Bar “Lullaby” - Paris',
        caption: 'Bar “Lullaby” - Paris'
    },
    {
        src: 'assets/images/hotel-first-arte-new-delhi.png',
        alt: 'Hotel First Arte - New Delhi',
        caption: 'Hotel First Arte - New Delhi'
    },
    {
        src: 'assets/images/restaurant-sushisen-londres.png',
        alt: 'Restaurant Sushisen - Londres',
        caption: 'Restaurant Sushisen - Londres'
    }
];

const galleryDiv       = document.querySelector('.gallery');
const filtersContainer = document.querySelector(".filters");

const filters = [
    {
        "id": 0,
        "name": "Tous"
    },
    {
        "id": 1,
        "name": "Objets",
    },
    {
        "id": 2,
        "name": "Appartements"
    },
    {
        "id": 3,
        "name": "Hôtels & Restaurants"
    }
]

// VARIABLES

// FUNCTIONS



filters.forEach(filter => {
    const button = document.createElement("button");
    button.textContent = filter.name;
    filtersContainer.appendChild(button);
});

images.forEach(image => {
    const figure     = document.createElement('figure');
    const img        = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.setAttribute('src', image.src);
    img.setAttribute('alt', image.alt);
    figcaption.textContent = image.caption;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryDiv.appendChild(figure);
});

//MAIN
