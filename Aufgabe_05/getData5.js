var L05_Hexenkessel;
(function (L05_Hexenkessel) {
    async function getData() {
        let response = await fetch("data.json");
        let content = await response.text();
        let data = JSON.parse(content);
        console.log("DATA:");
        console.log(data);
        L05_Hexenkessel.generateContent(data);
    }
    L05_Hexenkessel.getData = getData;
    async function sendPotion(_event) {
        console.log("send Potion");
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        let url = "potion.html?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        console.log(response);
        alert("Potion sent!");
    }
    L05_Hexenkessel.sendPotion = sendPotion;
})(L05_Hexenkessel || (L05_Hexenkessel = {}));
//# sourceMappingURL=getData5.js.map