const img = document.querySelector("#imageCaptured");

var localImg = localStorage.getItem('imgCanvas');

function displayImage() {
    console.log(localImg);
    console.log(img);
    img.src = localImg;
}

window.addEventListener('load',displayImage,true);