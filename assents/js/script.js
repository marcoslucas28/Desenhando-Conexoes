document.querySelectorAll('.video_tutoriais').forEach(vid => {
    vid.onclick = () => {
        document.querySelector('.poput').style.display = 'block'
        document.querySelector('.poput video').src = vid.getAttribute('src')
    }
})

document.querySelector('.poput span').onclick = () => {
    document.querySelector('.poput').style.display = 'none'
}