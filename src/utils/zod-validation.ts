import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.data !== 'body') {
            return value;
        }

        let parsedValue;

        try {
            parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            throw new Error("Validation failed");
        }
    }
}
