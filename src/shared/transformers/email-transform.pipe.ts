import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class EmailTransformPipe implements PipeTransform {
  transform(value: any, { data }: ArgumentMetadata) {
    if (data === 'email' && typeof value === 'string') {
      // Only apply transformation to the email field
      return value.trim().toLowerCase();
    }

    // For other fields or non-string values, return them as is
    return value;
  }
}
