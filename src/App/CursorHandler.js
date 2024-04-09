import gsap from 'gsap'

export default class CursorHandler 
{
    constructor() 
    {
        // Setup
        this.arrowCursor = document.querySelector('.arrow-cursor')
        this.innerContainers = document.querySelectorAll('.inner-container')
        this.isTracking = false

        // Set initial position
        gsap.set(this.arrowCursor, {
            xPercent: -50,
            yPercent: -50,
            autoAlpha: 0
        })

        this.setListeners()
        this.pageLeave()
        this.pointerClick()
    }

    setListeners() 
    {
        this.innerContainers.forEach(innerContainer => {
            innerContainer.addEventListener('mouseover', this.startTracking)
            innerContainer.addEventListener('mouseout', this.stopTracking)
        })
    }

    startTracking = () => 
    {
        this.isTracking = true
        this.innerContainers.forEach(innerContainer => {
            innerContainer.addEventListener('mousemove', this.moveArrowCursor)
        })
    }

    stopTracking = () => 
    {
        this.isTracking = false
        gsap.to(this.arrowCursor, { autoAlpha: 0 })
        this.innerContainers.forEach(innerContainer => {
            innerContainer.removeEventListener('mousemove', this.moveArrowCursor)
        })
    }

    moveArrowCursor = (e) => 
    {
        if (this.isTracking) {
            gsap.to(this.arrowCursor, {
                x: e.clientX,
                y: e.clientY,
                autoAlpha: 1,
            })
        }
    }

    pageLeave() 
    {
        document.addEventListener('mouseleave', () => 
        {
            if (this.isTracking) {
                gsap.to(this.arrowCursor, { autoAlpha: 0 })
            }
        })
    }

    pointerClick() 
    {
        this.innerContainers.forEach(innerContainer => {
            innerContainer.addEventListener('click', () => 
            {
                gsap.to(this.arrowCursor, {
                    rotation: 10,
                    duration: 0.25,
                    onComplete: () => {
                        gsap.to(this.arrowCursor, {
                            rotation: 0,
                            duration: 0.5
                        })
                    }
                })
            })
        })
    }

    
}
