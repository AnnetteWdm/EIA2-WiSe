window.addEventListener("load", myFunction);

function myFunction(): void {
    var txt: string;
    var person: string = prompt("Please enter your name:", "Harry Potter");
    if (person == null || person == "") {
      txt = "User cancelled the prompt.";
    } else {
      txt = "Hello " + person + "! How are you today?";
    }
    document.getElementById("demo").innerHTML = txt;
  }
