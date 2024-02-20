//Link to Google Sheet: https://docs.google.com/spreadsheets/d/1u2dxMrFCoEOpCxoRdq8em06Ua09nEXKM2B5Tk5i_R7c/edit#gid=0
class CleaningLoader
{
    constructor() {
        this.SheetId = '1H7NYgtD-wAvhGpG_4BTk5uOIdw48xR-GvXu5Kbsi4sI';
        this.SheetTitle = 'cleaningList';
        this.SheetRange1 = 'A1:C4';

        this.FullUrl1 = ('https://docs.google.com/spreadsheets/d/' + this.SheetId + '/gviz/tq?sheet=' + this.SheetTitle + '&range=' + this.SheetRange1);
        this.fullCleaningTable = [];
    }

    load(){
        let cleaningArray = [];
        fetch(this.FullUrl1)
            .then(res => res.text())
            .then(rep1 => {
                let cleaningTable = JSON.parse(rep1.substr(47).slice(0, -2));
                for (let i = 0; i < cleaningTable.table.rows.length; i++) {
                    let row = [];
                    for (let j = 0; j < cleaningTable.table.cols.length; j++) {
                        row.push(cleaningTable.table.rows[i].c[j].v);
                    }
                    cleaningArray.push(row);
                }

            });
        this.fullCleaningTable = cleaningArray;
    }

    getCleanersSentence(week){
        let name1 = this.fullCleaningTable[week-1][1];
        let name2 = this.fullCleaningTable[week-1][2];
        return "Diese Woche haben " + name1 + " und " + name2 + " Aufräumdienst";
    }
}