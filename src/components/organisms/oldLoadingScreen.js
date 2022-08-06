import React from "react";
import { View, StyleSheet } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import {
    DirectionalLight,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    MeshPhongMaterial,
    Group,
  } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useDarkMode } from 'react-native-dynamic';

// Language
import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { Colors } from '../../styles';

const OldLoadingScreen = () => {
    const {t, i18n} = useTranslation();
    
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TRUNK_COLOR = "#964B00";
    var LEAF_COLOR = "#228B22";
    var TEXT_COLOR = "white"
    var GRASS_COLOR = "#98FB98";
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TRUNK_COLOR = "#C96500";
        LEAF_COLOR = "#2CB42C";
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        }
    })

    // Tree Trunk
    class TrunkMesh extends Mesh {
        constructor() {
            super(
            new BoxGeometry(1, 3, 1),
            new MeshStandardMaterial({
                color: TRUNK_COLOR,
            })
            );
        }
    }

    // Leaf Blocks
    class LeafMesh extends Mesh {
        constructor() {
            super(
            new BoxGeometry(1, 1, 1),
            new MeshStandardMaterial({
                color: LEAF_COLOR,
            })
            );
        }
    }

    // Generate the mesh
    const trunk = new TrunkMesh();
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const leaf = new LeafMesh();

    // Bottom Center Block
    const leaf1 = leaf.clone().translateX(0).translateY(2).translateZ(0);

    // Bottom Sides
    const leaf2 = leaf.clone().translateX(1).translateY(2).translateZ(0);

    const leaf3 = leaf.clone().translateX(1).translateY(2).translateZ(1);
    const leaf4 = leaf.clone().translateX(0).translateY(2).translateZ(1);
    const leaf5 = leaf.clone().translateX(-1).translateY(2).translateZ(0);
    const leaf6 = leaf.clone().translateX(-1).translateY(2).translateZ(-1);
    const leaf7 = leaf.clone().translateX(0).translateY(2).translateZ(-1);
    const leaf8 = leaf.clone().translateX(-1).translateY(2).translateZ(1);
    const leaf9 = leaf.clone().translateX(1).translateY(2).translateZ(-1);

    // Top Center Block
    const leaf10 = leaf.clone().translateX(0).translateY(3).translateZ(0);

    // Top Sides
    const leaf11 = leaf.clone().translateX(1).translateY(3).translateZ(0);
    const leaf12 = leaf.clone().translateX(0).translateY(3).translateZ(1);
    const leaf13 = leaf.clone().translateX(-1).translateY(3).translateZ(0);
    const leaf14 = leaf.clone().translateX(0).translateY(3).translateZ(-1);

    // Merge the blocks into a tree
    const tree = new Group();
    tree.add( trunk );
    tree.add( leaf1 );
    tree.add( leaf2 );
    tree.add( leaf3 );
    tree.add( leaf4 );
    tree.add( leaf5 );
    tree.add( leaf6 );
    tree.add( leaf7 );
    tree.add( leaf8 );
    tree.add( leaf9 );
    tree.add( leaf10 );
    tree.add( leaf11 );
    tree.add( leaf12 );
    tree.add( leaf13 );
    tree.add( leaf14 );

    tree.traverse( function ( child ) {
        if ( child instanceof Mesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
    });

    // Camera
    const camera = new PerspectiveCamera(100, 0.4, 1, 1000);

    let cameraInitialPositionX = 5;
    let cameraInitialPositionY = 2;
    let cameraInitialPositionZ = 10;

    return (
        <View style={[schemeStyle.backgroundColor, {flex: 1}]}>
            <GLView
            style={{ flex: 1 }}
            onContextCreate={(gl) => {
                // GL Parameter disruption
                const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

                // Create a WebGLRenderer without a DOM element
                const renderer = new Renderer({ gl });
                // Renderer declaration and set properties
                renderer.clearColor(BACKGROUND_COLOR)
                renderer.setSize(width, height);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

                // Scene declaration, add a fog
                const scene = new Scene();

                // Add all necessary lights
                const light = new DirectionalLight( 0xffffff, 1 );
                light.target = tree;
                light.position.set( 10, 12, 10 ); //default; light shining from top
                light.castShadow = true; // default false
                scene.add(light);

                //Set up shadow properties for the light
                light.shadow.mapSize.width = 512; // default is 512
                light.shadow.mapSize.height = 512; // default is 512
                light.shadow.camera.near = 1; // default is 0.5
                light.shadow.camera.far = 500; // default is 500

                // Add object instance to our scene
                scene.add(tree);

                var loader = new FontLoader();
                loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
                    var textGeo = new TextGeometry( t('organisms:loadingScreen:loading'), {
                        font: font,
                        size: 0.2,
                        height: 0.05,
                        curveSegments: 12,
                        bevelEnabled: false,
                    } );
                    textGeo.center();

                    var textMaterial = new MeshPhongMaterial( { color: TEXT_COLOR } );
                    var mesh = new Mesh( textGeo, textMaterial );
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    mesh.position.set(4.05, 0.3, 8);
                    mesh.rotateY(0.4);
                    mesh.rotateX(-0.5);
                    mesh.rotateZ(0.05);
                    scene.add( mesh );
                } );

                //Create a plane that receives shadows (but does not cast them)
                var floorGeometry = new BoxGeometry(100, 1, 100);
                var floorMaterial = new MeshPhongMaterial({color: GRASS_COLOR});
                var floor = new Mesh(floorGeometry, floorMaterial);
                scene.add(floor);
                floor.position.y = -2;
                floor.receiveShadow = true;

                // Set camera position and look to sphere
                camera.position.set(
                    cameraInitialPositionX,
                    cameraInitialPositionY,
                    cameraInitialPositionZ
                );

                camera.lookAt(tree.position);

                // Render function
                const render = () => {
                    requestAnimationFrame(render);
                    renderer.render(scene, camera);
                    gl.endFrameEXP();
                };
                render();
            }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default OldLoadingScreen;