var socket;
var player;
var refresh_time = 0;
var wait=0, direction = -1;


function setup() {
		// create a scene, that will hold all our elements such as objects, cameras and lights.
		var scene = new THREE.Scene();				
		
		// create a camera, which defines where we're looking at.
		var camera = new THREE.PerspectiveCamera(45, 800/ 500, 0.1, 1000);
		camera.position.set(0,0,50);
		scene.add(camera);
		//Scene Background of course
		//scene.background = new THREE.Color( 0x4DD3FF );
		
		// create a render and set the size
		var renderer = new THREE.WebGLRenderer({ antialias: true} );
		//renderer.setClearColor(new THREE.Color(0x4DD3FF, 1.0));
		renderer.setClearColor(new THREE.Color(0x000000, 0.0));
		//set the size
		renderer.setSize(700, 700);
		//renderer.shadowMapEnabled = true	
		
		//Later change this back to false
		var endGame = true; //The Game is over and you'll have to restart
		
		
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
			spotLight.position.set(-7.5,-1,27); //xyz
			//scene.add(spotLight);
			
			
		//From Pacman 3D
		var createPedals = function () {
			return function () {
				//Pellets lol I made this one too!!! :D
				//Loader for Sprites
				var loader = new THREE.TextureLoader();
				loader.crossOrigin = true;
				var Texture00 = loader.load( 'Images/Bpedal - Copy.png' );
				Texture00.minFilter = THREE.LinearFilter;
				var Pells = new THREE.SpriteMaterial( { map: Texture00, color: 0xffffff } );
				Pellets =  new THREE.Sprite(Pells);	
				//console.log(Pellets);
				Pellets.scale.set(0.5,0.25,1);
				//Pellets.scale.set(0.5,0.5,1);
				Pellets.material.lights = true;
				
				Pellets.name = Math.floor(Math.random()*3);
				//console.log(Pellets.name);
				Pellets.position.set(Math.floor(Math.random()*20)-5, //X
								Math.floor(Math.random()*15)-5, //Y
								Math.floor(Math.random()*8)+30); //Z
				scene.add(Pellets);
			};
		}();
		
		//Pedals
		for(var x = 0; x < 25; x++)
			createPedals();
			
			
		//Loader
		var loader = new THREE.TextureLoader();
		loader.crossOrigin = true;
			
		//Grass
		var grass = loader.load( 'Images/hd-grass-background-1.jpg' );
		grass.minFilter = THREE.LinearFilter;
		var planeGeometry = new THREE.PlaneBufferGeometry (37.5, 15,0);	
		var planeMaterial =  new THREE.MeshLambertMaterial( { map: grass, color: 0xffffff } );
		var Board = new THREE.Mesh(planeGeometry, planeMaterial);
		Board.position.set(0,-5.8,30); //xyz
		Board.rotation.x = -1.45
		Board.lights = true;
		scene.add(Board);
		
		//Tree
		var wood = loader.load( 'Images/tree-218738_960_720.jpg' );
		wood.minFilter = THREE.LinearFilter;
		var planeMaterial2 =  new THREE.MeshLambertMaterial( { map: wood, color: 0xffffff } );
		var geometry = new THREE.CylinderGeometry( 1.25, 1.35, 13.5, 10 );
		var Tree = new THREE.Mesh( geometry, planeMaterial2 );
		Tree.position.set(-7.5,-1,27); //xyz
		Tree.lights = true;
		scene.add( Tree );
		
		//Moon
		var moon = loader.load( 'Images/moonTexture.jpg' );
		moon.minFilter = THREE.LinearFilter;
		var sphereGeometry = new THREE.SphereGeometry(5,16,16);
		var sphereMaterial = new THREE.MeshBasicMaterial(  { map: moon, color: 0xffffff } );
		var Moon = new THREE.Mesh( sphereGeometry, sphereMaterial );
		//Moon.position.set(100,13.5,50); //xyz
		Moon.position.set(-10,20,40); //xyz
		//spotLight.position.set(0, 13.5, 0);
		Moon.material.transparent = true;
		Moon.material.opacity = 1;
		
		scene.add( Moon );
		
		var moonLight = new THREE.PointLight( 0x5555ff, 3, 100 );
		//moonLight.position.set( 100, 13.5, 50 );
		moonLight.position.x = Moon.position.x;
		moonLight.position.y = Moon.position.y;
		moonLight.position.z = Moon.position.z;
		scene.add( moonLight );
		
		
		//Sun
		var sun = loader.load( 'Images/moonTexture.jpg' );
		sun.minFilter = THREE.LinearFilter;
		var sphereGeometry = new THREE.SphereGeometry(5,16,16);
		var sphereMaterial = new THREE.MeshBasicMaterial(  { map: moon, color: 0xff0000 } );
		var Sun = new THREE.Mesh( sphereGeometry, sphereMaterial );
		//Moon.position.set(100,13.5,50); //xyz
		Sun.position.set(10,20,-40); //xyz
		//spotLight.position.set(0, 13.5, 0);
		Sun.material.transparent = true;
		Sun.material.opacity = 1;
			
		
		//Bench
		var wood = loader.load( 'Images/depositphotos_18826293-stock-photo-wood-texture-white-wooden-background.jpg' );
		wood.minFilter = THREE.LinearFilter;
		var planeGeometry3 = new THREE.BoxGeometry (5.5, 2.5,0.25);
		var planeMaterial3 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
		var BenchB = new THREE.Mesh(planeGeometry3, planeMaterial3);
		BenchB.position.set(2.5,-2,31); //xyz
		BenchB.rotation.x = -1.25
		//Stop bench for now
		//scene.add(BenchB);
		
		var planeGeometry3 = new THREE.BoxGeometry (5.5, 1,0.25);
		var planeMaterial3 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
		var BenchT = new THREE.Mesh(planeGeometry3, planeMaterial3);
		BenchT.position.set(2.5,-1.25,31); //xyz
		BenchT.rotation.x = 0
		//Stop bench for now
		//scene.add(BenchT);
		
		//Sky Colors based on times
		var Dawn = { //4am
			R:132,
			G:109,
			B:231
		};
		
		var Day = { //9am
			R:77,
			G:223,
			B:255
		};
		
		var Dusk = {//6pm
			R:236,
			G:192,
			B:89
		};
		
		var Sky = {//Chaning variable
			//R:77,
			//G:223,
			//B:255,
			//TransitioningTo: "Dusk"
			R:8,
			G:4,
			B:49,
			TransitioningTo: "MidNight"
		};
		
		var Night = {//9pm
			R:25,
			G:46,
			B:201
		};
		
		var MidNight = { //12am
			R:8,
			G:4,
			B:49
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
			var step = 0;
			//backgroundInterval for the step to update the screen background
			var backgroundInterval = 5;
			//Divisor for the change between the colors
			var colorDivisor  = 100;
			
			
			//console.log("sad");
			renderScene();

			function renderScene(){
				//Render steps
					step = Math.round(1+step);
					
					//render using requestAnimationFrame
					requestAnimationFrame(renderScene);
					renderer.render(scene, camera);			
					
					//var color = new THREE.Color("rgb(77, 223, 225)");
					
					if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Dusk"){
						Sky.R = -(Sky.R-Dusk.R)/colorDivisor + Sky.R;
						Sky.G = -(Sky.G-Dusk.G)/colorDivisor + Sky.G;
						Sky.B = -(Sky.B-Dusk.B)/colorDivisor + Sky.B;
						
						scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
						//console.log( "rgb("+Sky.R+","+Sky.G+","+Sky.B+")");
						
						if(step >= 21000 ){
							Sky.TransitioningTo = "Night"
						}
							
					}
					else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Night"){
						Sky.R = -(Sky.R-Night.R)/colorDivisor + Sky.R;
						Sky.G = -(Sky.G-Night.G)/colorDivisor + Sky.G;
						Sky.B = -(Sky.B-Night.B)/colorDivisor + Sky.B;
						
						//The moon appearing
						Moon.material.opacity =  -(Moon.material.opacity-0.7)/colorDivisor + Moon.material.opacity;
						moonLight.intensity = -(moonLight.intensity-2)/colorDivisor + moonLight.intensity;
						
						
						scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
						//console.log( "rgb("+Sky.R+","+Sky.G+","+Sky.B+")");
						
						if(step >= 24000 ){
							spotLight.intensity =0;
							Sky.TransitioningTo = "MidNight"
							step = 0;
							//console.log("DAY!!!!")
							console.log( "Moving towards " + Sky.TransitioningTo);
						}
							
					}
					else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "MidNight"){
						Sky.R = -(Sky.R-MidNight.R)/(6000/backgroundInterval) + Sky.R;
						Sky.G = -(Sky.G-MidNight.G)/(6000/backgroundInterval) + Sky.G;
						Sky.B = -(Sky.B-MidNight.B)/(6000/backgroundInterval) + Sky.B;
						
						//The moon appearing
						Moon.material.opacity =  -(Moon.material.opacity-1)/colorDivisor + Moon.material.opacity;
						moonLight.intensity = -(moonLight.intensity-4)/colorDivisor + moonLight.intensity;
						
						scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
						//console.log( "rgb("+Sky.R+","+Sky.G+","+Sky.B+")");
						
						if(step >= 3000 ){
							spotLight.intensity =1;
							Sky.TransitioningTo = "Dawn"
							//console.log("DAY!!!!")
							console.log( "Moving towards " + Sky.TransitioningTo);
						//
						}
							
					}
					else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Dawn"){
						Sky.R = -(Sky.R-Dawn.R)/(3000/backgroundInterval) + Sky.R;
						Sky.G = -(Sky.G-Dawn.G)/(3000/backgroundInterval) + Sky.G;
						Sky.B = -(Sky.B-Dawn.B)/(3000/backgroundInterval) + Sky.B;
						
						//The moon disappearing
						//Moon.material.opacity =  -(Moon.material.opacity-0.3)/colorDivisor + Moon.material.opacity;
						//moonLight.intensity = -(moonLight.intensity-0.5)/colorDivisor + moonLight.intensity;
						
						scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
						//console.log( "rgb("+Sky.R+","+Sky.G+","+Sky.B+")");
						
						if(step >= 9000 ){
							spotLight.intensity =2;
							Sky.TransitioningTo = "Day"
							//console.log("NIGHT!!!!")
							console.log( "Moving towards " + Sky.TransitioningTo);
						}
					}					
					else if(step % backgroundInterval == 0 && Sky.TransitioningTo == "Day"){
						Sky.R = -(Sky.R-Day.R)/colorDivisor + Sky.R;
						Sky.G = -(Sky.G-Day.G)/colorDivisor + Sky.G;
						Sky.B = -(Sky.B-Day.B)/colorDivisor + Sky.B;
						
						//The moon appearing
						//Moon.material.opacity =  -(Moon.material.opacity-0)/colorDivisor + Moon.material.opacity;
						//moonLight.intensity = -(moonLight.intensity-0)/colorDivisor + moonLight.intensity;
						
						scene.background = new THREE.Color( "rgb("+Math.round(Sky.R)+","+Math.round(Sky.G)+","+Math.round(Sky.B)+")" );
						//console.log( "rgb("+Sky.R+","+Sky.G+","+Sky.B+")");
						
						if(step >= 12000 ){
							spotLight.intensity =2;
							Sky.TransitioningTo = "Dusk"
							//console.log("NIGHT!!!!")
							console.log( "Moving towards " + Sky.TransitioningTo);
						}
					}
					
					
					//Move all the players
					scene.traverse(function (e) {
						//if( e == p || e == q){
						//if (e instanceof THREE.Mesh) {
						if ((e instanceof THREE.Sprite || e instanceof THREE.Mesh)) {
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
								//e.position.x = e.position.x - Math.sin(step/75)*1.5;
								//e.position.z = e.position.z -Math.cos(step/75)*1;
								e.position.x = - Math.sin( Math.PI * (step-500)/12000)*140;
								e.position.z =65 - Math.cos( Math.PI * step/12000)*80;
								moonLight.position.x = e.position.x;
								moonLight.position.z = e.position.z;
							}
							else if(e == Sun){
								//Have the Moon Rotate sideways
								e.rotation.y += 0.003;
								//e.position.x = e.position.x - Math.sin(step/75)*1.5;
								//e.position.z = e.position.z -Math.cos(step/75)*1;
								e.position.x = - Math.sin( Math.PI * (step-6500)/12000)*140;
								e.position.z =65 - Math.cos( Math.PI * step-6000/12000)*80;
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
							else{ // Pedals
								if(e.name == 0){
									e.position.y -= (0.02 + 0.01* Math.sin(step/120));
									e.position.x -= 0.05 * Math.sin(step/120 + 1);
									e.material.rotation = 0.6*Math.sin(step/120 + 1);
								 }
									
								else if(e.name == 1){
									e.position.y -= (0.02 + 0.01* Math.sin(step/120));
									e.position.x -= 0.05 * Math.sin(step/120 + 0.5);
									e.material.rotation = 0.6*Math.sin(step /120+ 0.5);
								}
								else if(e.name == 2){
									e.position.y -= 0.008;
									e.position.x -= 0.05 * Math.sin(step/120 + 0.5);
									e.material.rotation += 0.12;
								}
								 //console.log(step+Number(e.name));
								 //e.material.rotation += 0.01;
								
								 //e.material.rotation-=Math.PI/175;
								 if(e.position.y <=-8){
									  e.position.y = 10;
									  
								 }
							}
						}
					})
			}
}
	//window.onload = init;	
	window.onload = setup;	