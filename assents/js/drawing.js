const saveButton = document.getElementById('dowload')
const clearAllCanvas = document.getElementById('clear')
const erase = document.getElementById('erase')

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

    ctx.lineWidht = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000'

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', stopDrawing)
canvas.addEventListener('mouseout', stopDrawing)