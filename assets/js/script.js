const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



let photosArray = [];


//Unsplash API
const count = 10;
const apiKey = 'sMwQlCaJDOFTJ9PDFeuWBg8sfpFyCV0l_bRnCsd1SDY'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// Get photos from API
let ready = false,
    imagesLoaded = 0,
    totalImages = 0;

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


//Create elements for photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(function(photo){
        const item = document.createElement('a');
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target",'_blank');
        // create img for photo
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src: photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        //Event listener, check when each is finished loading

        img.addEventListener('load',imageLoaded);

        //Put <img> inside <a> and then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log(error);
        //Catch Error here
    }
}


//Check to see if scroling near bottom of page
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready=false;
    }
});
getPhotos();