"use strict";

//CONSTANTS
const BASE_URL       = "http://localhost:5678/api/"; 
const WORKS_URL      = BASE_URL + "works";
const CATEGORIES_URL = BASE_URL + "categories";

const galleryDiv       = document.querySelector('.gallery');
const filtersContainer = document.querySelector(".filters");

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





//MAIN

displayFilters();
displayWorks();
