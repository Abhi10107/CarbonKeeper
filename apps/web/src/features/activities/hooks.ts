import { startTransition, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ParsedActivity } from '@carbonkeeper/shared';
import { api } from '@/shared/services/api';

export const useActivityLogging = () => {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<ParsedActivity | null>(null);

  const parseMutation = useMutation({
    mutationFn: api.parseActivity,
    onSuccess: (data) => {
      startTransition(() => setDraft(data));
    }
  });

  const logMutation = useMutation({
    mutationFn: api.logActivity,
    onSuccess: async () => {
      startTransition(() => setDraft(null));
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
        queryClient.invalidateQueries({ queryKey: ['insights'] }),
        queryClient.invalidateQueries({ queryKey: ['challenges'] })
      ]);
    }
  });

  return {
    draft,
    setDraft,
    parseMutation,
    logMutation
  };
};
