namespace L06_Hexenkessel{
    export async function sendData(): Promise<void>{
        let form = new FormData(document.forms[0]); //Daten aus dem richtigen Form holen
        let url: string = "http://localhost:5001"; //url über die die Daten verschickt werden //später HerukoAppLink
        let query: URLSearchParams = new URLSearchParams( <any>form);
        url = url + "?" + query.toString();

        let select: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select"); //für select elemente, die evt. nicht mit aufgenommen werden
        url += "&Wirkung" + select.value;

        //evt. if abfrage um zu prüfen ob etwas existiert z.B
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector("textarea");
        if (textarea.value != ""){
            url += "&Nebenwirkungen=" + textarea.value;
        }

        let response: Response = await fetch(url); //schicken an den server
        console.log(response);
        let reply: string = await response.text(); //hier kann man auch json schreiben aber auch text und dann auf dem server in json umwandeln
        console.log(reply);
        alert("Potion sent!");

        // die Funktion muss dann im Hexenkessel auch aufgerufen werden
    }
}