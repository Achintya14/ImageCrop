const img = document.querySelector("#imageCaptured"),
     submit = document.querySelector("#submit"),
     verify = document.querySelector("#verify");

var localImg = localStorage.getItem('imgCanvas');

function displayImage() {
    console.log(localImg);
    console.log(img);
    img.src = localImg;
}

submit.onclick = function() {
    alert('Submit button clicked')
}

verify.onclick = function() {
    alert('verify button clicked')
}


window.addEventListener('load',displayImage,true);