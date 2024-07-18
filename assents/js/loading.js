export class Loading {
    constructor(root, showload, contend){
        this.root = document.querySelector(root)

        this.displayLoad = document.querySelector(showload)
        this.displayContend = document.querySelector(contend)

        this.load()
    }

    load() {
        this.root.onload = () => {
            this.displayLoad.style.display = 'none'
            this.displayContend.style.display = 'block'
        }
    }
}