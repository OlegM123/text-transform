const textTransform = (text, msgLimit) => {

    const workText = text.split(' ');
    const countOfFragments = workText.join().length > msgLimit ?
        Math.ceil((text.length + ((Math.ceil(text.length / msgLimit).toString().length * 2) + 3) * Math.ceil(text.length / msgLimit)) / msgLimit)
        : 1;
    const resArr = []; //result
    let fragmentLengthCounter = workText[0].length; // length of current fragment counter
    let offset = 0; // offset
    let fragmentCounter = 1; // fragments counter

    if (text.length > msgLimit) { //if text lenght less or equals 140 we just push it as a result

        while (workText[offset] !== undefined) {
            let item = '';

            while (
                fragmentLengthCounter < msgLimit &&
                workText[offset] !== undefined && // that means end of initial array
                (item.length + workText[offset].length + countOfFragments.toString().length + fragmentCounter.toString().length + 2) <= msgLimit // that checks if result item length will less than 140 after adding suffix 
            ) {
                // ^ sum of length of current fragment, current word that we want to add, number of current dragment, number of count of fragments and symbols " /" 
                item += workText[offset] + ' ';
                fragmentLengthCounter = item.length;
                offset++;
            }

            fragmentLengthCounter = 0;
            resArr.push(item + fragmentCounter + '/');
            fragmentCounter++;

        }
        return (resArr.map(item => item + `${fragmentCounter - 1}`));
    } else {
        return ([text]);
    }
}

export default textTransform;