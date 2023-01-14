import { MySqlPool } from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../../../services/repositories/domain/subscription';
import { SubscriptionRepository } from '../../../../services/repositories/subscription.repository';

export default class SubscriptionMySQLRespository implements SubscriptionRepository {
  constructor(private readonly mySqlPool: MySqlPool) {}
  public async all(): Promise<Subscription[]> {
    const [rows] = await this.mySqlPool
      .createMySqlPool()
      .execute('SELECT * FROM wallet_subscription ORDER BY id DESC');

    return rows as Subscription[];
  }

  public async find(id: number): Promise<Subscription | null> {
    const [rows]: any[] = await this.mySqlPool
      .createMySqlPool()
      .execute('SELECT * FROM wallet_subscription WHERE id = ?', [id]);

    if (rows.length) {
      return rows[0] as Subscription;
    }

    return null;
  }

  public async findByUserAndCode(
    userId: number,
    code: string
  ): Promise<Subscription | null> {
    const [rows]: any[] = await this.mySqlPool
      .createMySqlPool()
      .execute('SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?', [
        userId,
        code,
      ]);

    if (rows.length) {
      return rows[0] as Subscription;
    }

    return null;
  }

  public async store(entry: Subscription): Promise<void> {
    const createdAt = new Date();

    await this.mySqlPool
      .createMySqlPool()
      .execute(
        'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)',
        [entry.user_id, entry.code, entry.amount, entry.cron, createdAt]
      );
  }

  public async update(entry: Subscription): Promise<void> {
    const updatedAt = new Date();

    await this.mySqlPool
      .createMySqlPool()
      .execute(
        'UPDATE wallet_subscription SET code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
        [entry.code, entry.amount, entry.cron, updatedAt, entry.id]
      );
  }

  public async remove(id: number): Promise<void> {
    await this.mySqlPool
      .createMySqlPool()
      .execute('DELETE FROM wallet_subscription WHERE id = ?', [id]);
  }
}
