namespace L04_Hexenkessel {
   
    export interface Item {
        name: string;
        price?: number;
        stepper?: boolean;
    }
    
    export interface Data {
        [category: string]: Item[];
    }
    export let data: Data = {
        Effect: [
          {name: "Lovepotion"}, 
          {name: "Healpotion"}, 
          {name: "Luckpotion"},
          {name: "Strengthpotion"}, 
          {name: "Ageingpotion"}, 
          {name: "Anti-Paralysispotion"}  
        ],
        Ingredients: [
            {name: "Spiderlegs", price: 10, stepper: true},
            {name: "Toadeyes", price: 15, stepper: true}, 
            {name: "Dragonliver", price: 25, stepper: true }, 
            {name: "Unicorntears", price: 20, stepper: true },
            {name: "Blood", price: 5, stepper: false }, 
            {name: "Poison of Rattlesnake", price: 60, stepper: false }
        ]
    };
}