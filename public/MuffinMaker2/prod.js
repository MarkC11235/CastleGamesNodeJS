//The setup with classes is good and I like the way the last couplke of lines of prod items are made 
//but the classes might need some tweaking because the page is not working properly.

class prod{
    constructor(items){
        this.items = [];
        for(let i = 0; i < items.length; i++){
            items.push(new prodItem(items[i].name, items[i].initPrice, items[i].priceScale, items[i].prodPerSec));
        }
    }

    get totalProdPerSec(){
        let total = 0;
        for(let item of this.items){
            total += item.totalProdPerSec;
        }
        return total;
    }   
}

class prodItem{
    constructor(name, initPrice, priceScale, prodPerSec){
        this.name = name;
        this.initPrice = initPrice;
        this.priceScale = priceScale;
        this.prodPerSec = prodPerSec;
        this.amount = 0;
    }

    get price(){
        return this.initPrice * Math.pow(this.priceScale, this.amount);
    }

    get totalProdPerSec(){
        return this.prodPerSec * this.amount;
    }

    buy(){
        if(muffins >= this.price){
            muffins -= this.price;
            this.amount++;
        }
    }
}

const prodItems = [
    {name : "Baker", initPrice : 10, priceScale : 1.15, prodPerSec : 0.1},
    {name : "Kitchen", initPrice : 100, priceScale : 1.15, prodPerSec : 1},
];

const production = new prod(prodItems);