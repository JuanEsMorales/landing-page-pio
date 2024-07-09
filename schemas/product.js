import z from "zod";

const productSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser de tipo string",
  }).min(1).max(100),
  description: z.string({
    required_error: "La descripción es obligatoria",
    invalid_type_error: "La descripción debe ser de tipo string",
  }).min(1).max(1000),
  category: z.string({
    required_error: "La categoría es obligatoria",
    invalid_type_error: "La categoría debe ser de tipo string",
  }).min(1).max(100),
  persons_destinataries: z.string(z.enum(['women', 'men'], {
    required_error: "Los destinatarios son obligatorios",
    invalid_type_error: "Los destinatarios deben ser de tipo string",
  })).min(1).max(100),
  previous_price: z.number({
    invalid_type_error: "El precio anterior debe ser de tipo number",
  }).min(1).max(999999).nullable().optional(),
  price: z.number({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser de tipo number",
  }).min(1).max(999999),
  img1_url: z.string({
    required_error: "La URL de la imagen 1 es obligatoria",
    invalid_type_error: "La URL de la imagen 1 debe ser de tipo string",
  }).url(),
  img2_url: z.string({
    required_error: "La URL de la imagen 2 es obligatoria",
    invalid_type_error: "La URL de la imagen 2 debe ser de tipo string",
  }).url(),
  img3_url: z.string({
    invalid_type_error: "La URL de la imagen 3 debe ser de tipo string",
  }).url().optional(),
  available_sizes: z.array(z.string().min(1).max(100)),
  is_in_promotion: z.boolean().optional(),
});

const productInPromotionSchema = z.object({
  newPrice: z.number({
    required_error: "El precio nuevo es obligatorio",
    invalid_type_error: "El precio nuevo debe ser de tipo number",
  }).min(1).max(999999),
  previuosPrice: z.number({
    required_error: "El precio anterior es obligatorio",
    invalid_type_error: "El precio anterior debe ser de tipo number",
  }).min(1).max(999999),
  id: z.number({
    required_error: "El id es obligatorio",
    invalid_type_error: "El id debe ser de tipo number",
  }).min(1),
});

export function validateProduct(data) {
  return productSchema.safeParse(data);
}

export function validatePartialProduct(data) {
  return productSchema.partial().safeParse(data);
}

export function validateProductInPromotion(data) {
  return productInPromotionSchema.safeParse(data);
}

export function validatePartialProductInPromotion(data) {
  return productInPromotionSchema.partial().safeParse(data);
}
