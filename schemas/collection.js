import z from "zod";

const collectionSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser de tipo string",
  }).min(1).max(100),
  category: z.string({
    required_error: "La categoría es obligatoria",
    invalid_type_error: "La categoría debe ser de tipo string",
  }).min(1).max(100),
  products: z.array(z.string().min(1).max(100)),
})

export function validateCollection(data) {
  return collectionSchema.safeParse(data);
}

export function validatePartialCollection(data) {
  return collectionSchema.partial().safeParse(data);
}