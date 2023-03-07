function setBuffer(gl, Buffer, vector, AttribLocation, size) {
    // Enable vertex attributes
    gl.enableVertexAttribArray(AttribLocation);

    // Bind vector position/color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);

    // Set buffer data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vector), gl.STATIC_DRAW);

    // Tell the attribute how to get data out of Buffer (ARRAY_BUFFER)
    var size = size; // components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
        AttribLocation,
        size,
        type,
        normalize,
        stride,
        offset
    );
}
