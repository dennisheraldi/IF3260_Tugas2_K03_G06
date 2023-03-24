function centerOfMass(position) {
    var x = 0;
    var y = 0;
    var z = 0;
    var points = pointsList(position);
    for (var i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
        z += points[i][2];
    }
    return [
        parseFloat((x / points.length).toFixed(2)),
        parseFloat((y / points.length).toFixed(2)),
        parseFloat((z / points.length).toFixed(2)),
    ];
}

function pointsList(position) {
    var setOfPoints = new Set();
    var points = [];
    for (var i = 0; i < position.length; i++) {
        for (var j = 0; j < position[i].length; j += 3) {
            // Make sure that the points are unique
            setOfPoints.add(
                position[i][j] +
                    "," +
                    position[i][j + 1] +
                    "," +
                    position[i][j + 2]
            );
        }
    }

    // Parse the points from the set to an array in form of [x, y, z]
    setOfPoints.forEach((point) => {
        var pointArray = point.split(",");
        points.push([
            parseFloat(pointArray[0]),
            parseFloat(pointArray[1]),
            parseFloat(pointArray[2]),
        ]);
    });
    return points;
}

function hexToNormalizedRgb(colorHex) {
    var r = parseInt(colorHex.slice(1, 3), 16) / 255;
    var g = parseInt(colorHex.slice(3, 5), 16) / 255;
    var b = parseInt(colorHex.slice(5, 7), 16) / 255;
    return [r, g, b];
}
