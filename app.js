fetch('https://openapi.programming-hero.com/api/videos/categories')
.then(res => res.json())
.then(data => displayMenu(data.data));


const menuContainer=document.getElementById('menu-all');

function displayMenu(Menus){
    Menus.forEach(menu => {
        const a=document.createElement('a');
        a.innerText = `${menu.category}`;
        a.classList.add('col');
        a.setAttribute('id', `${menu.category_id}`);
        a.setAttribute('href', '#');
        menuContainer.appendChild(a);
    })
}