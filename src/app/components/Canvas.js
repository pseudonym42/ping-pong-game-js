class Canvas {
    constructor(rootElement) {
        const _canvas = document.getElementById(rootElement);
        _canvas.width = 800;
        _canvas.height = 500;
        _canvas.color = "black";

        // note '2d' not '2D
        this.context = _canvas.getContext("2d");
        
        this.canvasElement = _canvas;
        this.color = _canvas.color;
        this.width = _canvas.width;
        this.height = _canvas.height;
    }

}

export default Canvas;