function save() {
    model = JSON.parse(JSON.stringify(state.model));

    var transformation = m4.translation(
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
    transformation = m4.xRotate(transformation, degToRad(state.rotation.x));
    transformation = m4.yRotate(transformation, degToRad(state.rotation.y));
    transformation = m4.zRotate(transformation, degToRad(state.rotation.z));

    console.log(transformation);

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
        console.log(file);
        const text = await file.text();
        console.log(text);
        const model = JSON.parse(text);
        state.model = model;
        drawScene();
    });
}

document.getElementById("save-btn").addEventListener("click", save);

document.getElementById("load-btn").addEventListener("click", load);
