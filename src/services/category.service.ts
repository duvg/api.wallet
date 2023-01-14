import { ApplicationException } from '../common/exceptions/application.exceptions';
import { CategoryRespository } from './repositories/category.repository';
import { Category } from './repositories/domain/category';
import { CategoryDto } from '../dtos/category.dto';
import slug from 'slug';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRespository) {}

  public async all(): Promise<Category[]> {
    return await this.categoryRepository.all();
  }

  public async find(id: number): Promise<Category | null> {
    return await this.categoryRepository.find(id);
  }

  public async findByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findByName(name);
  }

  public async store(params: CategoryDto): Promise<void> {
    console.log(params.name);
    const category = await this.categoryRepository.findByName(params.name);

    console.log(category);
    if (!category) {
      await this.categoryRepository.store(params as Category);
    } else {
      throw new ApplicationException(
        `Category with name: ${params.name} already exists`
      );
    }
  }

  public async update(id: number, params: CategoryDto): Promise<void> {
    const category = await this.categoryRepository.find(id);

    if (category) {
      category.name = params.name;
      category.slug = slug(params.name);

      await this.categoryRepository.update(category);
    } else {
      throw new ApplicationException(`Category with id: ${id} not exists.`);
    }
  }

  public async remove(id: number): Promise<void> {
    await this.categoryRepository.remove(id);
  }
}
