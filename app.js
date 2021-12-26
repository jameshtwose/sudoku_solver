const puzzleBoard = document.querySelector("#puzzle")
const solveButton = document.querySelector("#solve-button")
const solutionDisplay = document.querySelector("#solution")
const squares = 81
let submission = []

for (let index = 0; index < squares; index++) {
    const inputElement = document.createElement("input")
    inputElement.setAttribute("type", "number")
    inputElement.setAttribute("min", 1)
    inputElement.setAttribute("max", 9)
    puzzleBoard.appendChild(inputElement)

    if (
        ((index % 9 == 0 || index % 9 == 1 || index % 9 == 2) && index < 21) ||
        ((index % 9 == 6 || index % 9 == 7 || index % 9 == 8) && index < 27) ||
        ((index % 9 == 3 || index % 9 == 4 || index % 9 == 5) && index > 27 && index < 53) ||
        ((index % 9 == 0 || index % 9 == 1 || index % 9 == 2) && index > 53) ||
        ((index % 9 == 6 || index % 9 == 7 || index % 9 == 8) && index > 53)
    ) {
        inputElement.classList.add('odd-section')
    }
}

const joinValues = () => {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push(".")
        }
    })
    console.log(submission)
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll("input")
    if (isSolvable && solution) {
        inputs.forEach((input, index) => {
            input.value = solution[index]
        })
        solutionDisplay.innerHTML = "This is the answer!"
    } else {
        solutionDisplay.innerHTML = "There was no solution to this puzzle!"
    }
}

const solve = () => {
    joinValues()
    const data = {numbers: submission.join("")}
    console.log('data', data)

    fetch("http://localhost:8000/solve", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data=>{
        console.log(data)
        populateValues(data.solvable, data.solution)
        submission = []

    })
    .catch((error) => {
        console.error(error)
    })
}


solveButton.addEventListener("click", solve)

// for loop alternatives
// array = [1,2,3,4]
// const newItem = array.map((el) => {
//     return el + 2;
// })

// newItem.forEach((el) => {

// })
