const textTransform = (text) => {

    let msgLimit = 25;
    let result = [];
    let workText = text.split('');



    if (text.length > msgLimit) { //if text lenght less or equals 140 we just push it as a result

        const countOfFragments = Math.ceil((text.length + ((Math.ceil(text.length / msgLimit).toString().length * 2) + 3) * Math.ceil(text.length / msgLimit)) / msgLimit)
        const resArr = []; //result
        let i = workText[0].length; // length of current fragment counter
        let offset = 0; // offset
        let fragmentCounter = 1; // fragments counter

        while (workText[offset] !== undefined) {
            let item = '';

            while (
                i < msgLimit &&
                workText[offset] !== undefined && // that means end of initial array
                (item.length + workText[offset].length + countOfFragments.toString().length + fragmentCounter.toString().length + 2) <= msgLimit // that checks if result item length will less than 140 after adding suffix 
            ) {
                // ^ sum of length of current fragment, current word that we want to add, number of current dragment, number of count of fragments and symbols " /" 
                item += workText[offset] + ' ';
                i = item.length;
                offset++;
            }

            i = 0;
            resArr.push(item + fragmentCounter + '/' + countOfFragments);
            fragmentCounter++;

        }
        result = resArr.map(item => { return item.substring(0, item.length - fragmentCounter.toString().length) + `${fragmentCounter - 1}` });
    } else {
        result = [text];
    }
    return result;


}

export default textTransform;