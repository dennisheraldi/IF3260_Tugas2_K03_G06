const vertexShaderText = `
    attribute vec4 a_position;
    attribute vec4 a_color;

    uniform mat4 u_matrix;

    varying vec4 v_color;
    void main() {
        gl_Position = u_matrix * a_position;
        v_color = a_color;
    }

`;

const fragmentShaderText = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;

    void main() {
        gl_FragColor = v_color;
    }
`;
