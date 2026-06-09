import type { ParsedActivity } from '@carbonkeeper/shared';

export interface ActivityRepository {
  list(): Promise<ParsedActivity[]>;
  save(activity: ParsedActivity): Promise<ParsedActivity>;
}
