var buttons=document.getElementsByTagName("button");
var inputString ="";
var outputString="";
var operantsArray= [];
var operatorArray= [];
var isLastOperator= true;
var isLastAnswer = false;


 for(var i=0;i<buttons.length;i++){
     buttons[i].addEventListener("click",callAction)
 }

 document.getElementsByClassName("reset-button")[0]
 .addEventListener("click", resetAll);

 function resetAll(){
    inputString ="";
     outputString="";
     operantsArray= [];
     operatorArray= [];
     isLastOperator= true;
     printInput();
     printOutput();
     isLastAnswer= false;

 }

 function callAction(event){
    var button= event.target;

    button.style.backgroundColor= "gray";
    button.style.Color= "white";
    setTimeout(function(){
    button.style.backgroundColor= null;
    button.style.Color= null;
    },300)

    var value = event.target.innerHTML;
    var actionType = button
    .classList[0] === "red-text"? "operator" : "operants";
    if(value=== "="){
        calculateAnswer()
    }
    else{
      if(addInput(actionType,value)) inputString += value;
      printInput();
    }
    console.log(operantsArray, operatorArray);
    
    printOutput();

 }

 function printInput(){
    document.getElementsByClassName("input")[0]
    .innerHTML = inputString || 0;
 }

function printOutput(){
        document.getElementsByClassName("output")[0]
        .innerHTML = outputString || 0;


    // if(inputString === "")
    // {
    //     document.getElementsByClassName("input")[0]
    //     .innerHTML = 0;
    
    // } 
    // else{
    //     document.getElementsByClassName("input")[0]
    //     .innerHTML= inputString;
}

function addInput(actionType,value)
{
    if(actionType === "operator")

    {
        if(isLastOperator)return false;
        operatorArray.push(value);
        isLastOperator = true;
        return true
    }
    if(isLastAnswer)
    {
        return resetAll()
    }

    if(isLastOperator){
        operantsArray.push(value)
        isLastOperator = false;
        return true
    }
    operantsArray[operantsArray.length -1] += value; //input update
    // operantsArray[operantsArray.length -1] = value;
    return true

}
 
function calculateAnswer()
{
    for(var j=0; j<2; j++)
    {
        for(var i=0; i<operatorArray.length;i++)
        {
            if(j==0 && (operatorArray[i] ==="*" || operatorArray[i] ==="/"))
            {
                performAction(i);
            }

            if(j !== 0){
                performAction(i);
            }
        }
    }
    isLastAnswer = true;
    outputString = operantsArray[0];
    inputString = operantsArray[0];
    

}

function performAction(index){
    var result = 0;
    switch(operatorArray[index]){
        case "+":
            result = Number(operantsArray[index])+ Number(operantsArray[index+1])
            break;
        case "-":
            result = operantsArray[index] - operantsArray[index+1]
            break;
        case "*":
            result = operantsArray[index] * operantsArray[index+1]
            break;
        case "/":
            result = operantsArray[index] / operantsArray[index+1]
            break;

    }
    operantsArray[index] = result;
    operantsArray.splice(index+1,1);
    operatorArray.splice(index,1)
}

