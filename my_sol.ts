// Optional Exercise: Javascript Logic
// What is the Challenge?
// Solve the below 3 javascript puzzles.
// The goal of this challenge is to practice our logic skills. 
// Something that is useful not only in interviews when you get challenging problems, but also in your day to day work as a developer. 
// First, start off by reading this article: https://medium.freecodecamp.org/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2

// Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
// Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

let arr = [1, "2", 4, 591, 392, 391, 2, 5, "10", 2, 1, 1, 1, 20, "20"]
let room = (arr) => {
    arr.push(Number.MAX_SAFE_INTEGER)
    arr.sort((a, b) => a - b)
    let newArray = []
    let strings = []
    let i = 0
    for (; i < arr.length; i++) {
        let value = arr[i]
        if (typeof value == "string") {
            strings.push(value)
            continue
        }
        let temp = [value]
        while (value === arr[i + 1]) {
            temp.push(arr[i + 1])
            i++
        }
        if (temp.length > 1) { newArray.push(temp) }
        else { newArray.push(temp.pop()) }
    }
    newArray.pop()
    newArray.push(strings)
    return newArray
}
room(arr)


// Question 2: Write a javascript function that takes an array of numbers and a target number. 
// The function should find two different numbers in the array that, when added together, give the target number. For example: answer([1,2,3], 4)should return [1,3]

let findTargetPair = (arr, target) => {
    arr.sort((a, b) => a - b)
    let lp = 0
    let rp = arr.length - 1
    let sum = Number.MIN_SAFE_INTEGER
    while (lp < rp) {
        sum = arr[lp] + arr[rp]
        if (sum > target) {
            rp--
        }
        else if (sum < target) {
            lp++
        }
        else {
            return [arr[lp], arr[rp]]
        }
    }
    return false
}

// Question 3: Write a function that converts HEX to RGB. 
// Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.



const hexToRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)
    return result ? {
        r: parseInt(hex.length <= 4 ? result[4] + result[4] : result[1], 16),
        g: parseInt(hex.length <= 4 ? result[5] + result[5] : result[2], 16),
        b: parseInt(hex.length <= 4 ? result[6] + result[6] : result[3], 16),
        toString: function () {
            var arr = [];
            arr.push(this.r)
            arr.push(this.g)
            arr.push(this.b)
            return "rgb(" + arr.join(",") + ")";
        }
    } : null
}

const rgbToHex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


const convert = (val) => {
    const hexRegex = /^#(?:[A-Fa-f0-9]{3}){1,2}$/gm;
    const rgbRegex = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/gm;
    const getRegexArray = (regex) => {
        let m;
        while ((m = regex.exec(val)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
        }
        return m
    }

    if (getRegexArray(hexRegex).length > 0) {
        return hexToRGB(val)
    }
    else if (getRegexArray(rgbRegex).length > 0) {
        return rgbToHex(val)
    }
    else { return false }
}