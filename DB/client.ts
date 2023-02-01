import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { Client } from "../model/client";

type ClientSchemaModel = Model<Client>

export interface ClientInterface {
    Schema: ModelStatic<ClientSchemaModel>
    insert: (course: Client) => Promise<Client>
}


export async function createTable(sequelize: Sequelize): Promise<ClientInterface> {
    const ClientSchema = sequelize.define<ClientSchemaModel>("Client", {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        adress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
     {
        schema: "store_managment",
        createdAt: false
    });

    await ClientSchema.sync();
    return {
        Schema: ClientSchema,
        async insert(client) {
            const result = await ClientSchema.create(client as Client)
            return result.toJSON();
        },
    };
}



// export type CourseTable = Awaited<ReturnType<typeof createTable>>;
