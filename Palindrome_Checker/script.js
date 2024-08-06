const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");


const isPalindrome = (text) => {
  if (text === "") {
    alert("Please input a value");
    //result.innerText = "Please input a value";
  } else {
    const newText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const revText = newText.split("").reverse().join("");

    console.log(revText);

    if (newText === revText) {
      result.innerText = `${text} is a palindrome`
    } else {
      result.innerText = `${text} is not a palindrome`
    }
  }
}

checkButton.addEventListener("click", () => {
  isPalindrome(textInput.value);
});
