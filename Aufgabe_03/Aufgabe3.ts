namespace L03_PotionMaker {

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        console.log("start");
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#form");

        form.addEventListener("change", handleChange);
    }

    function handleChange(_event: Event): void {
        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#output");
        // recipe.innerHTML = "";

        let formData: FormData = new FormData(document.forms[0]);
        let total: number = 0;
        
        for (let entry of formData) {
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            
            recipe.innerHTML += item.value;
            
            if (entry[0] == "ingredient") {
                let price: number = Number(item.getAttribute("price"));
                let amount: number = Number(item.getAttribute("amount"));

                total += price * amount;

                Currency(price);

                recipe.innerHTML += amount + item.value + price;
            }
        }

        // currency(price);
        recipe.innerHTML += "<p>Total: " + total;
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