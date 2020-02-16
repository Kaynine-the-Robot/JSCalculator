class Calculator{

	constructor(screen){
  	this.screenVal = screen
    this.clear()
  }
  
  clear(){
  	this.screenVal = ''
  }
  
  delete(){
  	if (this.screenVal.length > 0) this.screenVal = this.screenVal.slice(0,-1)
  }
  
  appendNumber(number){
    if (number === '.' && this.screenVal.includes('.')) return
    this.screenVal = this.screenVal + number.toString()
  }
  
  chooseOperation(operation){
  	if (this.screenVal === '') {this.displayError("Error: No Operands")}
    else if (["*","/","-","+"].includes(this.screenVal.charAt(this.screenVal.length - 1))) {this.displayError("Error: Two Consecutive Operators")}
    else {this.screenVal = this.screenVal + operation.toString()}
  }
  
  compute(){
  	this.screenVal = eval(this.screenVal).toString()
  }
  
  updateDisplay(){
  	document.output.textview.value = this.screenVal
  }
  
  displayError(message){
  	this.oldVal = this.screenVal
  	this.screenVal = message
    document.output.textview.style.color = 'red';
  }
  
  checkError(){
  	switch(this.screenVal){
    	case "Error: No Operands":
      	this.screenVal = this.oldVal;
      	break;
      case "Error: Two Consecutive Operators":
      	this.screenVal = this.oldVal;
      	break;
      default:
      	document.output.textview.style.color = 'white';
        this.updateDisplay()
      	break;
    }
  }
  
}

const screenValue = document.output.textview.value
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')

const calculator = new Calculator(screenValue)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
  	calculator.checkError()
  	calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
  	calculator.checkError()
  	calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    calculator.checkError()
  })
})

equalsButton.addEventListener('click', () => {
		calculator.checkError()
  	calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
		calculator.checkError()
  	calculator.delete()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
		calculator.checkError()
  	calculator.clear()
    calculator.updateDisplay()
})