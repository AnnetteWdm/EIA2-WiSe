namespace L06_Hexenkessel {
    export async function getData(): Promise<void> {
        let response: Response = await fetch("data.json"); 
        let content: string = await response.text();
        let data = JSON.parse(content);  
        console.log("DATA:");
        console.log(data);

        generateContent(data);    
    }
    export async function sendPotion(_event: Event): Promise<void> {
        
        console.log("send Potion");
        let url: string = "https://annettewdm.herokuapp.com/";
        /* let url: string = "http://localhost:5001/"; */
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        console.log(url);

        let select: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select");
        
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector("textarea");
        if (select)
            url += "&Wirkung=" + select.value;
        if (textarea.value != "")
            url += "&Nebenwirkungen=" + textarea.value;
        let response: Response = await fetch(url);
        console.log(response);
        let responseReply: string = await response.text();
        console.log(responseReply);
        alert("Sent Potion to Professor Snape!");
    }
}