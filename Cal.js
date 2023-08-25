class Claculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear()
}
clear(){
    this.current = ''
    this.previous = ''
    this.operation = undefined
}

delete(){
    this.current = this.current.toString().slice(0,-1)
}

appnedNumber(number){
    if (number === '.' && this.current.includes('.')) return
    this.current = this.current.toString() + number.toString()
}

chooseOperation(operation){
    if(this.current === '') return
    if(this.previous !==''){
        this.compute()
    } 
    this.operation = operation
    this.previous = this.current
    this.current = ''
}

compute(){
    let computation
    const prev = parseFloat(this.previous)
    const curr = parseFloat(this.current)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operation){
        case '+':
            computation = prev + curr
            break
        case '-':
            computation = prev - curr
            break
        case '/':
            computation = prev / curr
            break
        case '*':
            computation = prev * curr
            break
        default:
            return
    }
    this.current = computation
    this.operation = undefined
    this.previous = '' 
}

getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)){
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits: 0 })
    }
    if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }    
}

updateDisplay(){
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.current)
    if (this.operation != null){
        this.previousOperandTextElement.innerText = `${this.previous} ${this.operation}`
    }
    else{
        this.previousOperandTextElement.innerText = ''
    }
}   
}

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Claculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appnedNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.chooseOperation(operator.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})