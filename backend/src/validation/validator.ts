import { Schema } from "joi";

/**
 * check if the incoming object is matching the current schema validation or not
 *
 * @returns `{statusCode, message, isValid: false}` if data is invalid or
 * `{isValid:true}` if data if valid
 *
 * @beta
 */
export const validator = (data: object, schema: Schema): { message?: string; isValid: boolean } => {
  if (!data || Object.keys(data).length <= 0) {
    return { message: "Invalid request data", isValid: false };
  }
  let { error } = schema.validate(data);
  if (error) {
    return { message: error?.message, isValid: false };
  }
  return { isValid: true };
};
