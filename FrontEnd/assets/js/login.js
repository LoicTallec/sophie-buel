"use strict";

// CONSTANTS

const LOGIN_URL = "http://localhost:5678/api/users/login";

const loginForm = document.getElementById("myform");

// FUNCTIONS

async function login() {

    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(loginForm);

        const data = Object.fromEntries(formData);
    
        fetch(LOGIN_URL, {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        .then (response => response.json())
        .then (data => {
            console.log(data);

            if(data.userId && data.token) {
                window.location.assign('../index.html');
                sessionStorage.setItem("token", data.token);
            }
            
            else {
                console.log('Error 404 User not found ')
            };
        })
        .catch(error => console.log(error));
    });
}

//MAIN

login();