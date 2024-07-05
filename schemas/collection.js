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
  destinataries: z.string(z.enum(['women', 'men'], {
    required_error: "Los destinatarios son obligatorios",
    invalid_type_error: "Los destinatarios deben ser de tipo string",
  })).min(1),
  products: z.array(z.object({
    id: z.number({
      required_error: "El id es obligatorio",
      invalid_type_error: "El id debe ser de tipo number",
    }).min(1),
    img_url1: z.string({
      required_error: "La primer url de la imagen es obligatoria",
      invalid_type_error: "La url de la imagen debe ser de tipo string",
    }),
    img_url2: z.string({
      required_error: "La segunda url de la imagen es obligatoria",
      invalid_type_error: "La url de la imagen debe ser de tipo string",
    }),
    name: z.string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser de tipo string",
    }).min(1)
  })),
})

export function validateCollection(data) {
  return collectionSchema.safeParse(data);
}

export function validatePartialCollection(data) {
  return collectionSchema.partial().safeParse(data);
}