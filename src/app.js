// -------- Initial Setup --------
// Get the canvas element
var canvas = document.getElementById("canvas");

// Create a WebGL context
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
    alert("Your browser does not support WebGL");
}
// Setup GLSL program
// Program with shading
var program_with_shade = createProgram(
    gl,
    vertexShaderTextShading,
    fragmentShaderTextShading
);

// Program without shading
var program_no_shade = createProgram(gl, vertexShaderText, fragmentShaderText);

function drawScene() {
    // ------ Start Initialization --------
    updateState();
    var program = state.is_shading ? program_with_shade : program_no_shade;

    // Get attribute and uniforms locations
    var positionAttribLocation = gl.getAttribLocation(program, "a_position");
    var colorAttribLocation = gl.getAttribLocation(program, "a_color");
    var normalAttribLocation = gl.getAttribLocation(program, "a_normal");
    var matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");
    var reverseLightDirectionLocation = gl.getUniformLocation(
        program,
        "u_reverseLightDirection"
    );
    var worldViewProjectionLocation = gl.getUniformLocation(
        program,
        "u_worldViewProjection"
    );
    var worldInverseTransposeLocation = gl.getUniformLocation(
        program,
        "u_worldInverseTranspose"
    );

    // Create position buffer
    var positionBuffer = gl.createBuffer();

    // Create color buffer
    var colorBuffer = gl.createBuffer();

    // Create normal buffer
    var normalBuffer = gl.createBuffer();

    // Set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);

    // Use the program (shaders)
    gl.useProgram(program);

    // ------ End Initialization --------

    // Define the projection matrix
    var projectionMatrix = m4.orthographic(-1, 1, -1, 1, 1, -1);

    // TODO: Compute a matrix for the camera
    var cameraMatrix = m4.translation(0, 0, cameraRadius);
    cameraMatrix = m4.yRotate(cameraMatrix, cameraAngleRadians);
    // Get the camera's position from the matrix we computed
    // var cameraPosition = [cameraMatrix[12], cameraMatrix[13], cameraMatrix[14]];
    // Compute the camera's matrix using look at.
    // cameraMatrix = m4.lookAt(cameraPosition, [0, 0, 1], [0, 1, 0]);
    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    // Compute a view projection matrix
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // Compute a world matrix
    var worldMatrix = m4.translation(
        state.translation.x,
        state.translation.y,
        state.translation.z
    );
    worldMatrix = m4.scale(worldMatrix, state.scaling.x, state.scaling.y, state.scaling.z);
    worldMatrix = m4.xRotate(worldMatrix, degToRad(state.rotation.x));
    worldMatrix = m4.yRotate(worldMatrix, degToRad(state.rotation.y));
    worldMatrix = m4.zRotate(worldMatrix, degToRad(state.rotation.z));
    worldMatrix = m4.multiply(worldMatrix, viewProjectionMatrix)

    // Multiply the matrices.
    var worldViewProjectionMatrix = m4.multiply(
        viewProjectionMatrix,
        worldMatrix
    );
    var worldInverseMatrix = m4.inverse(worldMatrix);
    var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);

    // If the projection is perspective, multiply the matrices
    if (state.projection_type === "perspective") {
        var perspectiveMatrix = m4.perspective(degToRad(state.view_field));
        worldMatrix = m4.multiply(worldMatrix, perspectiveMatrix);
        worldViewProjectionMatrix = m4.multiply(
            worldViewProjectionMatrix,
            perspectiveMatrix
        );
        worldInverseTransposeMatrix = m4.multiply(
            worldInverseTransposeMatrix,
            perspectiveMatrix
        );
    } else if (state.projection_type === "oblique") {
        var obliqueMatrix = m4.oblique(state.f_factor, degToRad(state.beta_angle));
        worldMatrix = m4.multiply(worldMatrix, obliqueMatrix);
        worldViewProjectionMatrix = m4.multiply(
            worldViewProjectionMatrix,
            obliqueMatrix
        );
        worldInverseTransposeMatrix = m4.multiply(
            worldInverseTransposeMatrix,
            obliqueMatrix
        );
    }

    // Set the matrices
    gl.uniformMatrix4fv(
        matrixUniformLocation,
        false,
        m4.multiply(projectionMatrix, worldMatrix)
    );

    gl.uniformMatrix4fv(
        worldViewProjectionLocation,
        false,
        worldViewProjectionMatrix
    );
    gl.uniformMatrix4fv(
        worldInverseTransposeLocation,
        false,
        worldInverseTransposeMatrix
    );

    // Set the color to use
    gl.uniform4fv(colorUniformLocation, [14 / 255, 165 / 255, 233 / 255, 1]); // blue

    // set the light direction.
    gl.uniform3fv(reverseLightDirectionLocation, m4.normalize([0.5, 0.7, 1]));

    // Draw the model here
    var model = hollowCube;
    for (var i = 0; i < model.position.length; i++) {
        // Set position buffer
        setBuffer(
            gl,
            positionBuffer,
            model.position[i],
            positionAttribLocation,
            3
        );

        if (state.is_shading) {
            // Set normal buffer
            setBuffer(
                gl,
                normalBuffer,
                model.normal[i],
                normalAttribLocation,
                3
            );
        } else {
            // Set color buffer
            setBuffer(gl, colorBuffer, model.color[i], colorAttribLocation, 3);
        }

        gl.drawArrays(gl.TRIANGLE_FAN, 0, model.position[i].length / 3);
    }
}

function main() {
    // Scene drawer
    drawScene();
}

window.onload = main;
