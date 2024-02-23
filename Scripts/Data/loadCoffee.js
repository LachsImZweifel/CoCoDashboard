class loadCoffee {
    constructor() {
        this.lowCoffeeLevelText = "";
        this.lowMilkLevelText = "";
        this.lowFilterLevelText = "";
        this.lowSugarLevelText = "";
        this.acceptableFillLevelText = "";
        this.finalLevelText = "";

        this.coffeeLevel = 0;
        this.milkLevel = 0;
        this.filterLevel = 0;
        this.sugarLevel = 0;
    }

    async startTranslation() {
        try {
            const response = await fetch(dataHandler.getCoffeeSpreadSheetFullURL());
            const rep1 = await response.text();
            const coffeeTableRaw = JSON.parse(rep1.substr(47).slice(0, -2));
            const coffeeTableClean = [];

            for (let i = 0; i < coffeeTableRaw.table.rows.length; i++) {
                const row = [];
                for (let j = 0; j < coffeeTableRaw.table.cols.length; j++) {
                    row.push(coffeeTableRaw.table.rows[i].c[j].v);
                }
                coffeeTableClean.push(row);
            }
            dataHandler.setCoffeeInfoData(coffeeTableRaw);

            for (let i = 0; i < coffeeTableClean.length; i++) {
                const currentRow = coffeeTableClean[i];
                this.coffeeLevel = currentRow[0];
                this.milkLevel = currentRow[1];
                this.filterLevel = currentRow[2];
                this.sugarLevel = currentRow[3];
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    async displaySentences() {
        this.finalLevelText = "";

        if (this.coffeeLevel < 25) {
            this.lowCoffeeLevelText = "Der Kaffeefüllstand ist niedrig!";
            this.finalLevelText += this.lowCoffeeLevelText;
        }
        if (this.milkLevel < 25) {
            this.lowMilkLevelText = "Nicht mehr viel Milch da!";
            this.finalLevelText += " " + this.lowMilkLevelText;
        }
        if (this.filterLevel < 25) {
            this.lowFilterLevelText = "Die Filter sind fast leer!";
            this.finalLevelText += " " + this.lowFilterLevelText;
        }
        if (this.sugarLevel < 25) {
            this.lowSugarLevelText = "Nur noch wenig Zucker vorhanden!";
            this.finalLevelText += "" + this.lowSugarLevelText;
        } else if (this.coffeeLevel >= 25 && this.milkLevel >= 25 && this.filterLevel >= 25 && this.sugarLevel >= 25) {
            this.acceptableFillLevelText = "Alle Füllstände sind noch ausreichend!";
            this.finalLevelText += " " + this.acceptableFillLevelText;
        }

        return this.finalLevelText;
    }
}