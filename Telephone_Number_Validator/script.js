const number = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

clearButton.addEventListener("click", () => {
	  number.value = "";
	  result.textContent = "";
	  return;
})


const validate = () => {
	  const numString = number.value;
	  const regex = /^(?:1\s*)?((?:\(\d{3}\)\s*)|(\d{3}(?:-?\s?)?))\d{3}(?:-?\s?)?\d{4}$/;
	  
	  if (numString === "") {
		      alert("Please provide a phone number");
		      return;
		    } else {
				    const check = regex.test(numString);
				    const count = numString.replace(/[\s-\(\)]/g, "")
				    console.log(count)
				    if (check === true && ((count.length === 11 && count[0] === "1") || (count.length === 10))) {
						      result.textContent = `Valid US number: ${numString}`;
						      return;
						    } else {
								      result.textContent = `Invalid US number: ${numString}`;
								      return;
								    }
				  }
}

checkButton.addEventListener("click", validate);
