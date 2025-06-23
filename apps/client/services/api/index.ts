import { authClient } from '@/lib/auth-client';
import { apiClient } from '@/lib/api-client';

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await authClient.$fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      return response;
    },
  },
};
