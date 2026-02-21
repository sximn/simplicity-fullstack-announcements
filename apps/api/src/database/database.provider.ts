import { Inject } from '@nestjs/common';
import { db } from './index';

export const DATABASE_PROVIDER = 'DatabaseProvider';

export const InjectDatabase = () => Inject(DATABASE_PROVIDER);

export const DatabaseProvider = {
  provide: DATABASE_PROVIDER,
  useValue: db,
};
