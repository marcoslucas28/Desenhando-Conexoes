import { Loading } from "./loading.js"

export class Tuturials extends Loading {
    constructor(root, load, contend, elements, poput, poputVideo, poputSpan){
        super(root, load, contend)

        this.elements = document.querySelectorAll(elements)
        this.poput = {
            poput: document.querySelector(poput),
            video: document.querySelector(poputVideo),
            span: document.querySelector(poputSpan)
        }

        this.showPoput()
        this.closePoput()
    }

    showPoput() {
        this.elements.forEach(vid => {
            vid.onclick = () => {
                this.poput.poput.style.display = 'block'
                this.poput.video.src = vid.getAttribute('src')
        }});
    }

    closePoput(){
        this.poput.span.onclick = () => {
            this.poput.poput.style.display = 'none'
        }
    }
}