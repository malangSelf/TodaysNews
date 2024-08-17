const apiKey = "098f1ccda15145ff914288993bfbbd2c"
const cardChild = document.getElementById("card-container")
const inputSearch = document.getElementById("input-search")
const buttonClick = document.getElementById("button-search")

async function fetchResponse() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?pageSize=10&sources=techcrunch&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return  data.articles;
    } catch (error) {
        console.log("haven't whis data");
        return []
    }
}

buttonClick.addEventListener("click",async ()=>{
    const query = inputSearch.value.trim();
    console.log("query is >> "+query);
    if(query !== "") {
        try {
            const articles = await fetchNewQuery(query)
            disPlayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query",error);
        }
    }
})

async function fetchNewQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.log("query haven't whis data");
        return []
    }
}

function disPlayBlogs(articles) {
    cardChild.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("card-block")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        title.textContent = article.title
        const description = document.createElement("p")
        description.textContent = article.description

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)

        cardChild.appendChild(blogCard)
    });
}

(async () => {
    console.log("object");
    try {
        const articles = await fetchResponse();
        console.log("articles is >>",articles);
        disPlayBlogs(articles)
    } catch (error) {
        console.log("bug by return data >>", error);
    }
})();