function genderizeText(text, gender) {

    // male gender
    //
    if (gender === 1) {
        return text.replace(/ *\p{L}\([^)]*\)*/ug, match => match[0]);
    }


    // female or unknown gender
    //
    return text.replace(/ *\p{L}+\([^)]*\)*/ug, (match) => {

        let subMatch1 = match.replace(/ *\([^)]*\)*/g, "");
        let subMatch2 = match.replace(/ *.*\(/g, "").slice(0, -1);

        if (subMatch2[0] === "-") {
            if (gender === 0) {
                subMatch2 = subMatch2.slice(1);
                return subMatch1.slice(0, -(subMatch2.length)) + subMatch2;
            }
            return subMatch1 + "(" + subMatch2 + ")";
        } else {
            if (subMatch2.length === 1) {
                if (gender === 0) {
                    return subMatch1 + subMatch2;
                } else {
                    return subMatch1 + "(" + subMatch2 + ")";
                }
            } else {
                if (gender === 0) {
                    return " " + subMatch2;
                } else {
                    return subMatch1 + " lub " + subMatch2;
                }
            }
        }
    });

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(`button.u`).addEventListener("click", () => update());
    document.querySelector(`button.f`).addEventListener("click", () => update(0));
    document.querySelector(`button.m`).addEventListener("click", () => update(1));
});

function update(gender) {
    let textInput = document.querySelector(`textarea`).value;
    document.querySelector(`p.output`).innerHTML = genderizeText(textInput, gender);
}
