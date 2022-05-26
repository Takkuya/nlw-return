import { MailAdapter } from "../adapters/email-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

//esse caso de uso vai ter um ÚNICO MÉTODO (princípios SOLID, quinto item D)
export class SubmitFeedbackUseCase {
  //constructor sendo utilizado por causa da arquitetura sólid
  //perceba que esse caso de uso não depende do prisma, o prisma é inversamente injetado dentro da classe
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    //salvar feedback no banco de dados
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    //verificando a screenshot, primeira regra de negócio
    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    //enviando email
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Tipo do feedback: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : null,
        `</div>`,
      ].join("\n"),
    });
  }
}
