let port;
let writer;
let writableStreamClosed;

document.getElementById('connect').addEventListener('click', async () => {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        const encoder = new TextEncoderStream();
        writableStreamClosed = encoder.readable.pipeTo(port.writable);
        writer = encoder.writable.getWriter();

        document.getElementById('sendGcode').disabled = false;
        document.getElementById('output').textContent = 'Conectado ao Arduino via Serial.\n';
    } catch (error) {
        console.error('Erro ao conectar: ', error);
        document.getElementById('output').textContent = 'Erro ao conectar: ' + error + '\n';
    }
});

document.getElementById('sendGcode').addEventListener('click', async () => {
    const fileInput = document.getElementById('gcodeFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecione um arquivo G-code.');
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
        const gcode = event.target.result.split('\n');

        for (let line of gcode) {
            line = line.trim();
            if (line.length > 0) {
                await writer.write(line + '\n');
            }
        }
        document.getElementById('output').textContent += 'G-code enviado com sucesso.\n';
    };

    fileReader.readAsText(file);
});

document.getElementById('disconnect').addEventListener('click', async () => {
    try {
        await writer.close();
        await writableStreamClosed;
        await port.close();
        document.getElementById('sendGcode').disabled = true;
        document.getElementById('output').textContent += 'Desconectado do Arduino.\n';
    } catch (error) {
        console.error('Erro ao desconectar: ', error);
    }
});