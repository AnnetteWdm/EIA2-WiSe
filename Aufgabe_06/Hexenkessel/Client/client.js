var L06_Hexenkessel;
(function (L06_Hexenkessel) {
    async function getData() {
        let response = await fetch("data.json");
        let content = await response.text();
        let data = JSON.parse(content);
        console.log("DATA:");
        console.log(data);
        L06_Hexenkessel.generateContent(data);
    }
    L06_Hexenkessel.getData = getData;
    async function sendPotion(_event) {
        console.log("send Potion");
        let url = "https://annettewdm.herokuapp.com/";
        /* let url: string = "http://localhost:5001/"; */
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        console.log(url);
        let select = document.querySelector("select");
        let textarea = document.querySelector("textarea");
        if (select)
            url += "&Wirkung=" + select.value;
        if (textarea.value != "")
            url += "&Nebenwirkungen=" + textarea.value;
        let response = await fetch(url);
        console.log(response);
        let responseReply = await response.text();
        console.log(responseReply);
        alert("Sent Potion to Professor Snape!");
    }
    L06_Hexenkessel.sendPotion = sendPotion;
})(L06_Hexenkessel || (L06_Hexenkessel = {}));
//# sourceMappingURL=client.js.map