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
        li.innerText = `${data.category_name}`;
        categoryList.appendChild(li)
    });
}