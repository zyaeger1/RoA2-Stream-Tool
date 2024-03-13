import { fadeIn } from "../../Utils/Fade In.mjs";
import { fadeOut } from "../../Utils/Fade Out.mjs";
import { current } from "../../Utils/Globals.mjs";
import { players } from "../Player/Players.mjs";
import { fadeInTimeSc, fadeOutTimeSc } from "../ScGlobals.mjs";

export class PlayerState {

    #stateImg;
    #imgSrc;

    /**
     * Controls the state for a player
     * @param {HTMLElement} stateImg - state image element
     */
    constructor(stateImg) {

        this.#stateImg = stateImg;

    }

    async update() {

        let nameState = "";
            nameState = players.player.name().getTag();

        // if the image to show changed
        if (this.#imgSrc != `Resources/SVGs/Flags/${nameState}.svg`) {

            // store for later
            this.#imgSrc = `Resources/SVGs/Flags/${nameState}.svg`;

            // delay for fadein animation
            let delay = current.delay;

            // if we aint loading the view, hide the state
            if (!current.startup) {
                delay = 0;
                await fadeOut(this.#stateImg, fadeOutTimeSc);
            }

            // update the actual image
            this.#stateImg.src = this.#imgSrc;

            // and fade it in
            fadeIn(this.#stateImg, fadeInTimeSc, delay + .35);
            

        }

    }

    /**
     * Updates image position depending on the gamemode
     * @param {Number} gamemode - Gamemode to change to
     */
    changeGm(gamemode) {

        if (gamemode == 2) { // doubles
            
            this.#stateImg.style.top = "65px";

        } else { // singles

            this.#stateImg.style.top = "33px";
            
        }
        
    }

    /** Shows the state image */
    show() {
        fadeIn(this.#stateImg, fadeInTimeSc, current.delay + .35);
    }
}