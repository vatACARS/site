const Agenda = require("agenda");
import { PrismaClient } from "@prisma/client";

const agenda = new Agenda({db: {address: process.env.database_url, collection: "tasks" }});
const prisma = new PrismaClient();

agenda.define("invalidate auth token", async job => {
    const { token } = job.attrs.data;

    const dbToken = await prisma.authToken.findUnique({
        where: { token }
    });

    if(dbToken) await prisma.authToken.delete({
        where: { token }
    });

    await job.remove();
});

agenda.start();

export default agenda;