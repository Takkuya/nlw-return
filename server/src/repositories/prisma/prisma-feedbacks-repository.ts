import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      //quando a chave for igual ao nome da variável, eu posso omitir a chave
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
