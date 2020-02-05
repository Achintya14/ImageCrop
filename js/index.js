var handleOnLoadWindow = function () {
    var useFrontCamera = true;
    var track = null;
    
    //defining constants
    const  cameraView = document.querySelector("#camera-view"),
           cameraOutput = document.querySelector("#camera-output"),
           cameraSensor = document.querySelector("#camera-sensor"),
           captureTrigger = document.querySelector("#camera-trigger"),
           flipTrigger = document.querySelector("#flip-trigger"),
           saveTrigger = document.querySelector("#save");
    
    //access the device camera and steam to cameraView
    var cameraStart = function () {
        alert("Trying to detect camera");
        var foundCamera = false;
        navigator.mediaDevices.enumerateDevices().then(function(deviceInfo){
            deviceInfo.forEach(function(device){
                if ((!foundCamera) && (((device.label.indexOf("front") > -1) && useFrontCamera) || ((device.label.indexOf("back") > -1) && !useFrontCamera))){
                    
                    var constraints = { 
                        video: { deviceID: device.deviceId },
                        audio: false
                    };
                    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
                        console.log(stream.getTracks())
                        track = stream.getTracks()[0];
                        cameraView.srcObject = stream;
                        useFrontCamera = !useFrontCamera;
                    }).catch(function(error){
                        console.error("Oops. Something is broken.",error);
                    });
                    foundCamera = true;
                    alert("camera found");
                }
                if (!foundCamera) {
                    alert("no camera found - resorting to default");
                    var constraints = { 
                        video: {},
                        audio: false
                    };
                    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
                        console.log(stream.getTracks())
                        track = stream.getTracks()[0];
                        cameraView.srcObject = stream;
                    }).catch(function(error){
                        console.error("Oops. Something is broken.",error);
                    });
                    foundCamera = true;
                }
            });
        }).catch(function(error){
            console.error(error);
        })
    };
    
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
        alert("Trying to flip camera");
        cameraStart();
    }

    cameraStart();
};

window.addEventListener("load",handleOnLoadWindow,true);