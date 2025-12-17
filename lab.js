// -------------Product Class---------------------
class Product{
    constructor(productId, name, price){
        this.productId = productId;
        this.name = name;
        this.price = price;
    }
    // --------product display------------
    displayProduct(){
        console.log(`Product Id: ${this.productId}, Name: ${this.name}, Price: ${this.price}`)
    }

    //---------------- apply discount------------
    applyDiscount(percent){
        let per = ((this.price) * percent)/100;
        return this.price - per;
    }
}

// -----------ElectronicsProduct class extending prduct class-------------

class ElectronicsProduct extends Product{
    constructor(productId, name, price, warrantyPeriod){
        super(productId, name, price)
        this.warrantyPeriod = warrantyPeriod;
    }

    displayProduct(){
        console.log(`Product Id: ${this.productId}, Name: ${this.name}, Price: ${this.price}, Warranty-Period: ${this.warrantyPeriod}`)

    }
}

// -----------ElectronicsProduct class extending prduct class-------------

class ClothingProduct extends Product{
    constructor(productId, name, price, size, material){
        super(productId, name, price)
        this.size = size;
        this.material = material;
    }

    displayProduct(){
        console.log(`Product Id: ${this.productId}, Name: ${this.name}, Price: ${this.price}, Size: ${this.size}, Material: ${this.material}`)
        
    }
}


// --------------------Customer Class--------------------

class Customer{
    constructor(name, email)
    {
       this.name = name,
       this.email = email 
    }

    displayCustomer(){
        console.log(`Customer Name: ${this.name}, Email ${this.email}`)
    }
}

//-------------------PremiumCustomer class extending Customer class------------

class PremiumCustomer extends Customer{
    constructor(name, email, membershipLevel){
        super(name, email)
        this.membershipLevel = membershipLevel;
    }
    displayCustomer(){
        console.log(`Customer Name: ${this.name}, Email ${this.email}, Membership-level: ${this.membershipLevel}`)
    }
}

// ----------------------------Order Class--------------------
class Order{
    constructor(orderId, productList){
        this.orderId = orderId
        this.productList = productList;
    }

    addProduct(product){ // object
        this.productList.push(product);
    }

    getTotalAmount(){
        return this.productList.reduce((a,s)=> a+s.price, 0);
    }
}

//--------------------Inventory Class---------------------

class Inventory{
    constructor(){
        this.productList = [];
    }
    addToInventory(product){ // object
        this.productList.push(product)
    }

    listInventory(){
       this.productList.forEach((p)=>{
        console.log(`Product: ${p.productId}, Product-Name: ${p.name}, Price: ${p.price} `)
       })
    }
}

//------------------------Cart Class----------------------

class Cart{
    constructor(){
        this.productArray = []
    }

    addItems(product){ // object
        this.productArray.push(product)
    }

    removeProduct(productId){
        this.productArray = this.productArray.filter((p)=> productId !== p.productId)
    }
}

//------------------------Base Payment Class----------------------

class Payment{
    constructor(){
        this.amount;
    }
    processPayment(amount){
        this.amount = amount;
        console.log(`payment is processed, amount: ${this.amount}`)
    }

}

//------------------------CashPayment class extending Payment Class----------------------

class CashPayment extends Payment{
 
    processPayment(amount){
       this.amount = amount;
       console.log(`payment is processed use cash payment, amount: ${this.amount}`)

    }
}

//------------------------CardPayment class extending Payment Class----------------------

class CardPayment extends Payment{
  
    processPayment(amount){
        this.amount = amount;
        console.log(`payment is processed using card, amount: ${this.amount}`)
    }
}

// -------------------------- Retail Class ------------------------

class RetailStore{
    constructor(){
        this.productList = [];
        this.customersList = [];
        this.orderList = [];
    }

    addProducts(product){
        this.productList.push(product)
    }
    addCustomers(customer){
        this.customersList.push(customer)
    }
    addOrders(order){
        this.orderList.push(order)
    }
}








const p1 = new Product(1, "Bucket", 80);
const p2 = new Product(2, "Perfume", 450);
const p3 = new Product(3, "Brush", 10);

const o1 = new Order(101, [])

o1.addProduct(p1);
o1.addProduct(p2);
o1.addProduct(p3);

// console.log(o1.productList);
// console.log(o1.getTotalAmount());

const i1 = new Inventory();
i1.addToInventory(p1)
i1.addToInventory(p2)
i1.addToInventory(p3)

// i1.listInventory();

const c1 = new Cart()

c1.addItems(p1)
c1.addItems(p2)
c1.addItems(p3)

// console.log(c1.productArray);

// c1.removeProduct(1);

// console.log(c1.productArray);

// const cp = new CashPayment();
// cp.processPayment(100);


const r = new RetailStore();
r.addProducts(p1);
r.addProducts(p2);
r.addProducts(p3);

console.log(r.productList)





