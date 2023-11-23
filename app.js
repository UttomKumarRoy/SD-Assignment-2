fetch('https://openapi.programming-hero.com/api/videos/categories')
.then(res => res.json())
.then(data => displayMenu(data.data))
.catch(err => console.log(err));


const menuContainer=document.getElementById('menu-all');

const displayMenu = (Menus) => {
    Menus.forEach(menu => {
        const a=document.createElement('a');
        a.innerText = `${menu.category}`;
        a.classList.add('col');
        a.setAttribute('id', `${menu.category_id}`);
        a.setAttribute('href', '#');
        menuContainer.appendChild(a);
        document.getElementById(menu.category_id).addEventListener('click', () => {
            allVideos(menu.category_id);
        })
    })
}

const allVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideo(data.data, id))
        .catch(err => console.log(err))
}

const displayVideo =(videos, id) =>{
    const videoContainer=document.getElementById('video-all');
    videoContainer.innerHTML = '';

    const itemsContainer = document.getElementById('items-found');
    const items = videos.length;
    if (items === 0) {
        const Title = document.getElementById(`${id}`).innerText;
        return itemsContainer.innerHTML = `
        <div>
        <h2 class='text-red-900'>Oops! No item found for category ${Title}</h2>
        <div>
             <img src='https://www.freeiconspng.com/thumbs/error-icon/error-icon-32.png' alt="error" />
        </div>
        
        </div>
        `;   
    }

    videos.forEach(video => {
        const {category_id,thumbnail,title,authors,others}= video;
        const {profile_picture,profile_name,verified} = authors[0];
        const {views,posted_date}=others;
        const div=document.createElement('div');
        div.innerHTML=`
        <div class="card" style="width: 18rem;">
            <img src="${thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        `
        videoContainer.appendChild(div);
    })
}