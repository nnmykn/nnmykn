import { z } from 'zod';

// 環境変数のスキーマ定義
const serverEnvSchema = z.object({
  // HackMD API
  HACKMD_API_TOKEN: z.string().min(1, {
    message: "HackMD API Token is required"
  }),
  HACKMD_API_BASE_URL: z.string().url({
    message: "Valid API base URL is required"
  }).default('https://api.hackmd.io/v1'),
});

// 本番環境かどうかをチェック
const isProduction = process.env.NODE_ENV === 'production';

// サーバーサイドの環境変数
export const serverEnv = serverEnvSchema.parse({
  HACKMD_API_TOKEN: process.env.HACKMD_API_TOKEN,
  HACKMD_API_BASE_URL: process.env.HACKMD_API_BASE_URL,
});

// 本番環境で有効なAPIトークンがない場合に警告を表示
if (isProduction && (!serverEnv.HACKMD_API_TOKEN || serverEnv.HACKMD_API_TOKEN === 'test-token')) {
  console.warn('警告: 本番環境で有効なHACKMD_API_TOKENが設定されていません');
}

// 型をエクスポート
export type ServerEnv = z.infer<typeof serverEnvSchema>; 