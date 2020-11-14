var L04_Hexenkessel;
(function (L04_Hexenkessel) {
    function generateContent(_data) {
        let group = null;
        for (let category in _data) {
            let items = _data[category];
            group = createSelect(items, category);
            let div = document.querySelector("div#" + category);
            if (div && group)
                div.appendChild(group);
        }
    }
    L04_Hexenkessel.generateContent = generateContent;
    function createSelect(_items, _category) {
        let group = document.createElement("div");
        let select = document.createElement("select");
        select.id = _category;
        if (_category != "Ingredients") {
            let label = document.createElement("label");
            label.textContent = _category;
            label.htmlFor = _category;
            group.appendChild(label);
            group.innerHTML += "<br>";
        }
        for (let item of _items) {
            let option = document.createElement("option");
            option.value = item.name;
            if (_category == "Ingredients") {
                option.setAttribute("price", (item.price).toString());
                option.setAttribute("stepper", (item.stepper) + "");
            }
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        group.appendChild(select);
        let stepper = document.createElement("input");
        stepper.type = "range";
        stepper.min = "1";
        stepper.step = "1";
        stepper.id = _category + "_value";
        if (_category == "Effect") {
            stepper.name = "effectduration";
            stepper.max = "90";
            let labelForStepper = document.createElement("label");
            labelForStepper.textContent = stepper.name;
            labelForStepper.htmlFor = stepper.name;
            group.innerHTML += "<br>";
            group.appendChild(labelForStepper);
        }
        else {
            stepper.name = "Amount";
            stepper.max = "500";
        }
        stepper.setAttribute("value", "30");
        group.innerHTML += "<br>";
        group.appendChild(stepper);
        let input = document.createElement("input");
        input.type = "text";
        input.id = "bubble" + stepper.id;
        input.setAttribute("value", "30");
        input.setAttribute("disabled", "disabled");
        input.setAttribute("class", "time");
        group.appendChild(input);
        if (_category == "Effect")
            group.innerHTML += " min";
        else
            group.innerHTML += " Amount/ml";
        return group;
    }
})(L04_Hexenkessel || (L04_Hexenkessel = {}));
//# sourceMappingURL=Aufgabe4CreateContent.js.map