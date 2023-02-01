import { createTables, getConnection } from "./createDatabase";


async function main() {
    const connection = getConnection();
    const DB = await createTables(false, connection);
    const product = await DB.Product.insert({
        barcode: "7654321uu987",
        productName: "Air-Conditioner",
        description: "Tornado air conditioner is suitable for a 10 meter room",
        priceToClient: 2000,
        priceFromDoubt: 1500,
        UnitsInStock: 7,
    });
    console.log(product);

    const client = await DB.Client.insert({
        id: "123456789",
        fullName: " yoni ben hur",
        adress: "jeruslem",
        phoneNumber: "0504119866"
    })
    console.log(client);

    // const clientPurchase = await DB.clientPurchase.insert({
    //     PurchaseNumber: 2,
    //     barcode: product.barcode,
    //     clientId:client.id,
    //     purchasePrice:2000,
    //     discountPercentage:0,
    //     dateAndTime:new Date()
    // })
    // console.log(clientPurchase);
}

main().catch(err=>{
    "erooorr"
}).then(() => {
    console.log("Exiting")
})

