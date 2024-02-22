class loadCoffee {
    constructor() {

        this.lowCoffeeLevelText = "";
        this.lowMilkLevelText = "";
        this.lowFilterLevelText = "";
        this.lowSugarLevelText = "";
        this.acceptableFillLevelText = "";
        var finalLevelText = "";

        this.coffeeLevel = 0;
        this.milkLevel = 0;
        this.filterLevel = 0;
        this.sugarLevel = 0;

    }

    //Übersetzt den Inhalt der Google Sheets Tabelle in ein
    startTranslation() {
        fetch(dataHandler.getCoffeeSpreadSheetFullURL())
            .then((res) => res.text())
            .then((rep1) => {
                let coffeeTableRaw = JSON.parse(rep1.substr(47).slice(0, -2));
                let coffeeTableClean = [];

                for (let i = 0; i < coffeeTableRaw.table.rows.length; i++) {
                    let row = [];
                    for (let j = 0; j < coffeeTableRaw.table.cols.length; j++) {
                        row.push(coffeeTableRaw.table.rows[i].c[j].v);
                    }
                    coffeeTableClean.push(row);
                }
                dataHandler.setCoffeeInfoData(coffeeTableRaw);

                for (let i = 0; i < coffeeTableClean.length; i++) {
                    let currentRow = coffeeTableClean[i];
                    this.coffeeLevel = currentRow[0];
                    this.milkLevel = currentRow[1];
                    this.filterLevel = currentRow[2];
                    this.sugarLevel = currentRow[3];

                   /* console.log(`Kaffee = ${coffeeLevel}%`);
                    console.log(`Milch = ${milkLevel}%`);
                    console.log(`Filter = ${filterLevel}%`);
                    console.log(`Zucker = ${sugarLevel}%`);*/


                    // Check if Kaffee value is below 50 percent
                }
            });
    }

    //Nachprüfen ob einer der Füllstände unter 25% sind, dementsprechend eine Nachricht ausgeben.
    displaySentences() {
        console.log(this.c);
        let finalLevelText = "";

        if (this.coffeeLevel < 25) {
            this.lowCoffeeLevelText = "Der Kaffeefüllstand ist niedrig!";

            finalLevelText += this.lowCoffeeLevelText;

        }
        if (this.milkLevel < 25) {
            this.lowMilkLevelText = ("Nicht mehr viel Milch da!");

            finalLevelText  += " " + this.lowMilkLevelText
        }
        if (this.filterLevel < 25) {
            this.lowFilterLevelText = ("Die Filter sind fast leer!");

            finalLevelText += " " + this.lowFilterLevelText
        }
        if (this.sugarLevel < 25) {
            this.lowSugarLevelText =("Nur noch wenig Zucker vorhanden!");

            finalLevelText += "" + this.lowSugarLevelText
        }

        // Check if all values are above 25 percent
        else if (this.coffeeLevel >= 25 && this.milkLevel >= 25 && this.filterLevel >= 25 && this.sugarLevel >= 25) {
            this.acceptableFillLevelText = ("Alle Füllstände sind noch ausreichend!");

            finalLevelText += " " + this.acceptableFillLevelText
        }

        return finalLevelText;
    }


}