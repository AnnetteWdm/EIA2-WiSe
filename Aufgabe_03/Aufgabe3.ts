namespace L03_PotionMaker {

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        let infoform: HTMLDivElement = <HTMLDivElement>document.querySelector("div#Infoform");
        infoform.addEventListener("change", handleInfo);

        let instructionsform: HTMLDivElement = <HTMLDivElement>document.querySelector("div#instructionsform");
        instructionsform.addEventListener("change", handleInfo);

    }

    function handleInfo(_event: Event): void {
        let spiders: HTMLFormElement = <HTMLFormElement>document.querySelector("#spiderlegs");
        let toads: HTMLFormElement = <HTMLFormElement>document.querySelector("#toadeyes");
        let dragon: HTMLFormElement = <HTMLFormElement>document.querySelector("#dragonliver");
        let heat: HTMLFormElement = <HTMLFormElement>document.querySelector("#heat");
        let cool: HTMLFormElement = <HTMLFormElement>document.querySelector("#cool");
        let intensity: boolean = false;

        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("#result");
        recipe.innerHTML = "";
       
        let formData: FormData = new FormData(document.forms[0]);

        let price: number = 0;
        
        for (let entry of formData) {

            switch (entry[0]) {
                case "potion":
                    if (entry[1] != "") {
                    recipe.innerHTML += "Name of the potion: " + entry[1] + "<br>";
                    }
                    break;
            
                case "description":
                    if (entry[1] != "")
                    recipe.innerHTML += "Description: " + entry[1] + "<br>";
                    break;

                case "effect":
                    if (entry[1] != "Unbekannt")
                    recipe.innerHTML += "Effect: " + entry[1] + "<br>";
                    break;

                case "duration":
                    if (entry[1] != "")
                    recipe.innerHTML += "Duration: " + entry[1] + " Minute(n)" + "<br>" + "<br>";
                    break;

                case "ingredients":
                    if (entry[1] != "")
                    recipe.innerHTML += "You will need: " + entry[1] + "<br>";
                    break;

                case "Spideramount":
                    if (entry[1] != "" && spiders.checked) {
                    recipe.innerHTML += " • Amount: " + entry[1] + "<br>";
                    price += (4.20 * Number(entry[1]));
                    }
                    break;
                
                case "toadamount":
                    if (entry[1] != "" && toads.checked) {
                    recipe.innerHTML += " • Amount: " + entry[1] + "<br>";
                    price += 2.10 * Number(entry[1]);
                    }
                    break;

                case "Dragonamount":
                    if (entry[1] != "" && dragon.checked) {
                    recipe.innerHTML += " • Amount: " + entry[1] + "<br>";
                    price += 1.50 * Number(entry[1]);
                    }
                    break;

                case "Temperature":
                    if (entry[1] != "")
                    recipe.innerHTML += "<br>" + "Temperature: " + entry[1] + "<br>";
                    break;

                case "Degree":
                    if (entry[1] != "" && heat.checked || cool.checked)
                    recipe.innerHTML += "• Follow the instructions until the potion has a temperature of " + entry[1] + "°C" + "<br>";
                    break;
                
                case "tempduration":
                    if (entry[1] != "" && heat.checked || cool.checked)
                    recipe.innerHTML += "• Follow the Instruction for " + entry[1] + " minutes" + "<br>";
                    break;

                case "Tempconsistency":
                    if (entry[1] != "" && heat.checked || cool.checked)
                    recipe.innerHTML += "• Follow instruction until potion is " + entry[1] + "<br>";
                    break;
                
                case "TemperatureColour":
                    if (entry[1] != "" && heat.checked || cool.checked)
                    recipe.innerHTML += "• Follow the instruction until the potion is " + entry[1] + "<br>";
                    break;

                case "Stirringintensity":
                    if (Number(entry[1]) != 0) {
                    recipe.innerHTML += "<br>" + "Stirringintensity: " + entry[1] + "<br>";
                    intensity = true;
                    }
                    break;
            
                case "stirringduration":
                    if (entry[1] != "" && intensity)
                    recipe.innerHTML += "• Stir for " + entry[1] + " minutes" + "<br>";
                    break;

                case "Stirringconsistency":
                    if (entry[1] != "" && intensity)
                    recipe.innerHTML += "• Stir until the potion has a " + entry[1] + " consistency" + "<br>";
                    break;
                
                case "Stirringcolour":
                    if (entry[1] != "" && intensity)
                    recipe.innerHTML += "• Stir until the potion is " + entry[1] + "<br>";
                    break;
            }
        
            if (recipe.innerHTML != null) {
                recipe.style.backgroundColor = "rgb(236, 239, 243)";
                recipe.style.border = "0.5px solid black";
            }
        
        }
        
        for (let entry of formData) {
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            
            recipe.innerHTML += item.value;
            
            if (entry[0] == "ingredients") {
                let price: number = Number(item.getAttribute("price"));
                let amount: number = Number(item.getAttribute("amount"));
                let total: number;

                total += price * amount;

                Currency(price);

                recipe.innerHTML += amount + item.value + price;
            }
        }
    }
    
    function Currency(_price: number): void {
        let knut: number;
        let sickel: number;
        let galleone: number;
        let currency;

        if (_price < 29) {
            currency = _price.toString() + "Knut";
        } else if (_price < 493) {
            sickel = _price / 29;
            knut = _price % 29;

            currency = sickel.toFixed(0) + "Sickel" + knut.toFixed(0) + "Knut";
        } else {
            galleone = _price / 493;
            _price %= 493;
            sickel = _price / 29;
            knut = _price % 29;

            currency = galleone.toFixed(0) + "Galleone" + sickel.toFixed(0) + "Sickel" + knut.toFixed(0) + "Knut";
        }
    }
}