var wait=0, direction = -1;
var Timez;
var petalTextures = null, sunTexture;
var moonLight, sunLight;
var graphicSettings, graphicSky;
var objects = [];

function setup() {
	 // create a scene, that will hold all our elements such as objects, cameras and lights.
	 scene = new THREE.Scene();
	
	 // create a camera, which defines where we're looking at.
	 camera = new THREE.PerspectiveCamera(45, 800/ 500, 0.1, 1000);
	 camera.position.set(0,0,20);
	 camera.lookAt(scene.position);
	 scene.add(camera);	
	
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
	
	 // The Graphic Settings
	 graphicSettings = {
		 time: "gameTime",
		 music: false,
		 backgroundInterval : 5,
		 sky : 4,
		 R:25,
		 G:46,
		 B:105,
		 LightR:2,
		 LightG:2,
		 LightB:5,
		 PedalR:255,
		 PedalG:85,
		 PedalB:153,
		 TransitioningTo: "MidNight",
		 NightTheme:0.2,
		 SummerTheme:0,
		 SpringTheme:0		 
	 }
		
	 //add spotlight for the shadows
	 var spotLight = new THREE.SpotLight(0xffffff,1);
	 spotLight.castShadow = false;
	 spotLight.intensity =0.5;
	 spotLight.position.set(-10,5, 350); //xyz
	 scene.add(spotLight);	 
	
	 // Timez - The Clock in the bottom left corner
	 Timez = new THREEx.DynamicText2DObject();
	 Timez.parameters.text= "Clocks"; //CHANGED
	 Timez.parameters.fillStyle= "Black";
	 Timez.parameters.align = "center";
	 Timez.posX = -7.5;
	 Timez.posY =  -6.8;
	 Timez.posZ = 4.75;
	 Timez.position.set( Timez.posX, Timez.posY, Timez.posZ);
	 Timez.scale.set(5,4,1);
	 Timez.material.lightMapIntensity = 0;
	 Timez.material.reflectivity =0;
	 Timez.update();
	 Timez.name = "Clock";
	 Timez.type = "button";
	 scene.add(Timez);
	 objects.push(Timez);
	 //console.log(Timez);		 
		 
	 // Petals Added to the Scene
	 for(var x = 0; x < 25; x++)
		 scene.add(createPetals());
	 
	 /**
	 // Audio
	 var listener = new THREE.AudioListener();
	 camera.add( listener );
	 
	 var NightTheme = new THREE.Audio( listener );
	 var audioLoader = new THREE.AudioLoader();
	 audioLoader.load('Audio/Night - [Rune Factory Frontier].mp3', function( buffer ) {
		 NightTheme.setBuffer( buffer );
		 NightTheme.setLoop( true );
		 NightTheme.setVolume( 0.2 );
	 });
	
	
	 var SpringTheme = new THREE.Audio( listener );
	 audioLoader = new THREE.AudioLoader();
	 audioLoader.load('Audio/Spring - [Rune Factory Frontier].mp3', function( buffer ) {
		 SpringTheme.setBuffer( buffer );
		 SpringTheme.setLoop( true );
		 SpringTheme.setVolume( 0.2 );
	 });
	 
	 var SummerTheme = new THREE.Audio( listener );
	 audioLoader = new THREE.AudioLoader();
	 audioLoader.load('Audio/Summer - [Rune Factory Frontier].mp3', function( buffer ) {
		 SummerTheme.setBuffer( buffer );
		 SummerTheme.setLoop( true );
		 SummerTheme.setVolume( 0.2 );
	 });
	 **/	
	
	 // Dawn Light
	 //var dawnLight = new THREE.PointLight( 0x00ff00, 2, 100 );
	 //scene.add( dawnLight );
	
	 // Dusk Light
	 //var duskLight = new THREE.PointLight( 0xff0000, 2.5, 100 );
	 //scene.add( duskLight );
	
	 var SetLightSource = new THREE.PointLight( 0x000000, 0.15, 100 );
	 SetLightSource.position.set(0,30,-10); //xyz
	 scene.add( SetLightSource );
	 
	 //The Keyboard Commands
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
		 else if (event.keyCode == 32){ //Space Bar -- my double check for values and status
			 console.log(NightTheme ) ;
			 console.log("Sky: "+Sky.NightTheme ) ;
			 console.log(NightTheme.volume ) ;
			 console.log("Sp:"+SpringTheme.isPlaying ) ;
			 console.log("Su:"+SummerTheme.isPlaying ) ;
			 console.log("N:"+NightTheme.isPlaying ) ;
			 //console.log(Pellets);
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
	
	 // scene.background = new THREE.Color( 0x4DD3FF );
	 scene.background = new THREE.Color( "rgb("+graphicSettings.R+","+graphicSettings.G+","+graphicSettings.B+")" );
		
	 // add the output of the renderer to the html element
	 document.getElementById("WebGL-output").appendChild(renderer.domElement);
	 // controls = new THREE.OrbitControls(camera, renderer.domElement);
	 // orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);
	
	 // call the render function
	 renderer.render(scene, camera);
		
	 // call the render function
	 // var step = 0;
	 var step = 22450;
	 
	 loading_Sky_Colors();
	 load_Images();
	 renderScene();
	 drag_objects();
	 
	 
	 // 
	 function renderScene(){
		 // Render steps
		 step = Math.round(1+step);
		
		 // render using requestAnimationFrame
		 requestAnimationFrame(renderScene);
		 renderer.render(scene, camera);
		
		 if(step % graphicSettings.backgroundInterval == 0){
			 graphicSettings.R = -(graphicSettings.R-graphicSky[graphicSettings.sky].R)/(2000/graphicSettings.backgroundInterval) + graphicSettings.R;
			 graphicSettings.G = -(graphicSettings.G-graphicSky[graphicSettings.sky].G)/(2000/graphicSettings.backgroundInterval) + graphicSettings.G;
			 graphicSettings.B = -(graphicSettings.B-graphicSky[graphicSettings.sky].B)/(2000/graphicSettings.backgroundInterval) + graphicSettings.B;
			
			 scene.background = new THREE.Color( "rgb("+Math.round(graphicSettings.R)+","+Math.round(graphicSettings.G)+","+Math.round(graphicSettings.B)+")" );
			
			 // The SetLightSource becomes purple for dawn color
			graphicSettings.LightR = -(graphicSettings.LightR-graphicSky[graphicSettings.sky].LightR)/(2000/graphicSettings.backgroundInterval) + graphicSettings.LightR;
			graphicSettings.LightG = -(graphicSettings.LightG-graphicSky[graphicSettings.sky].LightG)/(2000/graphicSettings.backgroundInterval) + graphicSettings.LightG;
			graphicSettings.LightB = -(graphicSettings.LightB-graphicSky[graphicSettings.sky].LightB)/(2000/graphicSettings.backgroundInterval) + graphicSettings.LightB;
			
			 SetLightSource.color.r = graphicSettings.LightR;
			 SetLightSource.color.g = graphicSettings.LightG;
			 SetLightSource.color.b = graphicSettings.LightB;
			
			 // Pedals
			 graphicSettings.PedalR = -(graphicSettings.PedalR-graphicSky[graphicSettings.sky].PedalR)/(2000/graphicSettings.backgroundInterval) + graphicSettings.PedalR;
			 graphicSettings.PedalG = -(graphicSettings.PedalG-graphicSky[graphicSettings.sky].PedalG)/(2000/graphicSettings.backgroundInterval) + graphicSettings.PedalG;
			 graphicSettings.PedalB = -(graphicSettings.PedalB-graphicSky[graphicSettings.sky].PedalB)/(2000/graphicSettings.backgroundInterval) + graphicSettings.PedalB;
			 
			 // 			 
			 if((step%24000) == graphicSky[graphicSettings.sky].TransitionTime) {
				 graphicSettings.sky = (graphicSettings.sky + 1)%graphicSky.length;
				 console.log( "Moving towards " +  graphicSky[graphicSettings.sky].Day);
			 }
		 }	
			
			
			
	 scene.traverse(function (e) {
			 //if (e instanceof THREE.Mesh) {
			 if (e instanceof THREE.Sprite || e instanceof THREE.Mesh) {
				 if(e.name == "Moon"){
					 //Have the Moon Rotate sideways
					e.rotation.y += 0.003;
					e.position.x = - Math.sin( Math.PI * (step-1000)/12000)*140;
					e.position.z = 40- Math.cos( Math.PI * step/12000)*90;
					moonLight.position.x = e.position.x;
					moonLight.position.z = e.position.z;
				 }
				 else if(e.name == "Sun"){
					 e.rotation.z += 0.001;
					 e.position.x =  Math.sin( Math.PI * (step-1000)/12000)*140;
					 e.position.z =40+  Math.cos( Math.PI * step/12000)*90;
					 sunLight.position.x = e.position.x;
					 sunLight.position.z = e.position.z;
				 } 
				 /**
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
				 **/
				 else if(e == Timez){
					 
					 if(graphicSettings.time == "gameTime"){
						 var hours = Math.floor((((step%24000)-1000)/1000)%12)+1;
						 if(hours == 0) hours =12;
						
						 var minutes = Math.floor((((step%24000)%1000)/1000)*60);
						
						 if( minutes < 10 && (step%24000)>=12000) e.parameters.text= hours+":0"+minutes+" PM";
						 else if( minutes < 10 && (step%24000)<12000) e.parameters.text= hours+":0"+minutes+" AM";
						 else if( minutes >= 10 && (step%24000)>=12000) e.parameters.text= hours+":"+minutes+" PM";
						 else e.parameters.text= hours+":"+minutes+" AM"; //CHANGED
						 
						 if(((step%24000) < 7000) || ((step%24000) > 16000))
							 e.parameters.fillStyle= "White";
						 else
							 e.parameters.fillStyle= "Black";
					 }
					 
					 e.update();
				 }
				 else if(e.name == "Petals"){ 
					 
					 // First Update the color of the petals
					 e.material.color  = new THREE.Color("rgb("+  Math.floor(graphicSettings.PedalR) +","+  Math.floor(graphicSettings.PedalG) +","+  Math.floor(graphicSettings.PedalB) +")");
					  
					 if(e.type == 0){
						 e.position.y -= (0.02 + 0.01* Math.sin(step/120));
						 e.position.x -= 0.05 * Math.sin(step/120 + 1);
						 e.material.rotation = 0.6*Math.sin(step/120 + 1);
					 }
					 else if(e.type == 1){
						 e.position.y -= (0.02 + 0.01* Math.sin(step/120));
						 e.position.x -= 0.05 * Math.cos(step/120 + 0.5);
						 e.material.rotation = 0.6*Math.cos(step /120+ 0.5);
					 }
					 else if(e.type == 2){
						 e.position.y -= 0.008;
						 e.position.x -= 0.05 * Math.sin(step/120 + 0.5);
						 e.material.rotation += 0.12;
					 }
					 else if(e.type == 3){
						 e.position.y -= 0.0075;
						 e.position.z -= 0.05 * Math.sin(step/120 + 0.5)/ 5;
						 e.position.x -= 0.05 * Math.sin(step/120 + 0.5)/5;
						 e.material.rotation = Math.sin(step/120 + 0.5);;
					 }
					 else if(e.type == 4){
						 e.position.y -= 0.003+Math.sin(step/60 )*0.002;
						 e.position.z = -3 + Math.sin(step/60 + 0.5)*5;
						 e.position.x =  e.position.x - Math.sin(step/120 + 0.5)/15;
						 e.material.rotation = Math.sin(step/60 + 0.5);;
						
						 if(e.position.y <=-5){
							  e.position.y = 10;
							  e.type = Math.floor( Math.random() * 5 );
						 }
					 }
					 
					 // Once the Petal gets to low off screen then it is shown
					 if(e.position.y <= -8){
						  e.position.y = 10;
						  e.type = Math.floor( Math.random() * 5 );
					 }
					 
				 }
			 }
		 });
	 }
	 
	 // Make Objects Draggable - Additionally used as buttons
	 function drag_objects(){
		 var dragControls  = new THREE.DragControls( objects, camera, renderer.domElement );
				
			 dragControls.addEventListener( 'dragstart', function(event) {
				 // Card Holders
				 if (event.object.name == "Clock"){
					 
					 var d = new Date();
					 console.log(d.getHours() +":" + d.getMinutes());
				 }
				
				 //console.log("lol start of drag: ");
			 });
			 
			 dragControls.addEventListener( 'drag', function(event)   {
				 if(event.object.type == "button")
					 event.object.position.set(event.object.posX, event.object.posY, event.object.posZ);
			 });
			 
			 dragControls.addEventListener( 'dragend', function(event)  {});
		 
		 //console.log(dragControls);
		 //https://www.learnthreejs.com/drag-drop-dragcontrols-mouse/
	 }
	 
	 // Create Petals
	 function createPetals() {
		 // Checks to see whether the petalTextures has been uploaded yet
		 if(petalTextures == null){
			 var loader = new THREE.TextureLoader();
			 loader.crossOrigin = true;
			 var Texture00 = loader.load( 'Images/Bpedal - Copy.png' );
			 Texture00.minFilter = THREE.LinearFilter;
			 petalTextures = new THREE.SpriteMaterial( { map: Texture00, color: 0xff5599 } );
		 }
		 
		 var Petals =  new THREE.Sprite(petalTextures);
		 Petals.scale.set(0.5,0.25,1);
		 //Pellets.scale.set(0.5,0.5,1);
		 Petals.material.lights = true;
		 Petals.castShadow = true;
		 Petals.name = "Petals";
		 Petals.type = Math.floor(Math.random()*5);
		 
		 Petals.position.set( Math.floor(Math.random()*20)-5, 	// X
										 Math.floor(Math.random()*15)-5, 	// Y
										 Math.floor(Math.random()*8)); 		// Z
	 
		 return Petals;
	 };	
	
	 // Load the Set Sky Colors
	 function loading_Sky_Colors(){
		 graphicSky = [];		 
		 
		 // 0 - Setting the MidNight - 12 AM
		 var MidNight = {
			 Day: "MidNight",
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
		 graphicSky.push(MidNight);
		 
		 // 1 - Setting the Dawn - 4 AM
		 var Dawn = {
			 Day: "Dawn",
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
		 graphicSky.push(Dawn);
		 
		 // 2 - Setting the Day - 9 AM
		 var Day = {
			 Day: "Day",
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
		 graphicSky.push(Day);
		 
		 // 3 - Setting the Dusk - 6 PM
		 var Dusk = {
			 Day: "Dusk",
			 R:145,
			 G:43,
			 B:93,
			 LightR:9,
			 LightG:4,
			 LightB:3,
			  PedalR:200,
			 PedalG:125,
			 PedalB:255,
			 TransitionTime:17500
		 }; 
		 graphicSky.push(Dusk);
		 
		 // 4 - Setting the Night - 9 PM
		 var Night = {
			 Day: "Night",
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
		 graphicSky.push(Night);
	 }
	 
	 // Load Textures
	 function load_Images(){		 
		 
		 // Loader
		 var loader = new THREE.TextureLoader();
		 loader.crossOrigin = true;
			
		 // Grass
		 var grass = loader.load( 'Images/hd-grass-background-1.jpg' );
		 grass.minFilter = THREE.LinearFilter;
		 var planeGeometry = new THREE.PlaneBufferGeometry (37.5, 15,0);	
		 var planeMaterial =  new THREE.MeshLambertMaterial( { map: grass, color: 0xffffff } );
		 var Board = new THREE.Mesh(planeGeometry, planeMaterial);
		 Board.position.set(0,-5.8,0); //xyz
		 Board.rotation.x = -1.45
		 Board.lights = true;
		 Board.name = "Grass";
		 scene.add(Board);
		
		 // Tree
		 /**
		 var wood = loader.load( 'Images/tree-218738_960_720.jpg' );
		 wood.minFilter = THREE.LinearFilter;
		 var planeMaterial2 =  new THREE.MeshLambertMaterial( { map: wood, color: 0xffffff } );
		 var geometry = new THREE.CylinderGeometry( 1.25, 1.35, 13.5, 10 );
		 var Tree = new THREE.Mesh( geometry, planeMaterial2 );
		 //Tree.position.set(-7.5,-1,-3); //xyz
		 //Tree.lights = true;
		 //scene.add( Tree );
		 **/		 
		 
		  // Moon
		 var moon = loader.load( 'Images/moonTexture.jpg' );
		 moon.minFilter = THREE.LinearFilter;
		 var sphereGeometry = new THREE.SphereGeometry(5,16,16);
		 var sphereMaterial = new THREE.MeshBasicMaterial(  { map: moon, color: 0xffffff } );
		 var Moon = new THREE.Mesh( sphereGeometry, sphereMaterial );
		 Moon.position.set(-10,20,10); //xyz
		 Moon.name = "Moon";
		 scene.add( Moon );		 
		 // Moon Light
		 moonLight = new THREE.PointLight( 0x5555ff, 3.25, 100 );
		 moonLight.position.x = Moon.position.x;
		 moonLight.position.y = Moon.position.y;
		 moonLight.position.z = Moon.position.z;
		 moonLight.name = "Moon Light";
		 scene.add( moonLight );		 
		 
		 // Sun //Credits: https://i.ytimg.com/vi/nUWfZfsW7uU/maxresdefault.jpg
		 var sun = loader.load( 'Images/sunTexture.jpg' );
		 sun.minFilter = THREE.LinearFilter;
		 var sphereGeometry = new THREE.SphereGeometry(5,16,16);
		 var sphereMaterial = new THREE.MeshBasicMaterial(  { map: sun, color: 0xffff00 } );
		 var Sun = new THREE.Mesh( sphereGeometry, sphereMaterial );
		 Sun.position.set(-10,20,10); //xyz
		 Sun.name = "Sun";
		 scene.add( Sun );
		 // Sun Light
		 sunLight = new THREE.PointLight( 0xffffff, 4, 100 );
		 sunLight.position.x = Sun.position.x;
		 sunLight.position.y = Sun.position.y;
		 sunLight.position.z = Sun.position.z;
		 sunLight.name = "Sun Light";
		 scene.add( sunLight );		 
		 
		  // Bench - For now it will stay unused 
		 /**
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
		 **/
	 }
	 
	 
}

window.onload = setup;	