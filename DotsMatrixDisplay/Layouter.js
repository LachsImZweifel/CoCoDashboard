class Layouter {
    constructor(data, footer, layoutInfos){
        this.data = data;
        this.footer = footer;
        this.layoutInfos = layoutInfos;
    }

    getCanvasWidth(){
        let totalColumnWidth = 0;
        for (let column of this.layoutInfos[0]){
            totalColumnWidth += column;
        }
        return canvasWidth = (totalColumnWidth + Constants.columnSpacing + Constants.margin *2) * (charPixelWidth + charPixelDistance);

    }
}