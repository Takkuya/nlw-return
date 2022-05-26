//acessando banco de dados

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  //qualquer query que ele faça apareça no log
  log: ["query"],
});
