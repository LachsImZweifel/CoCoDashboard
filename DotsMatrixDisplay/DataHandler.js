class DataHandler {
    constructor() {
        this.trainInfoData;
        this.trainInfoArray = [];
        this.calendarData;
        this.calendarArray = [];
    }
    setCalendarData(calendarData) {
        this.calendarData = calendarData;
    }
    getCalendarArray() {
        // ####### REPLACE THIS #######
        this.calendarArray = [
            ["GEN5", "Präsentation", "01.03.24"],
            ["Alle", "Coco-Fahrt", "08.03.24"],
            ["GEN3", "Iteration", "10.10.24"],
            ["Alle", "BlaBlaBlaBluppBLupp", "08.11.24"],
            ["Alle", "Coco wird zum besten Studiengang aller Zeiten ernannt", "20.03.31"],
        ];
        // ############################
        return this.calendarArray;
    }
    setTrainInfoData(trainInfoData) {
        this.trainInfoData = trainInfoData;
    }
    getTrainInfoArray() {
        let linie = [];
        for (let i = 0; i < this.trainInfoData.events.length; i++) {
            print(this.trainInfoData.events[i].line.number);
            linie.push(this.trainInfoData.events[i].line.number);
            linie.push(this.trainInfoData.events[i].line.direction)
            if (this.trainInfoData.events[i].departure.estimate == null) {
                linie.push(this.trainInfoData.events[i].departure.timetable)
            } else {
                linie.push(this.trainInfoData.events[i].departure.estimate)
            }
            this.trainInfoArray.push(linie);
            linie = [];
        }
        return this.trainInfoArray;
    }
}