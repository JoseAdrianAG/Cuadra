import z from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    MONGO_URI: z.string({ error: "es obligatoria"})
    .min(1, "no puede estar vacia").refine((v) => v.startsWith("mongodb://") || v.startsWith("mongodb+srv://"), 
    {message: "debe empezar por mongodb:// o mongodb+srv://"}),
})

export type Env=z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const problemas = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(raíz)"}: ${i.message}`)
      .join("\n");
    console.error(`Configuración de entorno inválida:\n${problemas}`);
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnv();