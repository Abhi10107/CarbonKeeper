import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/services/api';

export const useInsightsQuery = () =>
  useQuery({
    queryKey: ['insights'],
    queryFn: api.insights
  });
