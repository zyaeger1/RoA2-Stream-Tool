import { stPath } from './Globals.mjs';
import { getJson } from './File System.mjs';

const roundList = await getJson(stPath.text + "/Flag Names");

class Flag {

    #flagInp = document.getElementById('flagName');
    #flagSelect = document.getElementById('flagNameSelect');

    
    constructor() {
        
        // create the round select list
        for (let i = 0; i < roundList.length; i++) {

            const roundOption = document.createElement('option');
            roundOption.value = roundList[i].name;
            roundOption.innerHTML = roundList[i].name;

            // add colors to the list
            roundOption.style.backgroundColor = "var(--bg5)";
            if (roundList[i].showNumber) {
                roundOption.style.backgroundColor = "var(--bg2)";
            }

            this.#flagSelect.appendChild(roundOption);

        }

        // add in additional none option
        const noneOption = document.createElement('option');
        noneOption.value = "";
        noneOption.innerHTML = "(none)";
        noneOption.style.backgroundColor = "var(--bg5)";
        this.#flagSelect.appendChild(noneOption);

        // function to call when selecting an option
        this.#flagSelect.addEventListener("change", () => {this.updateSelect()});
        
    }

    getIndex() {
        return this.#flagSelect.selectedIndex;
    }

}

export const round = new Flag;