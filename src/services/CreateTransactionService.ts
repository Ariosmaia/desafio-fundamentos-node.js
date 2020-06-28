import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total)
      throw Error('Insulfficient balance');

    const appointment = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return appointment;
  }
}

export default CreateTransactionService;
