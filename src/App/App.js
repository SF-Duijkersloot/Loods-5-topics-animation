import Observer from './Observer.js'
import CursorHandler from './CursorHandler.js'

export default class App
{
    constructor()
    {
        this.observer = new Observer()
        this.cursorHandler = new CursorHandler()
    }
}