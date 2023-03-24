function save() {
    model = JSON.parse(JSON.stringify(state.model));

    transformation = m4.identity();

    if (state.model_type === "loaded") {
        var centerPoints = centerOfMass(state.model.position);
        transformation = m4.translate(
            transformation,
            centerPoints[0] * -1,
            centerPoints[1] * -1,
            centerPoints[2] * -1
        );
    }

    transformation = m4.xRotate(transformation, degToRad(state.rotation.x));
    transformation = m4.yRotate(transformation, degToRad(state.rotation.y));
    transformation = m4.zRotate(transformation, degToRad(state.rotation.z));

    if (state.model_type === "loaded") {
        var centerPoints = centerOfMass(state.model.position);
        transformation = m4.translate(
            transformation,
            centerPoints[0],
            centerPoints[1],
            centerPoints[2]
        );
    }

    transformation = m4.translate(
        transformation,
        state.translation.x,
        state.translation.y,
        state.translation.z
    );

    transformation = m4.scale(
        transformation,
        state.scaling.x,
        state.scaling.y,
        state.scaling.z
    );

    vertices = model.position;
    for (var i = 0; i < vertices.length; i++) {
        for (var j = 0; j < vertices[i].length; j = j + 3) {
            var vertex = [
                vertices[i][j],
                vertices[i][j + 1],
                vertices[i][j + 2],
            ];
            var transformed = m4.multiplyWithVertex(transformation, vertex);
            vertices[i][j] = transformed[0];
            vertices[i][j + 1] = transformed[1];
            vertices[i][j + 2] = transformed[2];
        }
    }

    var blob = new Blob([JSON.stringify(model)], {
        type: "text/plain;charset=utf-8",
    });
    var blobUrl = URL.createObjectURL(blob);

    var link = document.getElementById("downloader-link");
    link.href = blobUrl;
    link.download = "model.json";
    document.querySelector("a").click();
}

async function load() {
    window.showOpenFilePicker().then(async (handle) => {
        const file = await handle[0].getFile();
        const text = await file.text();
        const model = JSON.parse(text);
        state.model = model;
        state.model_type = "loaded";
        state.center_points = centerOfMass(state.model.position);
        drawScene();
    });
}

document.getElementById("save-btn").addEventListener("click", save);

document.getElementById("load-btn").addEventListener("click", load);
