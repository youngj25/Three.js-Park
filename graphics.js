var wait=0, direction = -1;
var Timez, Pellets;

function setup() {
	 // create a scene, that will hold all our elements such as objects, cameras and lights.
	 scene = new THREE.Scene();
	 projector = new THREE.Projector();  
	
	 // create a camera, which defines where we're looking at.
	 camera = new THREE.PerspectiveCamera(45, 800/ 500, 0.1, 1000);
	 camera.position.set(0,0,20);
	 camera.lookAt(scene.position);
	 scene.add(camera);
	 //Scene Background of course
	 //scene.background = new THREE.Color( 0x4DD3FF );
	
	
	 // create a render and set the size
	 renderer = new THREE.WebGLRenderer({ antialias: true} );
	 renderer.setClearColor(new THREE.Color(0x000000, 0.0));
	 //set the size
	 renderer.setSize(window.innerWidth*0.58, window.innerHeight*0.75);
	 //renderer.shadowMapEnabled = true	
	 
	 var controls = new THREE.TrackballControls( camera );
	 controls.rotateSpeed = 1.0;
	 controls.zoomSpeed = 1.2;
	 controls.panSpeed = 0.8;
	 controls.noZoom = false;
	 controls.noPan = false;
	 controls.staticMoving = true;
	 controls.dynamicDampingFactor = 0.3; 
	
	 //add spotlight for the shadows
	 var spotLight = new THREE.SpotLight(0xffffff,1);
	 spotLight.castShadow = true;
	 spotLight.intensity =4;
	 spotLight.position.set(-7.5,-1,-3); //xyz
	// scene.add(spotLight);
	
	 try{
		 Timez = new THREEx.DynamicText2DObject();
		 Timez.parameters.text= "Clocks"; //CHANGED
		 //Timez.parameters.font= "70px Arial";
		 Timez.parameters.fillStyle= "LightGrey";
		 Timez.parameters.align = "center";
		 Timez.dynamicTexture.canvas.width = 512;
		 Timez.position.set(-7.5,-6.8, 4.75);
		 Timez.scale.set(5,4,1);
		 Timez.material.lights = true;
		 Timez.material.lightMapIntensity = 3;
		 Timez.material.reflectivity =1;
		 Timez.material.shininess = 1;
		 Timez.material.refractionRatio = 1;
		 Timez.update();
		 scene.add(Timez);
		 //console.log(Timez);
	 }
	 catch(e){
		 //functionToHandleError(e);		
		 //He HE HE don't say a word if errors happen
	 }
	
		
	 //From Pacman 3D
	 var createPedals = function () {
		 return function () {
			 //Pellets lol I made this one too!!! :D
			 //Loader for Sprites
			 var loader = new THREE.TextureLoader();
			 loader.crossOrigin = true;
			 var Texture00 = loader.load( 'Images/Bpedal - Copy.png' );
		 	 Texture00.minFilter = THREE.LinearFilter;
			 var Pells = new THREE.SpriteMaterial( { map: Texture00, color: 0xff5599 } );
		 	 Pellets =  new THREE.Sprite(Pells);	
			 //console.log(Pellets);
			 Pellets.scale.set(0.5,0.25,1);
			 //Pellets.scale.set(0.5,0.5,1);
			 Pellets.material.lights = true;
			 Pellets.castShadow = true;
			
			 Pellets.name = Math.floor(Math.random()*5);
			 //console.log(Pellets.name);
			 Pellets.position.set(	 Math.floor(Math.random()*20)-5, 	//X
												 Math.floor(Math.random()*15)-5, 	//Y
												 Math.floor(Math.random()*8)); 		//Z
			 scene.add(Pellets);
		 };
	 }();	
	
	 //Pedals
	 for(var x = 0; x < 25; x++)
		 createPedals();
	
	console.log("Start:");
	console.log(Pellets);
	
	
	
		
	 //Loader
	 var loader = new THREE.TextureLoader();
	 loader.crossOrigin = true;
		
	 //Grass
	 var grass = loader.load( 'Images/hd-grass-background-1.jpg' );
	 grass.minFilter = THREE.LinearFilter;
	 var planeGeometry = new THREE.PlaneBufferGeometry (37.5, 15,0);	
	 var planeMaterial =  new THREE.MeshLambertMaterial( { map: grass, color: 0xffffff } );
	 var Board = new THREE.Mesh(planeGeometry, planeMaterial);
	 Board.position.set(0,-5.8,0); //xyz
	 Board.rotation.x = -1.45
	 Board.lights = true;
	 scene.add(Board);
	
	 //Tree
	 var wood = loader.load( 'Images/tree-218738_960_720.jpg' );
	 wood.minFilter = THREE.LinearFilter;
	 var planeMaterial2 =  new THREE.MeshLambertMaterial( { map: wood, color: 0xffffff } );
	 var geometry = new THREE.CylinderGeometry( 1.25, 1.35, 13.5, 10 );
	 var Tree = new THREE.Mesh( geometry, planeMaterial2 );
	 //Tree.position.set(-7.5,-1,-3); //xyz
	 //Tree.lights = true;
	 //scene.add( Tree );
	
	 //Moon
 	 var moon = loader.load( 'Images/moonTexture.jpg' );
	 moon.minFilter = THREE.LinearFilter;
	 var sphereGeometry = new THREE.SphereGeometry(5,16,16);
	 var sphereMaterial = new THREE.MeshBasicMaterial(  { map: moon, color: 0xffffff } );
	 var Moon = new THREE.Mesh( sphereGeometry, sphereMaterial );
	 Moon.position.set(-10,20,10); //xyz
	 scene.add( Moon );
	 //MoonLight
	 var moonLight = new THREE.PointLight( 0x5555ff, 3.25, 100 );
	 moonLight.position.x = Moon.position.x;
	 moonLight.position.y = Moon.position.y;
	 moonLight.position.z = Moon.position.z;
	 scene.add( moonLight );
	
	 //Sun //Credits: https://i.ytimg.com/vi/nUWfZfsW7uU/maxresdefault.jpg
	 var sun = loader.load( 'Images/sunTexture.jpg' );
	 sun.minFilter = THREE.LinearFilter;
	 var sphereGeometry = new THREE.SphereGeometry(5,16,16);
	 var sphereMaterial = new THREE.MeshBasicMaterial(  { map: sun, color: 0xffff00 } );
	 var Sun = new THREE.Mesh( sphereGeometry, sphereMaterial );
	 Sun.position.set(-10,20,10); //xyz
	 scene.add( Sun );
	 var sunLight = new THREE.PointLight( 0xffffff, 4, 100 );
	 sunLight.position.x = Sun.position.x;
	 sunLight.position.y = Sun.position.y;
	 sunLight.position.z = Sun.position.z;
	 scene.add( sunLight );
	
	 //Dawn Light
	 var dawnLight = new THREE.PointLight( 0x00ff00, 2, 100 );
	 //scene.add( dawnLight );
	
	 //Dusk Light
	 var duskLight = new THREE.PointLight( 0xff0000, 2.5, 100 );
	 //scene.add( duskLight );
	
	 var SetLightSource = new THREE.PointLight( 0x000000, 0.15, 100 );
	 SetLightSource.position.set(0,30,-10); //xyz
	 scene.add( SetLightSource );
	
	 //Bench
	 var wood = loader.load( 'Images/depositphotos_18826293-stock-photo-wood-texture-white-wooden-background.jpg' );
	 wood.minFilter = THREE.LinearFilter;
 	 var planeGeometry3 = new THREE.BoxGeometry (5.5, 2.5,0.25);
	 var planeMaterial3 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
	 var BenchB = new THREE.Mesh(planeGeometry3, planeMaterial3);
	 BenchB.position.set(2.5,-2,1); //xyz
	 BenchB.rotation.x = -1.25
	 //Stop bench for now
	 //scene.add(BenchB);
	
	 //var planeGeometry3 = new THREE.BoxGeometry (5.5, 1,0.25);
	 var planeMaterial3 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
	 var BenchT = new THREE.Mesh(planeGeometry3, planeMaterial3);
	 BenchT.position.set(2.5,-1.25,1); //xyz
	 BenchT.rotation.x = 0
	 //Stop bench for now
	 //scene.add(BenchT);
	
	 //The KEyboard Commands
	 var onKeyDown = function(event) {
		 if (event.keyCode == 38){ //Up Arrow
			 Sky.TransitioningTo = "Day";
			 console.log("Day!");
			 step = 7000;
		 }
		 else if (event.keyCode == 39){ //Right Arrow
			 Sky.TransitioningTo = "Dusk";
			 console.log("Dusk!");
			 step = 15000;
		 }
		 else if (event.keyCode == 40){ //Down Arrow
			 Sky.TransitioningTo = "Night";
			 console.log("Night!");
			 step = 20000;
		 }
		 else if (event.keyCode == 37){ //Left Arrow
			 Sky.TransitioningTo = "MidNight";
			 console.log("MidNight!");
		 	 step = 22000;
		 }
		 else if (event.keyCode == 37){ //Left Arrow
			 var d = new Date();
			 step = 22000;
	 	 }
		 else if (event.keyCode == 32){ //Left Arrow
			 console.log(Pellets);
	 	 }
		
		 //var d = new Date();
		
	 }
	 document.addEventListener('keydown', onKeyDown, false);	
	
	 //Window Resize Event
	 function onWindowResize(){
		 renderer.setSize(window.innerWidth*0.58, window.innerHeight*0.75);
		 camera.aspect = renderer.domElement.width/renderer.domElement.height;
	 }
	 window.addEventListener('resize', onWindowResize, false);
	 //https://stackoverflow.com/questions/20290402/three-js-resizing-canvas?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
	
	 //Sky Colors based on Timezs
	 var Dawn = { //4am
		 R:132,
		 G:109,
		 B:231,
		 LightR:5,
		 LightG:0,
		 LightB:20,
		 PedalR:255,
		 PedalG:185,
		 PedalB:205,
		 TransitionTime:6000
	 };
	
	 var Day = { //9am
		 R:77,
		 G:223,
		 B:255,
		 LightR:10,
		 LightG:15,
		 LightB:15,
		 PedalR:255,
		 PedalG:235,
		 PedalB:235,
		 TransitionTime:15500
	 };
	
	 var Dusk = {//6pm
		 R:255,
		 G:193,
	 	 B:151,
		 LightR:9,
		 LightG:4,
		 LightB:3,
		  PedalR:200,
		 PedalG:125,
		 PedalB:255,
		 TransitionTime:17500
	 }; 
	
	 var Sky = {//Chaning variable
		 R:25,
		 G:46,
		 B:105,
		 LightR:2,
		 LightG:2,
		 LightB:5,
		 PedalR:255,
		 PedalG:85,
		 PedalB:153,
		 TransitioningTo: "Night"
	 };
	
	 var Night = {//9pm
		 R:25,
		 G:46,
		 B:105,
		 LightR:1,
		 LightG:1,
		 LightB:3,
		 PedalR:240,
		 PedalG:85,
		 PedalB:190,
		 TransitionTime:22500
	 };
	
	 var MidNight = { //12am
		 R:12,
		 G:8,
		 B:26,
		 LightR:1,
		 LightG:1,
		 LightB:1,
		 PedalR:255,
		 PedalG:85,
		 PedalB:153,
		 TransitionTime:4500
	 };
	
	 //scene.background = new THREE.Color( 0x4DD3FF );
	 scene.background = new THREE.Color( "rgb("+Sky.R+","+Sky.G+","+Sky.B+")" );
		
	 //add the output of the renderer to the html element
	 document.getElementById("WebGL-output").appendChild(renderer.domElement);
	 //controls = new THREE.OrbitControls(camera, renderer.domElement);
	 //orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);
	
	 //call the render function
	 renderer.render(scene, camera);
		
	 //call the render function
	 //var step = 0;
	 var step = 22450;
	 //backgroundInterval for the step to update the screen background
	 var backgroundInterval = 5;
	 //Divisor for the change between the colors
	 var colorDivisor  = 100;
	
	 //Free Rendering... it will run and run and run as much as it wants
	 renderScene();
			 
	 function renderScene(){
		 //Render steps
			 step = Math.round(1+step);
			
			 //render using requestAnimationFrame
			 requestAnimationFrame(renderScene);
			 renderer.render(scene, camera);
			
			 if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Dusk"){
				 Sky.R = -(Sky.R-Dusk.R)/(4000/backgroundInterval) + Sky.R;
				 Sky.G = -(Sky.G-Dusk.G)/(4000/backgroundInterval) + Sky.G;
				 Sky.B = -(Sky.B-Dusk.B)/(4000/backgroundInterval) + Sky.B;
				
				 scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
				
				 //The SetLightSource becomes purple for dawn color
				 Sky.LightR = -(Sky.LightR-Dusk.LightR)/(4000/backgroundInterval) + Sky.LightR;
				 Sky.LightG = -(Sky.LightG-Dusk.LightG)/(4000/backgroundInterval) + Sky.LightG;
				 Sky.LightB = -(Sky.LightB-Dusk.LightB)/(4000/backgroundInterval) + Sky.LightB;
				
				 SetLightSource.color.r = Sky.LightR;
				 SetLightSource.color.g = Sky.LightG;
				 SetLightSource.color.b = Sky.LightB;
				
				 //Pedals
				 Sky.PedalR = -(Sky.PedalR-Dusk.PedalR)/(4000/backgroundInterval) + Sky.PedalR;
				 Sky.PedalG = -(Sky.PedalG-Dusk.PedalG)/(4000/backgroundInterval) + Sky.PedalG;
				 Sky.PedalB = -(Sky.PedalB-Dusk.PedalB)/(4000/backgroundInterval) + Sky.PedalB;
				
				
				 if(step >= 17500 ){
					 Sky.TransitioningTo = "Night";
					 console.log( "Moving towards " + Sky.TransitioningTo);
				 }
			 }
			else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Night"){
				 //Sky Color 
				 Sky.R = -(Sky.R-Night.R)/(2750/backgroundInterval)  + Sky.R;
				 Sky.G = -(Sky.G-Night.G)/(2750/backgroundInterval)  + Sky.G;
				 Sky.B = -(Sky.B-Night.B)/(2750/backgroundInterval)  + Sky.B;
				
				 scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
				
				 //The SetLightSource becomes purple for dawn color
				 Sky.LightR = -(Sky.LightR-Night.LightR)/(2750/backgroundInterval) + Sky.LightR;
				 Sky.LightG = -(Sky.LightG-Night.LightG)/(2750/backgroundInterval) + Sky.LightG;
				 Sky.LightB = -(Sky.LightB-Night.LightB)/(2750/backgroundInterval) + Sky.LightB;
				
				 //Setting the Color of the lights
				 SetLightSource.color.r = Sky.LightR;
				 SetLightSource.color.g = Sky.LightG;
				 SetLightSource.color.b = Sky.LightB;
				
				 //Pedals
				 Sky.PedalR = -(Sky.PedalR-Night.PedalR)/(2750/backgroundInterval) + Sky.PedalR;
				 Sky.PedalG = -(Sky.PedalG-Night.PedalG)/(2750/backgroundInterval) + Sky.PedalG;
				 Sky.PedalB = -(Sky.PedalB-Night.PedalB)/(2750/backgroundInterval) + Sky.PedalB;
		
				
				if(step >= 22000 ){
					Sky.TransitioningTo = "MidNight";
					//Timez.parameters.fillStyle= "Orange"; //Orange 
					//Timez.update();
					//scene.add(Timez);
					
					//CountDown
					//CountDown.parameters.fillStyle= "Yellow"; //Light Green
					//CountDown.update();
					
					console.log( "Moving towards " + Sky.TransitioningTo);
				}
					
			}
			else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "MidNight"){
				Sky.R = -(Sky.R-MidNight.R)/(2000/backgroundInterval) + Sky.R;
				Sky.G = -(Sky.G-MidNight.G)/(2000/backgroundInterval) + Sky.G;
				Sky.B = -(Sky.B-MidNight.B)/(2000/backgroundInterval) + Sky.B;
				
				scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
				
				//The SetLightSource becomes purple for dawn color
				Sky.LightR = -(Sky.LightR-MidNight.LightR)/(2000/backgroundInterval) + Sky.LightR;
				Sky.LightG = -(Sky.LightG-MidNight.LightG)/(2000/backgroundInterval) + Sky.LightG;
				Sky.LightB = -(Sky.LightB-MidNight.LightB)/(2000/backgroundInterval) + Sky.LightB;
				
				SetLightSource.color.r = Sky.LightR;
				SetLightSource.color.g = Sky.LightG;
				SetLightSource.color.b = Sky.LightB;
				
				//Pedals
				 Sky.PedalR = -(Sky.PedalR-MidNight.PedalR)/(2000/backgroundInterval) + Sky.PedalR;
				 Sky.PedalG = -(Sky.PedalG-MidNight.PedalG)/(2000/backgroundInterval) + Sky.PedalG;
				 Sky.PedalB = -(Sky.PedalB-MidNight.PedalB)/(2000/backgroundInterval) + Sky.PedalB;
				
				
				if(step>=24000) step = 0;
				
				if(step >= 4500 && step <18000) {
					Sky.TransitioningTo = "Dawn"
					//Timez.parameters.fillStyle= "Blue";
					
					//CountDown
					//CountDown.parameters.fillStyle= "Orange"; //Light Green
					//CountDown.update();
					
					console.log( "Moving towards " + Sky.TransitioningTo);
				}
			}
			else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Dawn"){
				Sky.R = -(Sky.R-Dawn.R)/(2000/backgroundInterval) + Sky.R;
				Sky.G = -(Sky.G-Dawn.G)/(2000/backgroundInterval) + Sky.G;
				Sky.B = -(Sky.B-Dawn.B)/(2000/backgroundInterval) + Sky.B;
				
				scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
				
				//The SetLightSource becomes purple for dawn color
				Sky.LightR = -(Sky.LightR-Dawn.LightR)/(2000/backgroundInterval) + Sky.LightR;
				Sky.LightG = -(Sky.LightG-Dawn.LightG)/(2000/backgroundInterval) + Sky.LightG;
				Sky.LightB = -(Sky.LightB-Dawn.LightB)/(2000/backgroundInterval) + Sky.LightB;
				
				SetLightSource.color.r = Sky.LightR;
				SetLightSource.color.g = Sky.LightG;
				SetLightSource.color.b = Sky.LightB;
				
				//Pedals
				 Sky.PedalR = -(Sky.PedalR-Dawn.PedalR)/(2000/backgroundInterval) + Sky.PedalR;
				 Sky.PedalG = -(Sky.PedalG-Dawn.PedalG)/(2000/backgroundInterval) + Sky.PedalG;
				 Sky.PedalB = -(Sky.PedalB-Dawn.PedalB)/(2000/backgroundInterval) + Sky.PedalB;
				
				if(step >= 6500 ){
					Sky.TransitioningTo = "Day"
					console.log( "Moving towards " + Sky.TransitioningTo);
				}
			}					
			else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Day"){
				Sky.R = -(Sky.R-Day.R)/(4500/backgroundInterval)  + Sky.R;
				Sky.G = -(Sky.G-Day.G)/(4500/backgroundInterval)  + Sky.G;
				Sky.B = -(Sky.B-Day.B)/(4500/backgroundInterval)  + Sky.B;
				
				scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
				
				//The SetLightSource becomes purple for dawn color
				Sky.LightR = -(Sky.LightR-Day.LightR)/(4500/backgroundInterval) + Sky.LightR;
				Sky.LightG = -(Sky.LightG-Day.LightG)/(4500/backgroundInterval) + Sky.LightG;
				Sky.LightB = -(Sky.LightB-Day.LightB)/(4500/backgroundInterval) + Sky.LightB;
				
				SetLightSource.color.r = Sky.LightR;
				SetLightSource.color.g = Sky.LightG;
				SetLightSource.color.b = Sky.LightB;
				
				 //Pedals
				 Sky.PedalR = -(Sky.PedalR-Day.PedalR)/(4500/backgroundInterval) + Sky.PedalR;
				 Sky.PedalG = -(Sky.PedalG-Day.PedalG)/(4500/backgroundInterval) + Sky.PedalG;
				 Sky.PedalB = -(Sky.PedalB-Day.PedalB)/(4500/backgroundInterval) + Sky.PedalB;
				
				if(step >= 13500 ){
					Sky.TransitioningTo = "Dusk"
					console.log( "Moving towards " + Sky.TransitioningTo);
					//Timez.parameters.fillStyle= "Orange"; //Orange 
					Timez.update();
				}
			}
				
		 scene.traverse(function (e) {
			 //if( e == p || e == q){
			 //if (e instanceof THREE.Mesh) {
			 if (e instanceof THREE.Sprite || e instanceof THREE.Mesh) {
				 if(e == Tree){
					 //nsole.log("Trial!!");
					 //Don't move the tree
					 //e.rotation.z = 0.001 * Math.sin(step);
				 }
				 else if(e == Board){
					 //nsole.log("Trial!!");
					 //Don't need to move the grass
					 //e.rotation.z = 0.001 * Math.sin(step);
					 //e.position.x = 0.009 * Math.sin(step);
				 }
				 else if(e == Moon){
					 //Have the Moon Rotate sideways
					e.rotation.y += 0.003;
					e.position.x = - Math.sin( Math.PI * (step-1000)/12000)*140;
					e.position.z = 40- Math.cos( Math.PI * step/12000)*90;
					moonLight.position.x = e.position.x;
					moonLight.position.z = e.position.z;
				 }
				 else if(e == Sun){
					 e.rotation.z += 0.003;
					 e.position.x =  Math.sin( Math.PI * (step-1000)/12000)*140;
					 e.position.z =40+  Math.cos( Math.PI * step/12000)*90;
					 sunLight.position.x = e.position.x;
					 sunLight.position.z = e.position.z;
				 } 
				 else if(e == dawnLight){
					 //To keep the material lit
					 e.position.x =  Math.sin( Math.PI * (step+5000)/12000)*140;
					 e.position.z =35 + Math.cos( Math.PI * (step+1500)/12000)*80;
				 }
				 else if(e == duskLight){
					 //To keep the material lit
					 e.position.x =  Math.sin( Math.PI * (step-4000)/12000)*140;
					 e.position.z =35 + Math.cos( Math.PI * (step-3000)/12000)*80;
				 }
				 else if(e == BenchB){
					 e.rotation.x -= 0.003 * Math.sin(step/1000);
					 e.position.z += 0.025 * Math.sin(step/1000);
					 e.position.y = -Math.abs(1.25 * Math.sin(step/1000)) - 2;
					 //e.position.x = 0.009 * Math.sin(step);
				 }
				 else if(e == BenchT){
					 e.rotation.x -= 0.003 * Math.sin(step/1000);
					 e.position.z += 0.0025 * Math.sin(step/1000);
					 e.position.y = -Math.abs(1.25 * Math.sin(step/1000)) - 1.25;
					 //e.position.x = 0.009 * Math.sin(step);
				 }
				 else if(e == Timez){
					 var hours = Math.floor(((step-1000)/1000)%12)+1;
					 if(hours == 0) hours =12;
					
					 var minutes = Math.floor(((step%1000)/1000)*60);
					
					 if( minutes < 10 && step>=12000) e.parameters.text= hours+":0"+minutes+" PM";
					 else if( minutes < 10 && step<12000) e.parameters.text= hours+":0"+minutes+" AM";
					 else if( minutes >= 10 && step>=12000) e.parameters.text= hours+":"+minutes+" PM";
					 else e.parameters.text= hours+":"+minutes+" AM"; //CHANGED
					
					 e.update();
				 }
				 else if(e != THREE.PointLight){ // Pedals
					 
					 //First Update the color of the pedals
					 e.material.color  = new THREE.Color("rgb("+  Math.floor(Sky.PedalR) +","+  Math.floor(Sky.PedalG) +","+  Math.floor(Sky.PedalB) +")");
					 
					 if(e.name == 0){
						 e.position.y -= (0.02 + 0.01* Math.sin(step/120));
						 e.position.x -= 0.05 * Math.sin(step/120 + 1);
						 e.material.rotation = 0.6*Math.sin(step/120 + 1);
					 }
					 else if(e.name == 1){
						 e.position.y -= (0.02 + 0.01* Math.sin(step/120));
						 e.position.x -= 0.05 * Math.cos(step/120 + 0.5);
						 e.material.rotation = 0.6*Math.cos(step /120+ 0.5);
					 }
					 else if(e.name == 2){
						 e.position.y -= 0.008;
						 e.position.x -= 0.05 * Math.sin(step/120 + 0.5);
						 e.material.rotation += 0.12;
					 }
					 else if(e.name == 3){
						 e.position.y -= 0.0075;
						 e.position.z -= 0.05 * Math.sin(step/120 + 0.5)/ 5;
						 e.position.x -= 0.05 * Math.sin(step/120 + 0.5)/5;
						 e.material.rotation = Math.sin(step/120 + 0.5);;
					 }
					 else if(e.name == 4){
						 e.position.y -= 0.003+Math.sin(step/60 )*0.002;
						 e.position.z = -3 + Math.sin(step/60 + 0.5)*5;
						 e.position.x =  e.position.x - Math.sin(step/120 + 0.5)/15;
						 e.material.rotation = Math.sin(step/60 + 0.5);;
						
						 if(e.position.y <=-5){
							  e.position.y = 10;
						 }
					 }
					 
					 if(e.position.y <=-8){
						  e.position.y = 10;
					 }
					 
				 }
			 }
		 });
	 }
}

window.onload = setup;	