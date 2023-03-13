function centerOfMass(positions) {
    // "positions" is an array consisting of vertices positions in row major order.
    var sum = { x: 0, y: 0, z: 0 };
    for (var i = 0; i < positions.length; i += 3) {
        sum.x += positions[i];
        sum.y += positions[i + 1];
        sum.z += positions[i + 2];
    }
    return {
        x: sum.x / (positions.length / 3),
        y: sum.y / (positions.length / 3),
        z: sum.z / (positions.length / 3),
    };
}

function hexToNormalizedRgb(colorHex) {
    var r = parseInt(colorHex.slice(1, 3), 16) / 255;
    var g = parseInt(colorHex.slice(3, 5), 16) / 255;
    var b = parseInt(colorHex.slice(5, 7), 16) / 255;
    return [r, g, b];
}
