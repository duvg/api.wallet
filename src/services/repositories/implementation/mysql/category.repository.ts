import { MySqlPool } from '../../../../common/persistence/mysql.persistence';
import { Category } from '../../../../services/repositories/domain/category';

export default class CategoryMySqlRespository {
  constructor(private readonly mySqlPool: MySqlPool) {}

  public async all(): Promise<Category[]> {
    const [rows] = await this.mySqlPool
      .createMySqlPool()
      .execute('SELECT * FROM wallet_categories ORDER BY id DESC');

    return rows as Category[];
  }

  public async find(id: number): Promise<Category | null> {
    const [rows]: any[] = await this.mySqlPool
      .createMySqlPool()
      .execute('SELECT * FROM wallet_categories WHERE id = ?', [id]);

    if (rows.length) {
      return rows[0] as Category;
    }

    return null;
  }

  public async findByName(name: string): Promise<Category | null> {
    const [rows]: any[] = await this.mySqlPool
      .createMySqlPool()
      .execute('SELECT * FROM wallet_categories WHERE name = ?', [name]);

    if (rows.length) {
      return rows[0] as Category;
    }

    return null;
  }

  public async store(entry: Category): Promise<void> {
    const createdAt = new Date();

    await this.mySqlPool
      .createMySqlPool()
      .execute(
        'INSERT INTO wallet_categories(name, slug, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [entry.name, entry.slug, createdAt, createdAt]
      );
  }

  public async update(entry: Category): Promise<void> {
    const updatedAt = new Date();

    await this.mySqlPool
      .createMySqlPool()
      .execute(
        'UPDATE wallet_categories SET name = ?, slug = ?, updated_at = ? WHERE id = ?',
        [entry.name, entry.slug, updatedAt, entry.id]
      );
  }

  public async remove(id: Number): Promise<void> {
    await this.mySqlPool
      .createMySqlPool()
      .execute('DELETE FROM wallet_categories WHERE id = ?', [id]);
  }
}
