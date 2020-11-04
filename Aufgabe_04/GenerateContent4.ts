namespace L04_CocktailBar {

    export function generateContent(_data: Data): void { //export, damit die Funktion im anderen Script aufgerufen werden kann. Funktion nimmt data entgegen

        for (let category in _data) {  //Bei for in bekommt man die Schlüssel(Drinkt etc.). Bei for of bekommt man nur den Wert
            // Da wir die Category brauchen, nehmen wir eine for in Schleife
            // console.log(category);
            let items: Item[] = _data[category]; //Mit der Schleife greifen wir auf jede Category in dem data array zu und ziehen die jeweiligen Items raus

            let group: HTMLElement | null = null; // Das von den Funktionen erzeugte soll in dieser Variable gespeichert werden, damit es später zum Fieldset hinzugefügt werden kann
            // muss außerhal der switch cases deklariert werden, da sie nicht innerhalb des switch case mehrfach deklarier werden kann
            // HTMLElement ist vorerst nur allgemein für alle cases, kann aber dann später spezifiziert werden
            //gruppe darf auch null sein, also nicht existieren. Das wäre im default case der Fall
            switch (category) { //wenn die Category..
                case "Drink": //..Drink ist, dann..
                    group = createSelect(items, category); //...ruf die Funktion auf, die die Selectelemente erstellt. Nimmt Items an, da sie für jedes item ein select erstellen soll
                    break;
                case "Container":
                    group = createSingle(items, category);
                    break;
                case "Extras":
                    group = createMultiple(items, category); //zweiter parameter, da in der Funktion zwei parameter angenommen werden
                    break;

                default:
                    break;
            }

            //Group wird an jew fieldset angehängt
            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category); //Fieldset wird selektiert. Da es jeweils ein spezielles fieldset ist, das fieldset mit der jew category als id
            //fieldset könnte evt nicht gefunden werden,wenn es nicht existiert. Deshalb könnte das fieldset auch null sein
            if (fieldset && group) //Wenn das fieldset und group existiert, dann...
                fieldset.appendChild(group); // wird die group and das fieldset als child angehängt
        }
    }

    function createSelect(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLSelectElement = document.createElement("select"); 
        group.name = _category;
        group.multiple = true;

        for (let item of _items) { 
            let option: HTMLOptionElement = document.createElement("option"); 
            option.value = item.name;
            option.setAttribute("price", item.price.toFixed(2)); 
            
            group.appendChild(option);
        }

        return group;
    }
    
    function createSingle(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div"); 
       
        for (let item of _items) { 
            let radio: HTMLInputElement = document.createElement("input"); 
            radio.type = "radio"; 
            radio.setAttribute("price", item.price.toFixed(2)); 
            radio.value = item.name;
            radio.name = _category; 
            radio.id = item.name; 

            let label: HTMLLabelElement = document.createElement("label"); //ein label für die checkbox wird erstellt
            label.textContent = item.name; //der text des labels soll der name des jeweiligen item sein
            label.htmlFor = item.name; // Verknüpfung des labels zur dazugehörigen checkbox

            group.appendChild(radio); //checkbox und label werden an die gruppe rangehängt
            group.appendChild(label);
        }
        return group;
    }

    //Funktion fürs Erstellen der Checkboxen
    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div"); //gruppe wird jetzt als div deklariert und das div wird erstellt
       
        for (let item of _items) { //For of, da wir wieder die Schlüssel brauchen. Wir greifen auf jedes Item des Arrays Items zu
            let checkbox: HTMLInputElement = document.createElement("input"); //Input element wird erstellt
            checkbox.type = "checkbox"; //typ des Inputs ist eine Checkbox
            checkbox.setAttribute("price", item.price.toFixed(2)); //Price gibt es im Input elemnt nicht, deshalb muss es manuell angehängt werden, wert wird auch gleich angehängt und in einen String umgewandelt mit toFixed
            checkbox.value = item.name; //Value ist der jew. name des items
            checkbox.name = _category; //Name der checkbox soll der name der category sein
            checkbox.id = item.name; //Die id soll der name des items sein

            let label: HTMLLabelElement = document.createElement("label"); //ein label für die checkbox wird erstellt
            label.textContent = item.name; //der text des labels soll der name des jeweiligen item sein
            label.htmlFor = item.name; // Verknüpfung des labels zur dazugehörigen checkbox

            group.appendChild(checkbox); //checkbox und label werden an die gruppe rangehängt
            group.appendChild(label);
        }
        return group; //Gruppe wird zurück gegebn und dann oben an das fieldset geheftet
    }
}