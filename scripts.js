
/**
 * Return a defined-length array of random integers from 0 to numSymbols - 1.
 * @param {int} numSymbols 
 * @param {int} seqLength
 * @param {boolean} hasDuplicates
 * @returns {int[]}
 */
function generateSequence(numSymbols, seqLength, hasDuplicates)
{
    const sequence = [];

    if(hasDuplicates) // Return an entirely random sequence.
    {
        for (var i = 0; i < seqLength; i++)
        {
            sequence.push(Math.floor(Math.random() * numSymbols));
        }
    }
    else // Gotta do some tracking...
    {
        if(seqLength > numSymbols) // Last-minute error checking
        {
            throw new Error("Sequence length exceeds available symbols. Cannot create a sequence with no duplicates.");
        }

        // Create the pool of unique integers (symbol indexes) from which we can draw
        var pool = [];
        for (var i = 0; i < numSymbols; i++)
        {
            pool.push(i);
        }

        // For each integer in the sequence, select an element from the pool and remove it for future iterations.
        for (var i = 0; i < seqLength; i++)
        {
            const index = Math.floor(Math.random() * pool.length); // Random index based on the remaining length
            const nextSymbol = pool.splice(index, 1); // Select and remove the single element at that index
            sequence.push(nextSymbol); // Add the element to the sequence
        }
    }

    return sequence;
}

/**
 * Compare two arrays of integers and return an array of integers 0-2.
 * If the integers in a given position in both arrays match, returns 2.
 * If the integer in the first array matches an integer in a different position in the second array, returns a 1.
 * If there is no match, returns a 0.
 * @param {int[]} checkArray 
 * @param {int[]} answerArray 
 * @param {boolean} inOrder 
 * @returns 
 */
function compareSequence(checkArray, answerArray, inOrder)
{
    const length = checkArray.length;

    if(length !== answerArray.length)
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

    return inOrder ? result : obfuscateResponse(result);
}

function obfuscateResponse(array)
{
    const newArray = [];

    for (var i = 2; i >=0; i--)
    {
        for (var j = 0; j < array.length; j++)
        {
            if(array[j] === i)
            {
                newArray.push(i);
            }
        }
    }

    return newArray;
}

export { generateSequence, compareSequence };