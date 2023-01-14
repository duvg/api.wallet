import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { Request, Response } from 'express';
import slug from 'slug';
import { BaseController } from '../common/controllers/base.controller';
import { CategoryDto } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';

@route('/categories')
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @GET()
  public async getAll(req: Request, res: Response): Promise<any> {
    try {
      return res.send(await this.categoryService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      return res.send(await this.categoryService.find(id));
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<any> {
    const category = {
      name: req.body.name,
      slug: slug(req.body.name),
    };
    try {
      await this.categoryService.store(category as CategoryDto);
      return res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      return res.send(
        await this.categoryService.update(id, {
          name: req.body.name,
          slug: req.body.slug,
        })
      );
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const category = await this.categoryService.find(id);

      if (!category) {
        return res.send({ data: `Category with id: ${id} not found!` });
      }

      await this.categoryService.remove(id);
      res.send({ data: 'Category removed succesfully' });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
