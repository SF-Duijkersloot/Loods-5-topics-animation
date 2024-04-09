export default class Observer
{
    constructor()
    {
        // Setup
        this.dividerLineElements = document.querySelectorAll('.divider-line')
        this.datumElements = document.querySelectorAll('.text-wrapper p')
        this.topicH2Elements = document.querySelectorAll('.text-wrapper h2')
        this.imageContainerElements = document.querySelectorAll('.image-container')

        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: .8 // Slightly smaller treshold for timing purposes
        }

        // Observers
        this.instanceObservers()
        this.setObservers()
    }

    instanceObservers()
    {
        // Main observer
        this.mainObserver = new IntersectionObserver(entries => 
        {
            entries.forEach(entry => 
            {
                if (entry.isIntersecting)
                {
                    entry.target.classList.add('show')
                    this.mainObserver.unobserve(entry.target)
                }
            })
        }, this.options)

        // Text lines observer
        this.textLinesObserver = new IntersectionObserver(entries => 
        {
            entries.forEach(entry => 
            {
                if (entry.isIntersecting)
                {
                    const textLines = entry.target.querySelectorAll('.text-line')
                    textLines.forEach((line, index) => 
                    {
                        line.style.transitionDelay = `${index * 0.15}s`
                    })
                    entry.target.classList.add('show')
                    this.textLinesObserver.unobserve(entry.target)
                }
            })
        }, this.options)
    }

    setObservers()
    {
        this.dividerLineElements.forEach(el => { this.mainObserver.observe(el) })
        this.imageContainerElements.forEach(el => { this.mainObserver.observe(el) })
        this.datumElements.forEach(el => { this.mainObserver.observe(el) })
        this.topicH2Elements.forEach(el => { this.textLinesObserver.observe(el) })
    }
}