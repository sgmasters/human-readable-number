const simple = ['','one','two','three','four', 'five','six','seven','eight','nine'];
const oneDecades = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
const decades = ['','','twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
const thousands = ['','thousand','million', 'billion','trillion'];
const thousandValue = 1000;
const hundredValue = 100;
const decadeValue = 10;

module.exports = function toReadable (number) {
    let result = '';
    let rest = number;

    let countThousand = getCount(rest, thousandValue);
    rest -= thousandValue * countThousand;
    let countHundred = getCount(rest, hundredValue);
    rest -= hundredValue * countHundred;
    let countDecade = getCount(rest, decadeValue);

    let convertedRest = number;

    if (number == 0) {
        return 'zero'
    }

    if (countThousand > 0) {
        result += simple[Math.floor(convertedRest % thousandValue)] + ' ' + thousands[convertedRest / thousandValue];
        convertedRest -= thousandValue * countThousand;
    }

    if (countHundred > 0) {
        result = addSpaceWhenNotFirst(result);
        result += simple[Math.floor(convertedRest / hundredValue)] + ' hundred';
        convertedRest -= hundredValue * countHundred;
    }

    if (countDecade > 0) {
        if (countDecade == 1) {
            result = addSpaceWhenNotFirst(result);
            result += oneDecades[Math.floor(convertedRest - decadeValue)];
            convertedRest = 0;
        } else {
            result = addSpaceWhenNotFirst(result);
            result += decades[Math.floor(convertedRest / decadeValue)];
            convertedRest -= decadeValue * countDecade;
        }
    }

    if (convertedRest > 0) {
        result = addSpaceWhenNotFirst(result);
        result += simple[convertedRest];
    }

    return result;
}

function addSpaceWhenNotFirst(result) {
    if (result != '') {
        result += ' ';
    }
    return result;
}

function getCount(rest, value) {
    return Math.floor(rest / value);
}
