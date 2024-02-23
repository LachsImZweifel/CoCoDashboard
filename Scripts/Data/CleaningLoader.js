class CleaningLoader {
    constructor() {
        // Google-Tabelle Parameter
        this.SheetId = '1H7NYgtD-wAvhGpG_4BTk5uOIdw48xR-GvXu5Kbsi4sI';
        this.SheetTitle = 'cleaningList';
        this.SheetRange1 = 'A1:C4';

        // URL zur Google-Tabelle
        this.FullUrl1 = 'https://docs.google.com/spreadsheets/d/' + this.SheetId + '/gviz/tq?sheet=' + this.SheetTitle + '&range=' + this.SheetRange1;

        // Array zum Speichern der geladenen Reinigungsdaten
        this.fullCleaningTable = [];
    }

    // Methode zum Laden der Daten aus der Google-Tabelle
    async load() {
        try {
            const response = await fetch(this.FullUrl1);
            const rep1 = await response.text();

            // Parsen und Extrahieren der Daten
            let cleaningTable = JSON.parse(rep1.substr(47).slice(0, -2));

            // Iteration über die Zeilen und Spalten der Tabelle und Speichern der Daten im Array
            for (let i = 0; i < cleaningTable.table.rows.length; i++) {
                let row = [];
                for (let j = 0; j < cleaningTable.table.cols.length; j++) {
                    row.push(cleaningTable.table.rows[i].c[j].v);
                }
                this.fullCleaningTable.push(row);
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    // Methode zur Ausgabe eines Satzes mit den Namen der Reiniger für eine bestimmte Woche
    async getCleanersSentence(week) {
        let name1 = this.fullCleaningTable[week - 1][1];
        let name2 = this.fullCleaningTable[week - 1][2];
        return "Diese Woche haben " + name1 + " und " + name2 + " Aufräumdienst";

        //When List is complete uncomment this
        /*
        let week = this.getCalendarWeek();
        console.log(week);
        if(this.fullCleaningTable[week - 1] != null){
            let name1 = this.fullCleaningTable[week - 1][1];
            let name2 = this.fullCleaningTable[week - 1][2];
            return "Diese Woche haben " + name1 + " und " + name2 + " Aufräumdienst";
        }else{
            return "Diese Woche gibt es keinen eingetragenen Aufräumdienst"
        }
         */
    }

    getCalendarWeek() {
        let date = new Date(date);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 4 - (date.getDay() || 7));

        const yearStart = new Date(date.getFullYear(), 0, 1);
        const weekNumber = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);

        return weekNumber;
    }


}