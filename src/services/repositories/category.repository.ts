import { Category } from '../../services/repositories/domain/category';

export interface CategoryRespository {
  all: () => Promise<Category[]>;
  find: (id: number) => Promise<Category | null>;
  findByName: (name: string) => Promise<Category | null>;
  store: (entry: Category) => Promise<void>;
  update: (entry: Category) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
