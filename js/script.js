// by call this function we get categories name
const categoriesUrl = () =>{
fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(categories => updateCategories(categories.data.news_category))
.catch(error => console.log(error))
}

// we use this function to show first 10 news by defult
const showFirst = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/08`)
    .then(res => res.json())
    .then(categories => showNewsFirst(categories.data))
    .catch(err => console.log(err))
}
// here we slice news from the array and show 10 news
const showNewsFirst = (datas) =>{
    const newsAdd = document.getElementById('newsAdd')
    const data =  datas.slice(15 ,25);
    data.sort((firstItem, secondItem) => secondItem.total_view - firstItem.total_view);
    newsAdd.innerHTML =``
    newsShow(data)
}
// we use this to show all categories name in the website
const updateCategories = datas =>{
    const categoryList = document.getElementById('category-list');
    datas.forEach(data => {
        const li = document.createElement('li');
        const newliAtr = document.createAttribute('onclick');
        //here we create an on click function to get data from the clicked categories
        newliAtr.value = `getNewsFromCatgory('${data.category_id}', '${data.category_name}')` 
        li.setAttributeNode(newliAtr)
        li.innerText = `${data.category_name}`;
        categoryList.appendChild(li)
    });
}


// in previous function we create an onclick fnuction and here in this function we use it to show data from selected categories 
const getNewsFromCatgory = (url, name)=> {
    fetch(`https://openapi.programming-hero.com/api/news/category/${url}`)
    .then(res => res.json())
    .then(categories => updateNews(categories.data, name))
    .catch(error => console.log(error))
}
const updateNews = (datas, name) =>{
    toggleSpiner(true);
    categoriesInfo(datas, name)
    const newsAdd = document.getElementById('newsAdd')
    datas.sort((firstItem, secondItem) => secondItem.total_view - firstItem.total_view);
    newsAdd.innerHTML =``
    newsShow(datas)
}

// we create this function for DRY code and we use it to show news on website [we use it into the showNewsFirst() and updateNews() function]
const newsShow = datas =>{
    datas.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML=`
        <div class="card shadow-sm p-2">
        <div class="row g-2">
            <div class="col-12 col-md-4">
                <img src="${data.image_url}" class="w-100 h-100" alt="...">
            </div>
            <div class="col-12 col-md-8">
                <div class="card-body">
                    <h5 class="card-title mb-3">${data.title}</h5>
                    <p class="card-text text-secondary mb-5">${data.details.slice(0,200)}</p>
                    <p class="card-text text-secondary mb-5">${data.details.slice(0,250)}...</p>
                    <div class="newsDetails">
                        <div class="newsAuthor">
                            <img src="${data.author.img}" width="50px" height="50px" class="rounded-circle mx-2" alt="...">
                            <div class="newsAuthorInfo">
                            <p class="p-0 m-0">${data.author.name ? data.author.name : 'Not available'}</p>
                            <p class="p-0 m-0 text-secondary">${ data.author.published_date ? data.author.published_date : 'Not available'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <i class="fa-regular fa-eye mx-2"></i>${data.total_view ? data.total_view : 'Not available'}
                    </div>
                    <div>
                        <button onclick="getNewsDetails('${data._id}')" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-primary px-3 mt-4">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        ` 
        newsAdd.appendChild(div)
    });
    toggleSpiner(false)
}

// in newsShow() fuction we create an onclick function to open an modul to see more datails
//here we create an on click function to get details from the clicked news
const getNewsDetails = url =>{
    fetch(`https://openapi.programming-hero.com/api/news/${url}`)
    .then(res => res.json())
    .then(details => showDetails(details.data[0]))
    .catch(error => console.log(error))
}



const showDetails = data =>{
    const detailTitle = document.getElementById('detailTitle');
    detailTitle.innerText = `${data.title ? data.title : 'Not available'}`
    const detailAuthorName = document.getElementById('detailAuthorName');
    detailAuthorName.innerText = `${data.author.name ? data.author.name : 'Not available'}`
    const detailPublishDate = document.getElementById('detailPublishDate');
    detailPublishDate.innerText = `${data.author.published_date ? data.author.published_date : 'Not available'}`
    const detailView = document.getElementById('detailView');
    detailView.innerText = `${data.total_view ? data.total_view : 'Not available'}`
}
// we create this function to show the data length and catagories name on the web
const categoriesInfo = (data, name) =>{
    const categoryLengthNum = document.getElementById('category-length-num');
    if(data.length > 0){
        categoryLengthNum.innerText = data.length;
    }
    else{
        categoryLengthNum.innerText = 'No';
    }
    const categoryLengthName = document.getElementById('category-length-name');
    categoryLengthName.innerText = name;
}

// for spinner loader
const toggleSpiner = isLoading =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.style.display = 'block'
    }
    else{
        loadingSpinner.style.display = 'none'
    }
}

categoriesUrl();
showFirst();