var L03_PotionMaker;
(function (L03_PotionMaker) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log("start");
        let form = document.querySelector("#form");
        form.addEventListener("change", handleChange);
    }
    function handleChange(_event) {
        let recipe = document.querySelector("div#output");
        // recipe.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        let total = 0;
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            recipe.innerHTML += item.value;
            if (entry[0] == "ingredient") {
                let price = Number(item.getAttribute("price"));
                let amount = Number(item.getAttribute("amount"));
                total += price * amount;
                Currency(price);
                recipe.innerHTML += amount + item.value + price;
            }
        }
        // currency(price);
        recipe.innerHTML += "<p>Total: " + total;
    }
    function Currency(_price) {
        let knut;
        let sickel;
        let galleone;
        let currency;
        if (_price < 29) {
            currency = _price.toString() + "Knut";
        }
        else if (_price < 493) {
            sickel = _price / 29;
            knut = _price % 29;
            currency = sickel.toFixed(0) + "Sickel" + knut.toFixed(0) + "Knut";
        }
        else {
            galleone = _price / 493;
            _price %= 493;
            sickel = _price / 29;
            knut = _price % 29;
            currency = galleone.toFixed(0) + "Galleone" + sickel.toFixed(0) + "Sickel" + knut.toFixed(0) + "Knut";
        }
    }
})(L03_PotionMaker || (L03_PotionMaker = {}));
//# sourceMappingURL=Aufgabe3.js.map