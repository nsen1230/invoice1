import { z } from 'zod';

export const erpSystemSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  clientSecret1: z.string().min(1, 'Client Secret 1 is required'),
  clientSecret2: z.string().min(1, 'Client Secret 2 is required'),
});

export type ERPSystem = z.infer<typeof erpSystemSchema>;