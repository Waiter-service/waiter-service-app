import { z } from "zod";

export const parseJwt = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());

  return jwtPayloadSchema.parse(payload);
};

const jwtPayloadSchema = z.object({
  sub: z.number(),
  exp: z.number(),
});
