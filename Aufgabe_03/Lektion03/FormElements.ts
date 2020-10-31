namespace L03_FormElements {
    window.addEventListener("load", init); //Event Listener für Funktion Init

    function init(_event: Event): void {
        console.log("Init"); //Konsolenausgabe
        let fieldsets: NodeListOf<HTMLFieldSetElement> = document.querySelectorAll("fieldset"); //fieldset wird selektiert, "The querySelectorAll definition is similar to getElementsByTagName, except it returns a new type: NodeListOf. This return type is essentially a custom implementation of the standard JavaScript list element. Arguably, replacing NodeListOf<E> with E[] would result in a very similar user experience. NodeListOf only implements the following properties and methods: length , item(index), forEach((value, key, parent) => void) , and numeric indexing. Additionally, this method returns a list of elements, not nodes, which is what NodeList was returning from the .childNodes method. While this may appear as a discrepancy, take note that interface Element extends from Node."

        // Install listeners on fieldsets
        for (let i: number = 0; i < fieldsets.length; i++) { //Wenn i kleiner als die länge der fieldsets/anzahl der fieldsets ist, dann wird die schleife ausgeführt solange bis dies nichtmehr der fall ist
            let fieldset: HTMLFieldSetElement = fieldsets[i]; //Die variable fieldset bekommt den jeweiligen index des fieldsets 
            fieldset.addEventListener("change", handleChange); //an diesem Fieldset werden nun jeweils zwei listener installiert.
            fieldset.addEventListener("input", handleChange); //alle fieldsets bekommen so zwei listener
        }
    }

    function handleChange(_event: Event): void { 
        let target: HTMLInputElement = <HTMLInputElement>_event.target; //target des events wird deklariert
        console.log();
        if (_event.type == "change") //wenn das event vom type change ist, dann
            console.warn("Change: " + target.name + " = " + target.value, _event); // wird in der Konsole eine warnung angezeigt mit "Change": Name des targets und dem wert,der eingegeben wurde
        else
            console.log("Input: " + target.name + " = " + target.value, _event); //ansonsten wird nur eine normale Konsolenausgabe mit Input, Name und Wert gemacht

        //Handling checkbox
        if (target.type == "checkbox")
            console.log("Checked: " + target.name + " = " + target.checked);

        //Slider response
        if (target.name == "Slider") { //wenn der name des targets Slider ist, dann
            let progress: HTMLProgressElement = <HTMLProgressElement>document.getElementsByTagName("progress")[0]; //output element wird selektiert
            progress.value = parseFloat(target.value); //der wert des progress ist der wert des targets(slider) //Die parseFloat()-Funktion parst ein Zeichenketten-Argument und gibt eine Fließkommazahl zurück.
         }

         //Meter response
        if (target.name == "Stepper") {
             let meter: HTMLMeterElement = <HTMLMeterElement>document.querySelector("meter");
             meter.value = parseFloat(target.value);
         }

        // Color response
        if (target.name == "Color") {
             let ouput: HTMLOutputElement = <HTMLOutputElement>document.querySelector("output");
             ouput.value = target.value;
         }
    }
}