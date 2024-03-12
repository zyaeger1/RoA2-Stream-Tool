import { stPath } from './Globals.mjs';
import { getJson } from './File System.mjs';

const flagList = await getJson(stPath.text + "/Flag Names");

class Flag {

    #flagSelect = document.getElementById('flagNameSelect');

    
    constructor() {
        
        // create the flag select list
        for (let i = 0; i < flagList.length; i++) {

            const flagOption = document.createElement('option');
            flagOption.value = flagList[i].name;
            flagOption.innerHTML = flagList[i].name;

            // add colors to the list
            flagOption.style.backgroundColor = "var(--bg5)";
            
            this.#flagSelect.appendChild(flagOption);

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

export const flag = new Flag;