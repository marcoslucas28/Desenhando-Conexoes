const app = document.getElementById('app')

const saveButton = document.getElementById('dowload')
const drawingButton = document.getElementById('drawingMode')
const clearAllCanvas = document.getElementById('clear')
const erase = document.getElementById('erase')
const lineWidthButton = document.getElementById('selectLineWidth')

let mode = "drawing"
let lineWidth = 5

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = app.clientWidth * 0.5
canvas.height = app.clientHeight * 0.6

let drawing = false

const startDrawing = (x,y) => {
    drawing = true

    draw(x,y)
}

const stopDrawing = () => {
    drawing = false
    ctx.beginPath()
}

const draw = (x,y) => {
    if(!drawing) return

    if(mode == "drawing"){
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#000'
    
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }else if(mode == "erase"){
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#fff'
    
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }
}

const dowloadImage = () => {
    const pngDataUrl = canvas.toDataURL('image/png')

    saveButton.href = pngDataUrl
}

 function selectStyle() {
    if(mode == "drawing"){
        drawingButton.style.border = '2px solid #cffdff'
    }else {
        drawingButton.style.border = 'none'
    }
    
    if(mode == "erase"){
        erase.style.border = '2px solid #cffdff'
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

canvas.addEventListener('mousedown', (e) => {
    const x = e.offsetX
    const y = e.offsetY

    startDrawing(x,y)
})
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault()

    const x = e.touches[0].clientX - canvas.offsetLeft
    const y = e.touches[0].clientY - canvas.offsetTop
    
    ctx.beginPath()

    startDrawing(x,y)
})
canvas.addEventListener('mousemove', (e) => {
    const x = e.offsetX
    const y = e.offsetY

    draw(x,y)
})
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault()

    const x = e.touches[0].clientX - canvas.offsetLeft
    const y = e.touches[0].clientY - canvas.offsetTop

    draw(x,y)
})
canvas.addEventListener('mouseup', stopDrawing)
canvas.addEventListener('mouseout', stopDrawing)
canvas.addEventListener('touchend', (e) => {
    e.preventDefault()

    stopDrawing
})

clearAllCanvas.addEventListener('click', () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
})

saveButton.addEventListener('click', dowloadImage)

lineWidthButton.addEventListener('input', () => lineWidth = lineWidthButton.value)
