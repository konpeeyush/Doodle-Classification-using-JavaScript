let catsData;
let rainbowsData;
let treeData;

let catsTraining;
let treeTraining;
let rainbowsTraining;

const len = 784;
const totalData = 1000;

let cats = {};
let tree = {};
let rainbows = {};

const CAT = 0;
const TREE = 1;
const RAINBOW = 2;

let nn;

function preload() {
  catsData = loadBytes('Data/cat1000.bin');
  rainbowsData = loadBytes('Data/rainbow1000.bin');
  treeData = loadBytes('Data/tree1000.bin');
}

function setup() {
  createCanvas(280, 280);
  background(255);
  prepData(cats, catsData, CAT);
  prepData(rainbows, rainbowsData, RAINBOW);
  prepData(tree, treeData, TREE);
  // printData(cats) ;

  // Training the Neural Network
  //784 Input nodes, 64 hidden nodes, 3 output nodes
  nn = new NeuralNetwork(784, 64, 3);

  //Randomly shuffle the data
  let training = [];
  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(tree.training);
  shuffle(training, true);


  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(tree.testing);


  let trainButton = select('#train');
  let epochCounter = 0;
  const msg=document.getElementById("msg");
  trainButton.mousePressed(() => {
    trainEpoch(training)
    msg.innerHTML="Training done!";
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  testButton = select('#test');
  testButton.mousePressed(() => {
    let percent = testAll(testing);
    msg.innerHTML="Testing done! "+nf(percent, 2, 2)+"%";
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });

  let guessButton=select('#guess');
  guessButton.mousePressed(()=>{
    let inputs=[] ;
    let img=get();
    img.resize(28,28);
    img.loadPixels();

    for(let i=0;i<len;i++){
      //i*4: skipping every 4th pixel
      let bright=img.pixels[i*4];
      inputs[i]=(255-bright)/255.0;
    }

    let guess=nn.predict(inputs);
    let m=max(guess);
    let classification=guess.indexOf(m);
    if(classification===CAT){
      msg.innerHTML="I think it's a cat!";
      console.log("Cat");
    }
    else if(classification===TREE){
      msg.innerHTML="I think it's a tree!";
      console.log("Tree");
    } 
    else if(classification===RAINBOW){
      msg.innerHTML="I think it's a rainbow!";
      console.log("Rainbow");
    }
  });

  let clearButton=select('#clear');
  clearButton.mousePressed(()=>{
    msg.innerHTML="Cleared!";
    background(255);
  });
}

function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    //pmouse: previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
