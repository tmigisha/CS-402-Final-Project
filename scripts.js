
/**
 * Return a defined-length array of random integers from 0 to numSymbols - 1.
 * @param {int} numSymbols 
 * @param {int} seqLength 
 * @returns 
 */
function generateSequence(numSymbols, seqLength)
{
    const sequence = [];

    for (var i = 0; i < seqLength; i++)
    {
        sequence.push(Math.floor(Math.random() * numSymbols));
    }

    return sequence;
}

/**
 * Compare two arrays of integers and return an array of integers 0-2.
 * If the integers in a given position in both arrays match, returns 2.
 * If the integer in the first array matches an integer in a different position in the second array, returns a 1.
 * If there is no match, returns a 0.
 */
function compareSequence(checkArray, answerArray)
{
    const length = checkArray.length();

    if(length !== answerArray.length())
    {
        throw new Error("Array mismatch. Arrays must have the same length.");
        return;
    }

    const result = []; // Return array containing ordered clues
    const accounting = []; // Array for tracking which answer positions have already been matched. Prevents double-counting partial matches.

    // If the values are a direct match, push a 2. Otherwise push a 0;
    for (var i = 0; i < length; i++)
    {
        var initVal = checkArray[i] === answerArray[i] ? 2 : 0;
        result.push(initVal);
        accounting.push(initVal);
    }

    // For each element in checkArray
    for (var i = 0; i < length; i++)
    {
        if(result[i] > 0) // Already matched
        {
            continue;
        }

        // For each element in answerArray
        for (var j = 0; j < length; j++)
        {
            if(accounting[j] > 0) // Already matched
            {
                continue;
            }
            else if(checkArray[i] === answerArray[j] && i !== j) // Partially correct
            {
                result[i] = 1;
                accounting[j] = 1;
                break;
            }
        }
    }
}

export { generateSequence, compareSequence };