import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//usando os spies do Jest
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

//cria uma switch de testes
describe("Submit feedback", () => {
  test("Should be able to submit a feedback", async () => {
    //teste unitário tem que testar o caso de uso desconectado das dependências, ele tem a responsabilidade de testar o conteúdo de uma determinada função

    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    //testando somente o caso de uso
    //espero que quando eu executar isso, ele resolva (dê certo, execute com sucesso) e não dispare nenhum erro
    //resumindo, quero que quando eu chame essa função ele chegue até o final e não dê nenhum erro
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();

    //espero que as funções "spies" tenham sido chamadas
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  test("Should not be able to submit a feedback without type", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    //espero que essa função rejeite e me retorne um erro
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });

  test("Should not be able to submit a feedback without comment", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    //espero que essa função rejeite e me retorne um erro
    await expect(
      submitFeedback.execute({
        type: "test",
        comment: "",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });

  test("Should not be able to submit a feedback with an invalid screenshot", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    //espero que essa função rejeite e me retorne um erro
    await expect(
      submitFeedback.execute({
        type: "test",
        comment: "tá tudo bugado",
        screenshot: "12312",
      })
    ).rejects.toThrow();
  });
});
