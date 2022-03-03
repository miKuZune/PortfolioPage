class Slideshow {
    constructor(containerID){
        this.containerID = containerID;

        this.slides = undefined;
        this.currentSlideNum = 0;

        this.GetSlides();
    }

    GetSlides(){
        if(this.containerID == null || this.containerID == undefined || this.containerID == ""){
            console.log('first gate');
            return;
        }

        let slideContainerElement = document.getElementById(this.containerID);
        console.log(slideContainerElement);
        if(slideContainerElement == null || slideContainerElement == undefined){
            console.log('second gate');
            return;
        }

        this.slides = slideContainerElement.getElementsByClassName('slide');
        console.log(this.slides);
    }

    NextSlide(){
        this.currentSlideNum++;

        if(this.currentSlideNum >= this.slides.length){
            this.currentSlideNum = 0;
        }

        this.SetActiveSlide();
    }

    PrevSlide(){
        this.currentSlideNum--;

        if(this.currentSlideNum < 0){
            this.currentSlideNum = this.slides.length - 1;
        }

        this.SetActiveSlide();
    }

    SetActiveSlide(){
        this.DeactiveateAllSlides();
        
        this.slides[this.currentSlideNum].classList.add('active');
    }

    DeactiveateAllSlides(){
        for(let i = 0; i < this.slides.length; i++){
            this.slides[i].classList.remove('active');
        }
    }
}