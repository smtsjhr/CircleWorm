var record_animation = false;
var name = "image_"

var f = 10;
var g = 4;
var h = 9.85;
var h_max = 30;
var h_min = 0;

var frame = 0;
var total_frames = 200;
var time = 0;
var rate = 2*Math.PI/total_frames;
var loop = 0;

var get_mouse_pos = false;
var get_touch_pos = false;

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

startAnimating(24);

function draw() {
  
  var H = canvas.height = 500; //window.innerHeight;

  ctx.fillStyle = 'rgba(0,0,0, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  let N = 100;
  let M = N+Math.ceil(H/(0.75*N))*N;
  let  x_pos = 50;

  for (let i = 0; i < M; i++) {
    let p = i*Math.PI/N;  
    circle(x_pos,
          0.75*i - 20 + 30*Math.sin(g*p + time),
           Math.max(0, 10*Math.sin(h*p + time) + 15*(1 + Math.sin(f*p + time)))
          );
    if ( ((i - i%N)/N)%2 === 0 ) {
      x_pos += 4;
    }
    else {
      x_pos -= 4;
    }
  } 
  
  
  frame = (frame + 1)%total_frames;
  time = frame*rate;

  
  //window.requestAnimationFrame(draw);
  
  
  canvas.addEventListener('mousedown', e => {
        get_mouse_pos = true;
        getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
        get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
          if(get_mouse_pos) {
            getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
            get_touch_pos = false;
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);

}

function startAnimating(fps) {
    
   fpsInterval = 1000 / fps;
   then = window.performance.now();
   startTime = then;
   
   animate();
}

function animate(newtime) {

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();
        
        if(record_animation) {

          if (loop === 1) { 
          let frame_number = frame.toString().padStart(total_frames.toString().length, '0');
          let filename = name+frame_number+'.png'
              
          dataURL = canvas.toDataURL();
          var element = document.createElement('a');
          element.setAttribute('href', dataURL);
          element.setAttribute('download', filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          }

          if (frame + 1 === total_frames) {
              loop += 1;
          }

          if (loop === 2) { stop_animation = true }
      }
    }
}




function circle(x,y,r) {
  
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  
}


function getMousePosition(canvas, event) {
    h = Math.max(0, h_min + h_max*event.clientY/canvas.height );    
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
    h = Math.max(0, h_min + h_max*touch.clientY/canvas.height );    
}

