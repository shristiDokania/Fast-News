//Grab the news container
let newsAccordian = document.getElementById("newsAccordian");
//Storing the news api key
const apikey = "acbfd672d7644426ba4cd101af7fd027";
let category = "Business";

//adding eventhandler for search
document.getElementById("search-button").addEventListener("click", () => {
  let text = document.getElementById("search-result").value;
  if (text) {
    category = text.toLowerCase();
  }
  startReq(category);
  return true;
});

function startReq(category) {
  //Create a ajax get request
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apikey}`,
    true
  );

  xhr.onload = function () {
    console.log(this.status);
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      console.log(articles);
      let newsHtml = `<h5>${category.toUpperCase()} </h5><hr>`;
      articles.forEach((element, index) => {
        //updating innerhtml with the response data
        let news = `
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapse${index}" aria-expanded="false" aria-controls="multiCollapse${index}">${element["title"]}</button>

        <div style="min-height:15px;">
            <div class="collapse collapse-horizontal" id="collapseWidthExample">
                <div class="card card-body" style="width: 200px;">
                
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="multiCollapse${index}">
                <div class="card card-body">
                ${element["description"]}.<a href="${element["url"]}" target="_blank"> Read More</a>
                </div>
                </div>
            </div>
        </div>`;
        newsHtml += news;
      });
      newsAccordian.innerHTML = newsHtml;
    } else {
      console.log("some error occured");
    }
  };

  xhr.send();
}
