// capturing the user's input when the search button is clicked

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchQuery = document.getElementById("searchQuery").value;
  console.log(`Searching for ${searchQuery}...`);
});

const apiKey = "AIzaSyDzkA2btlMXxjkMPJv112y333vhtkzXrC0";
const searchEngineId = "gulugulu-1676106363978";
const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchQuery}`;

fetch(searchUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Display search results
  })
  .catch(error => console.error(error));



const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = "";

data.items.forEach((item) => {
  const result = document.createElement("div");
  result.innerHTML = `
    <h2>${item.title}</h2>
    <a href="${item.link}">${item.link}</a>
    <p>${item.snippet}</p>
  `;
  resultsDiv.appendChild(result);
});


const resultsPerPage = 10;
let startIndex = 1;

function displayResults(data) {
  // Display search results
}

function showNextResults() {
  startIndex += resultsPerPage;
  const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchQuery}&start=${startIndex}&num=${resultsPerPage}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error(error));
}

const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.addEventListener("click", showNextResults);
resultsDiv.appendChild(nextButton);

