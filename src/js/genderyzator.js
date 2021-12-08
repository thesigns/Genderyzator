export let genderyzator = {

    male(text) {
        return text.replace(/ *\p{L}\([^)]*\)*/ug, match => match[0]);
    },

    female(text, neutral) {
        return text.replace(/ *\p{L}+\([^)]*\)*/ug, (match) => {
            let subMatch1 = match.replace(/ *\([^)]*\)*/g, "");
            let subMatch2 = match.replace(/ *.*\(/g, "").slice(0, -1);
            if (subMatch2[0] === "-") {
                if (!neutral) {
                    subMatch2 = subMatch2.slice(1);
                    return subMatch1.slice(0, -(subMatch2.length)) + subMatch2;
                }
                return subMatch1 + "(" + subMatch2 + ")";
            } else {
                if (subMatch2.length === 1) {
                    if (!neutral) {
                        return subMatch1 + subMatch2;
                    } else {
                        return subMatch1 + "(" + subMatch2 + ")";
                    }
                } else {
                    if (!neutral) {
                        return " " + subMatch2;
                    } else {
                        return subMatch1 + " lub " + subMatch2;
                    }
                }
            }
        });
    },

    neutral(text) {
        return this.female(text, true);
    }

};

genderyzator.m = genderyzator.male;
genderyzator.f = genderyzator.female;
genderyzator.n = genderyzator.neutral;
