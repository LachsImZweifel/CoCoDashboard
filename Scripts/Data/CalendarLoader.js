class CalendarLoader {

    constructor() {
        //Event Data
        this.eventData = [];
        this.eventName = '';
        this.eventStartTime = null;
        this.eventDuration = '';
        this.eventLocation = '';
        this.eventStatus = '';
        //Modul Data
        this.modulData = [];
        this.currentDate = new Date();
        this.currentSemesters = [];
        //  !!!Funktionalität überprüfen!!!
        if (this.currentDate.getMonth() > 2 && this.currentDate.getMonth() < 8) {
            this.currentSemesters = [2, 4, 6];
        } else {
            this.currentSemesters = [1, 3, 5];
        }
        this.url = 'https://coco.study/api/timetable/export?semester=';
        //Assignment Data
        this.SheetId = '1u2dxMrFCoEOpCxoRdq8em06Ua09nEXKM2B5Tk5i_R7c';
        this.SheetTitle = 'Abgaben';
        this.SheetRange1 = 'A1:F9';
        this.FullUrl1 = `https://docs.google.com/spreadsheets/d/${this.SheetId}/gviz/tq?sheet=${this.SheetTitle}&range=${this.SheetRange1}`;
        this.assignmentData = [];
        //polishData
        this.calendarData = [];
        this.expiredCalendarData = [];
    }

    async fetchEventData() {
        try {
            const response = await fetch('https://calendar.coco.study/remote.php/dav/public-calendars/KYWMxj4sCiELiCpk?export');
            const text = await response.text();
            const jcal = await ICAL.parse(text);
            const cal = new ICAL.Component(jcal);

            cal.getAllSubcomponents('vevent').forEach(event => {
                const e = new ICAL.Event(event);
                //console.log(e.summary);
                this.eventName = event.getFirstPropertyValue('summary');

                for (let i = 0; i < event.jCal[1].length; i++) {
                    let categoryName = event.jCal[1][i][0];

                    if (categoryName === 'dtstart') {
                        this.eventStartTime = new Date(event.jCal[1][i][3]);
                    }

                    // Duration irgendwie berechnen?!?
                    if (this.eventDuration < 180) {
                        this.eventDuration = String(Math.round(this.eventDuration)) + ' Min';
                    } else if (this.eventDuration < 1440) {
                        this.eventDuration /= 60;
                        this.eventDuration = String(Math.round(this.eventDuration)) + ' Std';
                    } else if (this.eventDuration >= 1440) {
                        this.eventDuration /= (60 * 24);
                        this.eventDuration = String(Math.round(this.eventDuration)) + ' Tage';
                    }
                    //this.eventName += " (" + this.eventDuration + ")";

                    // Funktion für Alle Arrays, die " mit ' ersetzt
                    if (categoryName === 'location') {
                        this.eventLocation = event.jCal[1][i][3];
                        this.eventLocation = this.eventLocation.replace(
                            /S22|Schanzenstraße 22|Schanzenstr. 22/g,
                            'SCH22'
                        );
                        this.eventLocation = this.eventLocation.replace(
                            /S28|Schanzenstraße 28|Schanzenstr. 28/g,
                            'SCH28'
                        );
                        this.eventLocation = this.eventLocation.replace(/Durch/g, 'Dutch');
                        this.eventLocation = this.eventLocation.replace(/ "Aquarium"/g, '');

                        if (this.eventLocation.includes('http')) {
                            this.eventLocation = 'Remote';
                        }
                    }

                    if (categoryName === 'status') {
                        this.eventStatus = event.jCal[1][i][3];
                    }

                    if (categoryName === 'summary') {
                        for (let j = 0; j < event.jCal[1][i].length; j++) {
                            if (
                                event.jCal[1][i][3].toLowerCase().includes('cancelled') ||
                                event.jCal[1][i][3].toLowerCase().includes('canceled')
                            ) {
                                this.eventStatus = 'CANCELED';
                                console.log('Warnung: >>' + this.eventName + '<< was canceled!');
                            }
                        }
                    }
                }

                let row = [this.eventLocation, this.eventName, this.eventStartTime];
                if (
                    this.eventStatus !== 'cancelled' &&
                    this.eventStatus !== 'Cancelled' &&
                    this.eventStatus !== 'CANCELLED' &&
                    this.eventStatus !== 'canceled' &&
                    this.eventStatus !== 'Canceled' &&
                    this.eventStatus !== 'CANCELED'
                ) {
                    this.eventData.push(row);
                }
            });
            console.log("event-data fetched (" + this.eventData.length + ")");
            return this.eventData;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    async fetchModulData() {
        try {
            for (let i = 0; i < 3; i++) {
                const response = await fetch(this.url + this.currentSemesters[i]);
                const text = await response.text();
                const jcal = await ICAL.parse(text);
                const cal = new ICAL.Component(jcal);

                cal.getAllSubcomponents('vevent').forEach(event => {
                    const e = new ICAL.Event(event);
                    let summary = e.summary.toString();
                    for (let j = 1; j < 7; j++) {
                        summary = summary.replace(new RegExp(j + "\\. Semester: "), "");
                    }
                    let date = e.startDate.toJSDate();
                    let semester = this.currentSemesters[i] + 1;
                    let cocoLaunchDate = new Date(2019,10,1);
                    let currentDate = new Date();
                    let genNumber =
                        Math.floor(currentDate.getFullYear() - cocoLaunchDate.getFullYear())
                        - Math.floor((semester-1) / 2);
                    let gen = "Gen " + genNumber;
                    let row = [gen, summary, date];
                    this.modulData.push(row);
                });
            }

            console.log("modul-data fetched (" + this.modulData.length +")");
            return this.modulData;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    async fetchAssignmentData() {
        try {
            const response = await fetch(this.FullUrl1);
            const rep1 = await response.text();
            const assignmentDataTable = JSON.parse(rep1.substr(47).slice(0, -2));

            let currentDate = new Date();
            for (let i = 0; i < assignmentDataTable.table.rows.length; i++) {
                let gen = assignmentDataTable.table.rows[i].c[0].v;
                let modul = "Abgabe: " + assignmentDataTable.table.rows[i].c[1].v;

                //Get Date
                let assignmentYear = parseInt(assignmentDataTable.table.rows[i].c[3].v);
                let assignmentMonth = parseInt(assignmentDataTable.table.rows[i].c[4].v) - 1;
                let assignmentDay = parseInt(assignmentDataTable.table.rows[i].c[5].v);
                let fullDate = `${assignmentDay}/${assignmentMonth}/${assignmentYear}`;
                let assignmentDate = new Date(assignmentYear, assignmentMonth, assignmentDay);
                let row = [gen, modul, assignmentDate];
                this.assignmentData.push(row);
            }

            console.log("assignment-data fetched (" + this.assignmentData.length + ")");
            return this.assignmentData;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    async polishData() {
        try {
            let eventData = await this.fetchEventData();
            let modulData = await this.fetchModulData();
            let assignmentData = await this.fetchAssignmentData();

            //Merge Data
            this.mergeData(eventData);
            this.mergeData(modulData);
            this.mergeData(assignmentData);

            //Sort Data by Date -> [0] is always closest to current date
            this.calendarData.sort((a, b) => a[2] - b[2]);
            this.expiredCalendarData.sort((a, b) => b[2] - a[2]);

            //Format Data for DisplayBuilder
            this.formatData(this.calendarData);
            this.formatData(this.expiredCalendarData);

            console.log("calendar-data polished");
            console.log("upcoming events: " + this.calendarData.length + " | expired events: " + this.expiredCalendarData.length);
            //this.logUpcomingEvents();
            //this.logExpiredEvents();

            return this.calendarData;

        } catch (error) {
            console.error('Fehler bei polishData()', error);
        }
    }

    mergeData(array = []){
        let currentDate = new Date;

        for (let i = 0; i < array.length; i++) {
            let specificDate = new Date(array[i][2]);
            if (currentDate < specificDate) {
                this.calendarData.push(array[i]);
            } else {
                this.expiredCalendarData.push(array[i]);
            }
        }
    }

    formatData(array = []) {
        for (let i = 0; i < array.length; i++) {
            //Replace Date Object with String
            const date = new Date(array[i][2]);
            const options = {timeZone: 'Europe/Berlin', day: 'numeric', month: 'numeric', year: 'numeric'};
            array[i][2] = date.toLocaleString('de-DE', options);
            //Optimize Strings
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === null) {
                    array[i][j] = "n.a.";
                }
                if (array[i][j].includes('"')) {
                    array[i][j].replace(/"/g, "'");
                }
            }
        }
    }

    async getCalendarArray(){
        await this.polishData();
        console.log("(get):" + this.calendarData.length)
        return this.calendarData;
    }

    async getExpiredCalendarArray(){
        await this.polishData();
        return this.calendarData;
    }

    logUpcomingEvents(){
        for (let i = 0; i < this.calendarData.length; i++) {
            for (let j = 0; j < this.calendarData[i].length; j++) {
                console.log(this.calendarData[i][j]);
            }
            console.log("-----------------------");
        }
    }

    logExpiredEvents(){
        for (let i = 0; i < this.expiredCalendarData.length; i++) {
            for (let j = 0; j < this.expiredCalendarData[i].length; j++) {
                console.log(this.expiredCalendarData[i][j]);
            }
            console.log("-----------------------");
        }
    }

}