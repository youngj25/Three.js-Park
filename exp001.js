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
			scene.background = new THREE.Color( 0x4DD3FF );
			
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
			var spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(0, 50, 150);
			spotLight.castShadow = false;
			spotLight.intensity =2;
			scene.add(spotLight);

			
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
				Pellets.name = Math.floor(Math.random()*3);
				//console.log(Pellets.name);
				Pellets.position.set(Math.floor(Math.random()*17)-8, //X
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
		var planeGeometry = new THREE.PlaneBufferGeometry (30, 5,0);	
		var planeMaterial =  new THREE.MeshBasicMaterial( { map: grass, color: 0xffffff } );
		var Board = new THREE.Mesh(planeGeometry, planeMaterial);
		Board.position.set(0,-5.8,30); //xyz
		Board.rotation.x = -0.75
		scene.add(Board);
		
		//Tree
		var wood = loader.load( 'Images/tree-218738_960_720.jpg' );
		wood.minFilter = THREE.LinearFilter;
		var planeGeometry2 = new THREE.PlaneBufferGeometry (3.5, 7.5,0);
		var planeMaterial2 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
		var Tree = new THREE.Mesh(planeGeometry2, planeMaterial2);
		Tree.position.set(-5.5,-1.25,31); //xyz
		scene.add(Tree);
			
		//Bench
		var wood = loader.load( 'Images/depositphotos_18826293-stock-photo-wood-texture-white-wooden-background.jpg' );
		wood.minFilter = THREE.LinearFilter;
		var planeGeometry3 = new THREE.BoxGeometry (5.5, 2.5,0.25);
		var planeMaterial3 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
		var BenchB = new THREE.Mesh(planeGeometry3, planeMaterial3);
		BenchB.position.set(2.5,-2,31); //xyz
		BenchB.rotation.x = -1.25
		scene.add(BenchB);
		
		var planeGeometry3 = new THREE.BoxGeometry (5.5, 1,0.25);
		var planeMaterial3 =  new THREE.MeshBasicMaterial( { map: wood, color: 0xffffff } );
		var BenchT = new THREE.Mesh(planeGeometry3, planeMaterial3);
		BenchT.position.set(2.5,-1.25,31); //xyz
		BenchT.rotation.x = 0
		scene.add(BenchT);
			
		
        //add the output of the renderer to the html element
			document.getElementById("WebGL-output").appendChild(renderer.domElement);
			//controls = new THREE.OrbitControls(camera, renderer.domElement);
			
        //orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);
		
        //call the render function
			renderer.render(scene, camera);
			
		//call the render function
			var step = 0;		
			//console.log("sad");
			renderScene();

			function renderScene(){
				//Render steps
					step += 0.1;
					
					//render using requestAnimationFrame
					requestAnimationFrame(renderScene);
					renderer.render(scene, camera);			
					
					
					if(step >= 8 && step <= 20){
						scene.background = new THREE.Color( 0x4D33AF );
						console.log("Changed!!!");
					}
					else if(step >= 50 && step <= 100){
						scene.background = new THREE.Color( 0x4DDFFF );
						console.log("Changed!!!");
					}
					else scene.background = new THREE.Color( 0x4DD3FF );
					
					//Move all the players
					scene.traverse(function (e) {
						//if( e == p || e == q){
						//if (e instanceof THREE.Mesh) {
						if ((e instanceof THREE.Sprite || e instanceof THREE.Mesh)) {
							if(e == Tree){
								//nsole.log("Trial!!");
								e.rotation.z = 0.002 * Math.sin(step);
								
							}
							else if(e == Board){
								//nsole.log("Trial!!");
								//e.rotation.z = 0.001 * Math.sin(step);
								e.position.x = 0.009 * Math.sin(step);
								
							}
							else if(e == BenchB){
								//nsole.log("Trial!!");
								e.rotation.x -= 0.003 * Math.sin(step/10);
								e.position.z += 0.025 * Math.sin(step/10);
								e.position.y = -Math.abs(1.25 * Math.sin(step/10)) - 2;
								//e.position.x = 0.009 * Math.sin(step);
								
							}
							else if(e == BenchT){
								//nsole.log("Trial!!");
								e.rotation.x -= 0.003 * Math.sin(step/10);
								e.position.z += 0.0025 * Math.sin(step/10);
								e.position.y = -Math.abs(1.25 * Math.sin(step/10)) - 1.25;
								//e.position.x = 0.009 * Math.sin(step);
								
							}
							else{ // Pedals
									
								if(e.name == 0){
									e.position.y -= (0.02 + 0.01* Math.sin(step));
									e.position.x -= 0.05 * Math.sin(step + 1);
									e.material.rotation = 0.6*Math.sin(step + 1);
								 }
									
								else if(e.name == 1){
									e.position.y -= (0.02 + 0.01* Math.sin(step));
									e.position.x -= 0.05 * Math.sin(step + 0.5);
									e.material.rotation = 0.6*Math.sin(step + 0.5);
								}
								else if(e.name == 2){
									e.position.y -= 0.008;
									e.position.x -= 0.05 * Math.sin(step + 0.5);
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