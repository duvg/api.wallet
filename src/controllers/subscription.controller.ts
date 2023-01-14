import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from '../dtos/subscription.dto';
import { BaseController } from '../common/controllers/base.controller';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async allSubscriptions(req: Request, res: Response): Promise<any> {
    try {
      res.send(await this.subscriptionService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.subscriptionService.find(id);

      if (result) {
        return res.send(result);
      }

      res.status(404).send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<any> {
    const data = {
      user_id: req.body.user_id,
      code: req.body.code,
      amount: req.body.amount,
      cron: req.body.cron,
    };

    try {
      await this.subscriptionService.store(data as SubscriptionCreateDto);

      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const data = {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      };

      await this.subscriptionService.update(id, data as SubscriptionUpdateDto);

      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      await this.subscriptionService.remove(id);

      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
