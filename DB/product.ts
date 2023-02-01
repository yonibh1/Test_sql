import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Product } from "../model/product"

type ProductSchemaModel = Model<Product>

export interface ProductInterface {
    Schema: ModelStatic<ProductSchemaModel>
    insert: (product: Omit<Product, "id" | "completeRegistration">) => Promise<Product>
}


export async function createTable(sequelize: Sequelize): Promise<ProductInterface> {
    const ProductSchema = sequelize.define<ProductSchemaModel>("Product", {
        barcode: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        priceToClient: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        priceFromDoubt: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        UnitsInStock: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        
    },
     {
        // indexes: [{
        //     name: "city_index",
        //     fields: [{
        //         name: "city",
        //         order: "ASC"
        //     }]
        // }],
        schema: "store_managment",
        createdAt: false,
    })
    
    await ProductSchema.sync({force: true})
    return {
        Schema: ProductSchema,
        async insert(product) {
            const result = await ProductSchema.create(product as Product)
            return result.toJSON();
        },
    };
}
