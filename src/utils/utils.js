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
