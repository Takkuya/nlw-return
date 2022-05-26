import express from "express";
import nodemailer from "nodemailer";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

//req => tudo que vem de informação quando o usuário chama a rota, exemplo: endereço de criação de um novo usuário, retorna as informações do usuário
// res => qual resposta eu vou devolver de volta para o usuário
routes.post("/feedbacks", async (req, res) => {
  //desestruturando
  const { type, comment, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    const feedback = await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });

    //201 => status de criação, algo foi criado
    //retorno o feedback na requisição
    return res.status(201).json({ data: feedback });
  } catch (err) {
    console.error(err);

    return res.status(500).send();
  }
});
