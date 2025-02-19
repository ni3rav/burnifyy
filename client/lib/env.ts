import zod from "zod";

const envSchema = zod.object({
  NEXT_PUBLIC_BACKEND_URL: zod.string().nonempty(),
  NEXT_PUBLIC_LOGIN_URL: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
