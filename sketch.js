
var angle = 0;
var r = 180;
var total = 100;
var points = new Array(total+1);

/* function preload(){

} */

function setup() {
  createCanvas(500, 500, WEBGL);
  translate(width/2, height/2);

  colorMode(HSB);
  ambientLight(150);

  // for(let i = 0; i < total+1; i++){
  //   points[i] = new Array(total+1);
  //   let theta = map(i, 0, total, 0, PI);

  //   for(let j = 0; j < total+1; j++){
  //     let phi = map(j, 0, total, 0, TWO_PI);
  //     let x = r * sin(theta) * cos(phi);
  //     let y = r * sin(theta) * sin(phi);
  //     let z = r * cos(theta);
  //     points[i][j] = {x, y, z};
  //   }
  // }
}

var angleY = 0;
var angleX = 0;
function mouseMoved(){
  angleY = map(mouseX - width/2, 0, width, 0, TWO_PI);
  //console.log(angleY * 360 / TWO_PI);
  angleX = map(mouseY - height/2, 0, height, 0, PI);
  
}

var a = 1;
var b = 1;

function supershape(theta, m, n1, n2, n3) {
  let t1 = abs((1/a)*cos(m * theta / 4));
  t1 = pow(t1, n2);
  let t2 = abs((1/b)*sin(m * theta/4));
  t2 = pow(t2, n3);
  let t3 = t1 + t2;
  let r = pow(t3, - 1 / n1);
  return r;

  //return 1;
}

var m = 0;
var mchange = 0;
var offset = 0;

// *************************    DRAW   **********************************
function draw() {

    m = map(sin(mchange), -1, 1, 0, 7);
    mchange += 0.02;

    background(0);

    rotateX(angleX);
    rotateY(angleY);

    //fill(255);
    //noStroke();
    //sphere(200);
    stroke(255);
    noFill();
    offset += 5;
    let h = PI / total;

    for (let i = 0; i < total+1; i++) {
      let theta = map(i, 0, total, -HALF_PI, HALF_PI);
      let r2 = supershape(theta, m, 0.2, 1.7, 1.7);
      let r21 = supershape(theta+h, m, 0.2, 1.7, 1.7);

      let rcos = r2 * cos(theta);
      let rsin = r2 * sin(theta);
      let rcos1 = r21 * cos(theta+h);
      let rsin1 = r21 * sin(theta+h);

      let hu = map(i, 0, total, 0, 255*6);
      fill((hu + offset) % 255 , 128, 128);
      beginShape(TRIANGLE_STRIP);
      for (let j = 0; j < total+1; j++) {
        let phi = map(j, 0, total, -PI, PI);
        let r1 = supershape(phi, m, 0.2, 1.7, 1.7);

        let x = r * r1 * cos(phi) * rcos;
        let y = r * r1 * sin(phi) * rcos;
        let z = r * rsin;
        let v1 = {x, y, z};

        x = r * r1 * cos(phi) * rcos1;
        y = r * r1 * sin(phi) * rcos1;
        z = r * rsin1;
        let v2 = {x, y, z};

        vertex(v1.x , v1.y , v1.z);
        vertex(v2.x, v2.y , v2.z);

      }

      endShape();
    }

}



