import { fadeIn } from "../../Utils/Fade In.mjs";
import { fadeOut } from "../../Utils/Fade Out.mjs";
import { current } from "../../Utils/Globals.mjs";
import { gamemode } from "../Gamemode Change.mjs";
import { players } from "../Player/Players.mjs";
import { fadeInTimeSc, fadeOutTimeSc } from "../ScGlobals.mjs";
import { teams } from "./Teams.mjs";

export class TeamState {

    #stateImg;
    #imgSrc;

    #side;

    /**
     * Controls the state for a team
     * @param {HTMLElement} stateImg - state image element
     * @param {String} side - L for left, R for right
     */
    constructor(stateImg, side) {

        this.#stateImg = stateImg;
        this.#side = side == "L" ? 0 : 1; // for player/team slot

    }

    async update() {

        let nameState = "";

        if (gamemode.getGm() == 1) {

            // if gamemode is singles, we will use the first player's tag
            nameState = players.player(this.#side).name().getTag();

            
        } else {

            // if doubles, we will use the team name
            nameState = teams.team(this.#side).name().getName();
            
        }

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
            if (this.#side) { // right side
                this.#stateImg.style.right = "352px";
            } else { // left side
                this.#stateImg.style.left = "352px";
            }

        } else { // singles

            this.#stateImg.style.top = "33px";
            if (this.#side) { // right side
                this.#stateImg.style.right = "248px";
            } else { // left side
                this.#stateImg.style.left = "248px";
            }
            
        }
        
    }

    /** Shows the state image */
    show() {
        fadeIn(this.#stateImg, fadeInTimeSc, current.delay + .35);
    }

}