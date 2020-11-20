var L06_Hexenkessel;
(function (L06_Hexenkessel) {
    //#region client
    L06_Hexenkessel.getData();
    document.getElementById("submit")?.addEventListener("click", L06_Hexenkessel.sendPotion);
    //#region handle form
    document.getElementById("formular")?.addEventListener("change", handleChange);
    document.getElementById("heat")?.addEventListener("click", handleButton);
    document.getElementById("stir")?.addEventListener("click", handleButton);
    document.getElementById("ingredients")?.addEventListener("click", handleButton);
    document.getElementById("delete")?.addEventListener("click", deleteOne);
    document.getElementById("deleteAll")?.addEventListener("click", deleteAll);
    //#region handle slider
    document.getElementById("heat_input")?.addEventListener("input", slider);
    document.getElementById("HeatTime_value")?.addEventListener("input", slider);
    document.getElementById("stirTime_value")?.addEventListener("input", slider);
    let total = 0;
    function handleChange(_event) {
        let formData = new FormData(document.forms[0]);
        let basic = document.querySelector("div#basic");
        basic.innerHTML = "<h2>Allgemein</h2>";
        let select = document.querySelector("select");
        let textarea = document.querySelector("textarea");
        for (let entry of formData) {
            console.log(entry);
            let attribute = document.querySelector("[name='" + entry[0] + "']");
            if (entry[0] != "Trankname" && entry[0] != "Wirkungsdauer")
                continue;
            else if (attribute.value != "" && attribute.value != null)
                basic.innerHTML += attribute.name + ": " + attribute.value + "<br>";
        }
        if (select)
            basic.innerHTML += "Effect: " + select.value + "<br>";
        if (textarea.value != "")
            basic.innerHTML += "Description of risks and side effects: <br>" + textarea.value + "<br>";
    }
    function handleButton(_event) {
        let clickedButton = _event.target;
        let formData = new FormData(document.forms[1]);
        let action = document.querySelector("div#action");
        let p = document.createElement("p");
        let div = document.createElement("div");
        div.setAttribute("class", "invisible");
        if (clickedButton.id == "ingredients") {
            let select = document.querySelector("select#Zutaten");
            let value = document.getElementById("Zutaten_value").value;
            let price = parseInt(value) * parseInt(select.selectedOptions[0].getAttribute("price"));
            let priceInString = priceInCurrency(price, false);
            p.innerHTML = "Add " + value + " Amount/ml " + select.value + " (" + priceInString + ") <br>";
            document.getElementById("total").innerHTML = "<b>Total price: " + priceInCurrency(total, true) + "</b>";
            p.setAttribute("preis", price.toFixed(0));
            action.appendChild(p);
            div.appendChild(input("Menge", value, "small"));
            div.appendChild(input("Ingredient", select.value, "mid"));
            div.appendChild(input("Price", priceInString, "mid"));
        }
        for (let entry of formData) {
            if (clickedButton.id == "heat") {
                switch (entry[0]) {
                    case "heat":
                        p.innerHTML = "Bring the potion to " + entry[1] + " °C <br>";
                        div.appendChild(input("heat", "Erhitzen", "mid"));
                        div.appendChild(input("temperature", entry[1].toString(), "small"));
                        break;
                    case "heating":
                        switch (entry[1]) {
                            case "Konsistenz":
                                p.innerHTML += "Until it is " + document.querySelector("select#Konsistenz_value").value;
                                div.appendChild(input("Konsistenz", document.querySelector("select#Konsistenz_value").value, "mid"));
                                break;
                            case "HeatTime":
                                p.innerHTML += "For " + document.getElementById(entry[1] + "_value").value + " min. ";
                                div.appendChild(input("HeatTime", document.getElementById(entry[1] + "_value").value, "mid"));
                                break;
                            case "Color":
                                let colordiv = document.createElement("div");
                                colordiv.setAttribute("style", "background-color:" + document.getElementById("Color").value + "; width: 60px; height: 30px");
                                p.innerHTML += "Until it has this colour:";
                                p.appendChild(colordiv);
                                div.appendChild(input("Color", document.getElementById("Color").value, "mid"));
                                break;
                        }
                        break;
                }
            }
            else if (clickedButton.id == "stir") {
                switch (entry[0]) {
                    case "stir":
                        p.innerHTML = "Jetzt " + entry[1] + "<br>";
                        div.appendChild(input("stir", entry[1].toString(), "mid"));
                    case "stiring":
                        switch (entry[1]) {
                            case "Konsistenz":
                                p.innerHTML += "Until it is " + document.querySelector("select#Konsistenz_stir").value;
                                div.appendChild(input("stirKonsistenz", document.querySelector("select#Konsistenz_stir").value, "mid"));
                                break;
                            case "stirTime":
                                p.innerHTML += "For " + document.getElementById(entry[1] + "_value").value + " min. ";
                                div.appendChild(input("stirTime", document.getElementById(entry[1] + "_value").value, "mid"));
                                break;
                            case "stirColor":
                                let stirColorDiv = document.createElement("div");
                                stirColorDiv.setAttribute("style", "background-color:" + document.getElementById("ColorStiring").value + "; width: 60px; height: 30px");
                                p.innerHTML += "Until it has this colour:";
                                p.appendChild(stirColorDiv);
                                div.appendChild(input("stirColor", document.getElementById("ColorStiring").value, "mid"));
                        }
                }
            }
            action.appendChild(p);
        }
        document.getElementById("act")?.appendChild(div);
    }
    function deleteAll() {
        let action = document.querySelector("div#action");
        let act = document.getElementById("act");
        total = 0;
        document.getElementById("total").innerHTML = "<b>Gesamtpreis: " + priceInCurrency(total, true) + "</b>";
        while (action.firstChild)
            action.removeChild(action.firstChild);
        while (act.firstChild)
            act.removeChild(act.firstChild);
    }
    function deleteOne() {
        let action = document.querySelector("div#action");
        let act = document.getElementById("act");
        let p = action.lastChild;
        if (p.hasAttribute("preis")) {
            total -= parseInt(p.getAttribute("preis"));
            document.getElementById("total").innerHTML = "<b>Gesamtpreis: " + priceInCurrency(total, true) + "</b>";
        }
        action.removeChild(action.lastChild);
        act.removeChild(act.lastChild);
    }
    function slider(_event) {
        let x = _event.target.value;
        let y = _event.target.id;
        document.getElementById("bubble" + y).value = x;
    }
    L06_Hexenkessel.slider = slider;
    function priceInCurrency(_price, _total) {
        if (_total == false)
            total += _price;
        let knut;
        let sickel;
        let gallonen;
        if (_price < 29) {
            return _price.toString() + " Knut";
        }
        else if (_price < 493) {
            sickel = Math.floor(_price / 29) + " Sickel";
            knut = Math.floor(_price % 29) + " Knut";
            if (knut == "0 Knut")
                return sickel;
            else
                return sickel + " " + knut;
        }
        else {
            gallonen = Math.floor(_price / 493) + " Gallonen";
            _price %= 493;
            sickel = Math.floor(_price / 29) + " Sickel";
            knut = Math.floor(_price % 29) + " Knut";
            if (sickel == "0 Sickel" && knut == "0 Knut")
                return gallonen;
            else if (sickel == "0 Sickel")
                return gallonen + knut;
            else if (knut == "0 Knut")
                return gallonen + " " + sickel;
            else
                return gallonen + " " + sickel + " " + knut;
        }
    }
    function input(_name, _value, _size) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = _name;
        input.value = _value;
        input.setAttribute("readonly", "readonly");
        input.setAttribute("class", _size);
        return input;
    }
})(L06_Hexenkessel || (L06_Hexenkessel = {}));
//# sourceMappingURL=script.js.map