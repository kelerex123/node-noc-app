
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server";


(async() => {

    main();

})();


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         message: 'Test message',
    //         level: 'HIGH',
    //         origin: "App.ts",
    //     }
    // });

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM',
    //     }
    // });

    ServerApp.start();
    
}