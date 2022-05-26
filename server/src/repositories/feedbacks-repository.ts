//esse arquivo vai dizer para nossas rotas e casos de uso quais são as operações que podemos realizar no banco de dados. Ele não vai implementar as operações

//dados que preciso para criar um feedback
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  //só estou criando feedbacks
  //Promise => retorno de uma função assíncrona
  create: (data: FeedbackCreateData) => Promise<void>;
}
