namespace L05_Hexenkessel {
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
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let url: string = "potion.html?" + query.toString();
        console.log(url);
        let response: Response = await fetch(url);
        console.log(response);
        alert("Potion sent!");
    }
}