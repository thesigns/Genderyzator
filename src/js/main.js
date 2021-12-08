import {genderyzator} from "./genderyzator.js";

document.querySelector(`button.u`).addEventListener("click", () => update("n"));
document.querySelector(`button.f`).addEventListener("click", () => update("f"));
document.querySelector(`button.m`).addEventListener("click", () => update("m"));

function update(gender) {
    let textInput = document.querySelector(`textarea`).value;
    document.querySelector(`p.output`).innerHTML = genderyzator[gender](textInput);
}
