# WebGL 3D Hollow Object

## Description

This program is an implementation of 3D rendering using WebGL. The program is able to render 3D models with different projections, shading, and other parameters. The program is also able to load and save models from JSON files. Here are the detailed features:

1. Load Model  
   Choose from 3 predefined models: Hollow Cube, Hollow Prism, and Takodachi, or load a model from a JSON file (must contain vertex (position) and color definitions)

2. Projection
   Change projection type by clicking orthographic, perspective, or oblique buttons. For perspective projection, you can change the field of view to narrow or widen your perspective. For oblique projection, you can change the foreshortening factor and beta angle to alter the oblique projection.

3. Shading  
   Enable shading by clicking the shading button.

4. Rotation, Translation, and Scaling  
   Change rotation, translation, and scaling of the model by changing the slider values in different axes.

5. Camera Settings  
   Change camera parameters by changing the radius slider to alter the distance of the camera from the object, and the angle slider to alter the angle of the camera around the object.

6. Save Model  
   Save the current model to a JSON file by clicking the save button.

7. Reset  
   Reset the model and transformations to their initial values by clicking the reset button.

8. Animation  
   Enable a simple rotating animation by clicking the animation button.

## How to run

1. Clone this repository
2. Extract and access the `src` directory from the extracted repository
3. Run `index.html` and it will automatically open the `.html` file in your default browser
4. If WebGL is available in your browser, the canvas will appear and render the model

## Contributors

Kelompok 6 K03 IF3260 Grafika Komputer 2023

-   Johannes Winson Sukiatmodjo - 13520123
-   Fachry Dennis Heraldi - 13520139
-   Zayd Muhammad Kawakibi Zuhri - 13520144
