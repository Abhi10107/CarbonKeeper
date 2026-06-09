import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/services/api';

export const useChallengesQuery = () =>
  useQuery({
    queryKey: ['challenges'],
    queryFn: api.challenges
  });
