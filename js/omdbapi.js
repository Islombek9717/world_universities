const filmList = document.querySelector(".js-films-list");
const elLoader = document.querySelector(".js-loader");
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");
const searchBtn = document.querySelector(".js-form")
const searchInput = document.querySelector(".js-form-search_input")
const tempMovie = document.querySelector(".movie")

let linkOmdb = (country) => `http://universities.hipolabs.com/search?country=${country}`;

templaterender = (item => {
    // console.log(item);
    let element=template.content.cloneNode(true)
    movieInfo = element.querySelectorAll(".data");
    movieInfo[0].textContent = item.name;
    movieInfo[1].textContent = item.country;
    movieInfo[2].href = item.web_pages;
    return element;
    
})

render = (data) => {
    filmList.textContent = ""
    if (data != undefined) {
        data.forEach(element => {
            filmList.appendChild(templaterender(element))
        });
    }
}

let inputName;
searchBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    inputName = searchInput.value.trim();
    if (inputName.length > 2) {
        let link = linkOmdb(inputName);
        getData(link)
    }
    
});

let page = 1;

function getData(linkOmdb) {
    fetch(linkOmdb)
    .then((response) => response.json())
    .then((data) => {
       
        elLoader.style.display = "none";
        render(data);
    }
    );
}


function nextPage() {
    page = page + 1;
    filmList.innerHTML = "";
    elLoader.style.display = "block";
    getData(linkOmdb(inputName));
}
elNext.addEventListener("click", nextPage);

function prevPage() {
    page = page - 1;
    filmList.innerHTML = "";
    elLoader.style.display = "block";
    getData(linkOmdb(inputName));
}
elPrev.addEventListener("click", prevPage);



