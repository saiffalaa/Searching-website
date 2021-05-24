const accessKey = "dbk4hP_fpaCFM7K-3e8B3Z3TJ0Kijnx3-QtMDjLc9Sk";
const secreteKey = "kTLw1iZWBQSTqY70ayNtgx9M31jimX5Rey2Y7SwN5iQs";
const nytCall =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey";
const nytApi = "Byyry77pFrIIGI1M9UVZxujQIFGoUF7w ";

const form = document.querySelector("#search-form");
const searchField = document.querySelector("#search-keyword");
let searchedForText;
const responseContainer = document.querySelector("#response-container");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  responseContainer.innerHTML = "";
  searchedForText = searchField.value;
  fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
    {
      headers: {
        Authorization: "Client-ID dbk4hP_fpaCFM7K-3e8B3Z3TJ0Kijnx3-QtMDjLc9Sk",
      },
    }
  )
    .then(async (response) => {
      let htmlContent = "";
      console.log(response);
      let data = await response.json();
      console.log(data);
      if (data.results.length>0) {
        console.log(data.results);
        const firstImage = data.results[0];
        htmlContent = `<figure>
      <img src="${firstImage.urls.regular}" alt="${searchedForText}">
      <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`;
      } else {
        htmlContent = "<div class='error-no-image'>No Images available</div>";
      }
      responseContainer.innerHTML = htmlContent;
    })
    .catch((error) => console.log(error));
  fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytApi}`
  )
    .then(async (responses) => {
      console.log("aricles" + responses);
      let htmlContent = "";
      const data = await responses.json();
      //console.log("article");
      if (data.response.docs.length > 0) {
        htmlContent = data.response.docs.map(
          (article) =>
            `<div class="article">
          <a href=${article.web_url}><h2>${article.headline.main}</h2></a>
          <p>${article.snippet}</p>
          </div>`
        );
      } else
        htmlContent =
          "<div class='error-no-articles'>No articles available</div>";
      console.log(htmlContent);
      responseContainer.innerHTML = responseContainer.innerHTML + htmlContent;
    })
    .catch((e) => {
      console.log("error", e);
    });
});
