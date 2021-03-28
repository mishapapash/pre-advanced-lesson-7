'use strict';

let getElement = selector => document.querySelector(selector);

let requestField = getElement('.request_field');

let requestButton = getElement('.request_button');

let clearButton = getElement('.clear_element');

let messageWindow = getElement('.message-window');

const clearField = () => {
    requestField.value = '';
    clearButton.classList.add('hidden');
};

const createElements = (data) => {
    let parrent = getElement('.response');
    let itemsArr = [];
    let search = data.Search;
    search.forEach(element => {
        let poster = element.Poster;
        let title = element.Title;
        let type = element.Type;
        let year = element.Year;
        let imdbID = element.imdbID;
        let item = `<div class="response_item">
            <img class="response_item_img" src="${poster}"></img>
            <div class="response_item_name">${title}</div>
            <div class="response_item_type">${type}</div>
            <div class="response_item_year">${year}</div>
            <button class="response_item_details" data-name="${imdbID}" onclick="detailsInfo()">More details</button>
        </div>`;
        itemsArr.push(item);
    });
    parrent.innerHTML = itemsArr.join('');
};

const createFullInfo = (data) => {
    let parrent = getElement('.info-screen');
    let poster = data.Poster;
    let title = data.Title;
    let description = data.Plot;
    let written = data.Writer;
    let directed = data.Director;
    let starring = data.Actors;
    let boxOffice = data.BoxOffice;
    let awards = data.Awards;
    let rating = data.imdbRating;
    let fullInfo = `<div class="info-screen">
        <img src="${poster}" class="info-screen-img">
        <div class="info-screen-description">
            <div class="info-screen-description-header">
                <h2 class="film-title">${title}</h2>
            </div>
            <div class="info-screen-description-body">
                <p class="film-description">${description}</p>
                <p class="film-written"><b>Written by:</b>${written}</p>
                <p class="film-directed"><b>Directed by:</b>${directed}</p>
                <p class="film-staring"><b>Starring:</b>${starring}</p>
                <p class="film-box-office"><b>Box Office:</b>${boxOffice}</p>
                <p class="film-awards"><b>Awards:</b>${awards}</p>
                <p class="film-ratings"><b>Rating:</b>${rating}</p>
            </div>
        </div>
    </div>`;
    parrent.innerHTML = fullInfo;
};

const getData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        createElements(data);
    } catch (error) {
        return console.log(error);
    }
};  

const getInfo = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        createFullInfo(data);
    } catch (error) {
        return console.log(error);
    }
};  

requestField.addEventListener('input', () => {
    if(requestField.value != 0) {
        clearButton.classList.remove('hidden');
    }
    else {
        clearButton.classList.add('hidden');
    }
});

clearButton.addEventListener('click', () => {
    clearField();
});

requestButton.addEventListener('click', () => {
    let url = `http://www.omdbapi.com/?s=${requestField.value}&apikey=7967ba5a`;
    getData(url);
    clearField();
});

const detailsInfo = async () => {
    let id = event.target.dataset.name;
    let url = `http://www.omdbapi.com/?i=${id}&apikey=7967ba5a`;
    getInfo(url);
    getElement('.message-window').classList.remove('hidden');
};

messageWindow.addEventListener('click', () => {
    getElement('.message-window').classList.add('hidden');
});