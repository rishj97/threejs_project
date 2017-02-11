function onDocumentMouseMove( event ) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      mouse.z = 0.5;
      mouse_.x = mouse.x;
      mouse_.y = mouse.y;
      mouse.unproject( camera );
      var dir = mouse.sub( camera.position ).normalize();
      var distance = - camera.position.z / dir.z;
      pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
      pos.z = 0.5;   
}
function onDocumentMouseDown( event ) {
      oceanAmbientSound.play();
      //scene.add(light1);
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      mouse.z = 0.5;
      mouse_.x = mouse.x;
      mouse_.y = mouse.y;
      mouse.unproject( camera );
      var dir = mouse.sub( camera.position ).normalize();
      var distance = - camera.position.z / dir.z;
      pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
      pos.z = 0.5;
      mouseDown = true;
}
function onDocumentMouseUp( event ) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      mouse.z = 0.5;
      mouse_.x = mouse.x;
      mouse_.y = mouse.y;
      mouse.unproject( camera );
      var dir = mouse.sub( camera.position ).normalize();
      var distance = - camera.position.z / dir.z;
      pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
      pos.z = 0.5;
      mouseDown = false;   
}
document.addEventListener('keydown', function(event) {
      keyCode = event.keyCode;
      if(keyCode == 39 ) {
          rotateY = -1;
      } else if (keyCode == 37 ) {
          rotateY = 1;
      } else if (keyCode == 38 ) {
          move = 1;
      } else if (keyCode == 40 ) {
          move = -1;
      }
});

document.addEventListener('keyup', function(event) {
      keyCode = event.keyCode;
      if(keyCode == 39 ) {
          rotateY = 0;
      } else if (keyCode == 37 ) {
          rotateY = 0;
      } else if (keyCode == 38 ) {
          move = 0;
      } else if (keyCode == 40 ) {
          move = 0;
      }
});