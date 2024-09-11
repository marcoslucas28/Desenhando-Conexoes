const saveButton = document.getElementById('dowload')
const drawingButton = document.getElementById('drawingMode')
const clearAllCanvas = document.getElementById('clear')
const erase = document.getElementById('erase')

let mode = "drawing"

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * 0.8
canvas.height = window.innerHeight * 0.8

let drawing = false


const startDrawing = (event) => {
    drawing = true

    draw(event)
}

const stopDrawing = () => {
    drawing = false
    ctx.beginPath()
}

const draw = (event) => {
    if(!drawing) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if(mode == "drawing"){
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#000'
    
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }else if(mode == "erase"){
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#fff'
    
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }
}

 function selectStyle() {
    if(mode == "drawing"){
        drawingButton.style.border = '5px solid #b7ffa1'
    }else {
        drawingButton.style.border = 'none'
    }
    
    if(mode == "erase"){
        erase.style.border = '5px solid #b7ffa1'
    }else {
        erase.style.border = 'none'
    }
}

drawingButton.addEventListener('click', () => {
    mode = "drawing"
    selectStyle()
})

erase.addEventListener('click', () => {
    mode = "erase"
    selectStyle()
})

selectStyle()

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', stopDrawing)
canvas.addEventListener('mouseout', stopDrawing)

clearAllCanvas.addEventListener('click', () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
})