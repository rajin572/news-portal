fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(categories => updateCategories(categories.data.news_category))


const updateCategories = datas =>{
    const categoryList = document.getElementById('category-list');
    // for(const data of datas){
    //     console.log(data);
    // }
    datas.forEach(data => {
        const li = document.createElement('li');
        const newliAtr = document.createAttribute('onclick');
        newliAtr.value = `getNewsFromCatgory('${data.category_id}', '${data.category_name}')`
        li.setAttributeNode(newliAtr)
        li.innerText = `${data.category_name}`;
        categoryList.appendChild(li)
    });
}
const getNewsFromCatgory = (url, name)=> {
    fetch(`https://openapi.programming-hero.com/api/news/category/${url}`)
    .then(res => res.json())
    .then(categories => updateNews(categories.data, name));
}
const updateNews = (datas, name) =>{
    categoriesInfo(datas, name)
    // console.log(datas);
    const newsAdd = document.getElementById('newsAdd')
    newsAdd.innerHTML =``
    datas.forEach(data => {
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML=`
        <div class="card shadow-sm p-2">
        <div class="row g-2">
            <div class="col-12 col-md-2">
                <img src="${data.image_url}" class="w-100 h-100" alt="...">
            </div>
            <div class="col-12 col-md-10">
                <div class="card-body">
                    <h5 class="card-title mb-3">${data.title}</h5>
                    <p class="card-text text-secondary mb-5">${data.details.slice(0,200)}</p>
                    <p class="card-text text-secondary mb-5">${data.details.slice(0,250)}...</p>
                    <div class="newsDetails">
                         <div class="newsAuthor">
                            <img src="${data.author.img}" alt="...">
                            <div class="newsAuthorInfo">
                            <h3>${data.author.name}</h3>
                            <p>${data.author.published_date}</p>
                            </div>
                         </div>
                         <div></div>
                         <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        ` 
        newsAdd.appendChild(div)
    });
}
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