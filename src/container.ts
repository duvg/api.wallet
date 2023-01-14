import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { createContainer, asClass } from 'awilix';
import { TestService } from './services/test.service';
import { CategoryService } from './services/category.service';
import { SubscriptionService } from './services/subscription.service';
import { MySqlPool } from './common/persistence/mysql.persistence';
import CategoryMySqlRespository from './services/repositories/implementation/mysql/category.repository';
import SubscriptionMySQLRespository from './services/repositories/implementation/mysql/subscription.repository';

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    subscriptionRepository: asClass(SubscriptionMySQLRespository).scoped(),
    categoryRepository: asClass(CategoryMySqlRespository).scoped(),

    subscriptionService: asClass(SubscriptionService).scoped(),
    categoryService: asClass(CategoryService),
    testService: asClass(TestService).scoped(),

    mySqlPool: asClass(MySqlPool).scoped(),
  });

  app.use(scopePerRequest(container));
};
