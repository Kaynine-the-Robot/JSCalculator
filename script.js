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
    if (number === '.' && this.screenVal.includes('.')) {this.displayError("Error: Can Only Have 1 Decimal Point")}
    else {this.screenVal = this.screenVal + number.toString()}
  }
  
  chooseOperation(operation){
  	if (this.screenVal === '') {this.displayError("Error: No Operands")}
    else if (["*","/","-","+"].includes(this.screenVal.charAt(this.screenVal.length - 1))) {this.displayError("Error: Two Consecutive Operators")}
    else {this.screenVal = this.screenVal + operation.toString()}
  }
  
  compute(){
    if (["*","/","-","+"].includes(this.screenVal.charAt(this.screenVal.length - 1))) {this.displayError("Error: Cannot End With Operator")}
    else if (this.unevenBrackets()) {this.displayError("Error: Uneven Brackets")}
    else {
      this.fixMultiplyBrackets()
      this.screenVal = eval(this.screenVal).toString()
    }
  }

  fixMultiplyBrackets(){
    var i = 0
    var len = this.screenVal.length
    for(i; i < len; i++) {
        if(this.screenVal.charAt(i) === "(" && (this.screenVal.charAt(i-1) >= "0") && (this.screenVal.charAt(i-1) <= "9"))
          this.screenVal = (this.screenVal.slice(0,i) + "*" + this.screenVal.slice(i))
        else if(this.screenVal.charAt(i) === ")" && (this.screenVal.charAt(i+1) >= "0") && (this.screenVal.charAt(i+1) <= "9"))
          this.screenVal = (this.screenVal.slice(0,i+1) + "*" + this.screenVal.slice(i+1))
      }
  }

  unevenBrackets(){
    var depth = 0
    for(var i of this.screenVal) {
        if(i === "(")
          depth++;
        else if(i === ")")
          depth++;
      }
      
    if(depth%2 === 0) return false
    else return true
  }
  
  updateDisplay(){
  	document.output.textview.value = this.screenVal
  }
  
  displayError(message){
  	this.oldVal = this.screenVal
  	this.screenVal = message
    document.output.textview.style.color = 'red';
  }
  
  checkIfError(){
  	switch(this.screenVal){
    	case "Error: No Operands":
      	this.screenVal = this.oldVal;
      	break;
      case "Error: Two Consecutive Operators":
      	this.screenVal = this.oldVal;
          break;
      case "Error: Cannot End With Operator":
        this.screenVal = this.oldVal;
        break;
      case "Error: Can Only Have 1 Decimal Point":
        this.screenVal = this.oldVal;
        break;
      case "Error: Uneven Brackets":
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
  	calculator.checkIfError()
  	calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    calculator.checkIfError()
  })
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
  	calculator.checkIfError()
  	calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    calculator.checkIfError()
  })
})

equalsButton.addEventListener('click', () => {
	calculator.checkIfError()
  	calculator.compute()
    calculator.updateDisplay()
    calculator.checkIfError()
})

deleteButton.addEventListener('click', () => {
	calculator.checkIfError()
  	calculator.delete()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
	calculator.checkIfError()
  	calculator.clear()
    calculator.updateDisplay()
})