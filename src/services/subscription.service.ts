import { SubscriptionRepository } from '../services/repositories/subscription.repository';
import { Subscription } from '../services/repositories/domain/subscription';
import { ApplicationException } from '../common/exceptions/application.exceptions';
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from '../dtos/subscription.dto';

export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  public async find(id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id);
  }

  public async all(): Promise<Subscription[]> {
    return await this.subscriptionRepository.all();
  }

  public async store(params: SubscriptionCreateDto): Promise<void> {
    const subscription = await this.subscriptionRepository.findByUserAndCode(
      params.user_id,
      params.code
    );

    if (!subscription) {
      await this.subscriptionRepository.store(params as Subscription);
    } else {
      throw new ApplicationException('User subscription laready exists!');
    }
  }

  public async update(id: number, params: SubscriptionUpdateDto): Promise<void> {
    const subscription = await this.subscriptionRepository.find(id);

    if (subscription) {
      subscription.code = params.code;
      subscription.amount = params.amount;
      subscription.cron = params.cron;

      await this.subscriptionRepository.update(subscription);
    } else {
      throw new ApplicationException('Subscription not found');
    }
  }

  public async remove(id: number): Promise<void> {
    await this.subscriptionRepository.remove(id);
  }
}
