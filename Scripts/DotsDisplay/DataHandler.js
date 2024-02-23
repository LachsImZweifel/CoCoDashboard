class DataHandler {
    constructor() {
        this.trainInfoData;
        this.trainInfoArray = [];
        this.calendarData;
        this.calendarArray = [];
        this.footerStrings = [];
        this.setCoffeeSpreadSheetFullURl()
    }
    setCalendarArray(calendarArray){
        this.calendarArray = calendarArray;
    }

    getCalendarArray() {
        // ####### REPLACE THIS #######
        this.calendarArray = [
            ["SCH 22", "Studieninfo FLINTA* vor Ort", "02.01.24"],
            ["CGL 2. Stock 'Aquarium'", "Kathia Talk @Clash of Realities", "05.08.22"],
            ["CGL 2. Stock 'Aquarium'", "Iteration 2023", "05.10.23"],
            ["CGL 2. Stock 'Aquarium'", "KISD Parcours Ausstellung", "05.06.23"],
            ["CGL 2. Stock 'Aquarium'", "Workshop: Creative Coding Girls // Teil 2", "06.02.22"],
            ["CGL 2. Stock 'Aquarium'", "Studieninfo-Session", "01.03.24"],
            ["SCH 22", "techF* - Event", "05.10.23"],
            ["SCH 22", "CoCo Iteration", "05.09.22"],
            ["SCH 22", "Girls Day @ CoCo", "04.03.23"],
            ["SCH 22", "Workshop: Creative Coding Girls // Teil 1", "05.02.22"],
            ["SCH 22", "Studieninfo-Session", "02.01.24"],
            ["SCH 22", "InfoTalk & InfoWalk", "01.02.23"]


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
            linie.push(this.trainInfoData.events[i].stopPoint.name)
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
    setFooterStrings(footerStrings) {
        if (footerStrings.length == 0) {
            footerStrings.push("Derzeit gibt es keine Informationen zur Aufräumliste oder dem Kaffeestatus.");
        }
        this.footerStrings = footerStrings;
    }
    getFooterStrings() {
        return this.footerStrings;
    }

    setCoffeeInfoData(coffeeInfoData){
        this.coffeeInfoData = coffeeInfoData;
    }

    setCoffeeSpreadSheetFullURl(fullCoffeeSpreadSheetURL){
        let SheetId = '1U71TdEqhEcNnCbI8gDZZnA7Pmmq9fDy_FmoafrTGvmM'
        let SheetTitle = 'Coffee'
        let SheetRange1 = 'C1:F2'

        this.fullCoffeeSpreadSheetURL = 'https://docs.google.com/spreadsheets/d/' + SheetId + '/gviz/tq?sheet=' + SheetTitle + '&range=' +SheetRange1;
    }
    getCoffeeSpreadSheetFullURL(){
        return this.fullCoffeeSpreadSheetURL;
    }
}