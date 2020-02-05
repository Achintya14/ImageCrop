var currentFacingMode = 'environment';

var constraints = { 
                    video: { facingMode:currentFacingMode },
                    audio: false
                };

var track = null;

//defining constants
const  cameraView = document.querySelector("#camera-view"),
       cameraOutput = document.querySelector("#camera-output"),
       cameraSensor = document.querySelector("#camera-sensor"),
       captureTrigger = document.querySelector("#camera-trigger"),
       flipTrigger = document.querySelector("#flip-trigger"),
       saveTrigger = document.querySelector("#save");


//access the device camera and steam to cameraView
function cameraStart() {
    console.log('camera Stream Started');
    console.log(constraints["video"]);
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    }).catch(function(error){
        console.error("Oops. Something is broken.",error);
    });
}

captureTrigger.onclick = function(){
    console.log(cameraView);
    console.log('capture Trigger clicked');
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView,0,0);
    cameraOutput.src = cameraSensor.toDataURL("image/png");
    cameraOutput.classList.add("taken");
    
}

saveTrigger.onclick = function(){
    console.log('save Trigger clicked.');
    localStorage.setItem("imgCanvas",cameraOutput.src);
    window.location.href='cropImage.html';
}

flipTrigger.onclick = function(){
    currentFacingMode = (currentFacingMode=='user')?'environment':'user';
    constraints = {
        video:  { facingMode: currentFacingMode },
        audio: false
    }
    console.log(constraints);
    cameraStart();
}

window.addEventListener("load",cameraStart,true);