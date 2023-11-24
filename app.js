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

    const items = videos.length;
    if (items === 0) {
        const Title = document.getElementById(`${id}`).innerText;
        return videoContainer.innerHTML = `
        <div class='mt-5 d-flex flex-column justify-content-center'>
        <div class='d-flex justify-content-center'>
        <img src='./images/Icon.png' alt="error" />
        </div>
        <h2 class='d-flex justify-content-center'>Oops! No item found for category ${Title}</h2>
        </div>
        `;   
    }

    videos.forEach(video => {
        const {category_id,thumbnail,title,authors,others}= video;
        const {profile_picture,profile_name,verified} = authors[0];
        const {views,posted_date}=others;
        const div=document.createElement('div');
        div.classList.add('col-lg-3,col-sm-12');

        div.setAttribute('style', 'border: 5px solid green;border-radius:10px;width:18rem; ');
        div.innerHTML=`
        <img width="100px" height="200px" src="${thumbnail}" class="card-img-top" alt="..."> <br> <br/>
        <div class="row">
        <div class="col-lg-4 col-sm-4">
        <img style="border-radius:25px;" height="50px" width="50px" src="${profile_picture}" alt="Photo of author"/>
        </div>
        <div class="col-lg-8 col-sm-8">
        <p>'${title}'</p>
        <p>'${profile_name}'</p>
        <p>'${views}'</p>
        </div>
        </div>
       
        `
        videoContainer.appendChild(div);
    })
}

allVideos(1000);