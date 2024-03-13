import { fadeIn } from "../../Utils/Fade In.mjs";
import { fadeOut } from "../../Utils/Fade Out.mjs";
import { current } from "../../Utils/Globals.mjs";
import { PlayerCharacter } from "./Player Character.mjs";
import { PlayerName } from "./Player Name.mjs";
import { PlayerInfo } from "./Player Pronouns.mjs";

export class Player {

    #pState;
    #simgSrc;
    #pName;
    #pProns;
    #pChar;

    /**
     * Manages all info related to a player on the Scoreboard
     * @param {HTMLElement} wrapEl - Wrapper containing name and tag
     * @param {HTMLElement} pronEl - Element containing player pronouns
     * @param {HTMLElement} charEl - Element containing character image
     * @param {HTMLElement} stateEl - Wrapper containing player state
     * @param {Number} id - Player slot
     */
    constructor(wrapEl, pronEl, charEl, id) {

        // player name and tag and state
        const nameEl = wrapEl.getElementsByClassName("names")[0];
        const tagEl = wrapEl.getElementsByClassName("tags")[0];
        const stateEl = wrapEl.getElementsByClassName("state")[0];
        this.#pName = new PlayerName(nameEl, tagEl, stateEl, id);

        // player info
        this.#pProns = new PlayerInfo(pronEl, id);

        // player character
        this.#pChar = new PlayerCharacter(charEl);

    }

    /**
     * Gets this player's name class
     * @returns {PlayerName}
     */
    name() {
        return this.#pName;
    }

    /**
     * Gets this player's pronouns class
     * @returns {PlayerInfo}
     */
    info() {
        return this.#pProns;
    }

    /**
     * Gets this player's character class
     * @returns {PlayerCharacter}
     */
    char() {
        return this.#pChar;
    }

    /**
     * Update player name and tag, fading them out and in
     * @param {String} name - Name of the player
     * @param {String} tag - Tag of the player
     */
    updateName(name, tag) {

        // if either name or tag do not match
        if (name != this.#pName.getName() || tag != this.#pName.getTag()) {
            this.#pName.update(name, tag);
        }

    }

    /**
     * Update player states, fading them out and in
     * @param {String} state - State of the player
     */
    async updateState() {

        let stateName = "";

        // if the image to show changed
        if (this.#simgSrc != `Resources/SVGs/Flags/${stateName}.svg`) {

            // store for later
            this.#simgSrc = `Resources/SVGs/Flags/${stateName}.svg`;

            // delay for fadein animation
            let delay = current.delay;

            // if we aint loading the view, hide the logo
            if (!current.startup) {
                delay = 0;
                await fadeOut(this.#pState, fadeOutTimeSc);
            }

            // update the actual image
            this.#pState.src = this.#simgSrc;

            // and fade it in
            fadeIn(this.#pState, fadeInTimeSc, delay + .35);
            

        }
    }

    /**
     * Updates the displayed player info (pronouns, socials)
     * @param {String} pronouns - The player's pronouns
     */
    updatePronouns(pronouns) {

        if (this.#pProns.getPronouns() != pronouns) {
            this.#pProns.update(pronouns);
        }

    }

    /**
     * Updates all player's character elements
     * @param {Object} scData - Data for the Scoreboard
     * @returns {Promise <() => void>} Promise with fade in animation function
     */
    updateChar(scData) {

        return this.#pChar.update(scData);

    }

    /**
     * Adapts player to the selected gamemode
     * @param {Number} gamemode - Gamemode to change to
     */
    changeGm(gamemode) {
        this.#pName.changeGm(gamemode);
        this.#pChar.changeGm(gamemode);
    }

    /** Display elements and animations when user comes back to the browser */
    show() {
        this.#pName.show();
        this.#pChar.show();
    }

}