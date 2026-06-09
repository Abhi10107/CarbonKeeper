import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/services/api';

export const useDashboardQuery = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: api.dashboard
  });
