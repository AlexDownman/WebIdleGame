class Multiplier {
    constructor(string, multiplier){
        this.string = string;
        this.Multiplier = multiplier;
        let cost = multiplier + 0;
    }

    buy(currMoney, MPS){
        if (currMoney >= this.cost){
            MPS += this.multiplier;
        } else {
            return null;
        }
    }
};