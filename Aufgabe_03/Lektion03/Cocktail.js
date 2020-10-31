var L03_CocktailBar;
(function (L03_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        // console.log(_event);
        // let drink: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select");
        // console.log(drink.value);
        // let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        // console.log(inputs);
        let order = document.querySelector("div#order");
        order.innerHTML = "";
        let totalPrice = 0;
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            let price = Number(item.getAttribute("price"));
            let prices;
            let amount = Number(formData.get("Amount"));
            if (item.classList.contains("drink")) {
                prices = price * amount;
                console.log(prices);
                order.innerHTML += entry[1] + ":  " + amount + "L  =  " + prices.toFixed(2) + " € " + "<br>";
                totalPrice = prices + totalPrice;
            }
            else if (item.classList.contains("Container") || item.classList.contains("Extra")) {
                order.innerHTML += entry[1] + " " + price.toFixed(2) + " € " + "<br>";
                totalPrice = price + totalPrice;
            }
        }
        order.innerHTML += "<br>" + "<hr>" + "<b>" + "Total: " + totalPrice.toFixed(2) + " € " + "</b>";
        // if (entry[0] == "Drink")
        //     order.innerHTML += entry[1] + " € " + price;
        // else    
        //    order.innerHTML += item.name + "  € " + price;
        //order.innerHTML += " € " + price + "<br/>";
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
})(L03_CocktailBar || (L03_CocktailBar = {}));
//# sourceMappingURL=Cocktail.js.map