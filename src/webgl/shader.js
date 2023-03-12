// Vertex shader and fragement shader if shading is OFF
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

// Vertex shader and fragement shader if shading is ON
const vertexShaderTextShading = `
    attribute vec4 a_position;
    attribute vec3 a_normal;

    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;

    varying vec3 v_normal;
    void main() {
        // Multiply the position by the matrix.
        gl_Position = u_worldViewProjection * a_position;
 
        // orient the normals and pass to the fragment shader
        v_normal = mat3(u_worldInverseTranspose) * a_normal;
    }

`;

const fragmentShaderTextShading = `
    precision mediump float;

    varying vec3 v_normal;
 
    uniform vec3 u_reverseLightDirection;
    uniform vec4 u_color;

    void main() {
        // because v_normal is a varying it's interpolated
        // so it will not be a unit vector. Normalizing it
        // will make it a unit vector again
        vec3 normal = normalize(v_normal);
        
        float light = dot(normal, u_reverseLightDirection);
        
        gl_FragColor = u_color;
        
        // Lets multiply just the color portion (not the alpha)
        // by the light
        gl_FragColor.rgb *= light;
    }
`;
