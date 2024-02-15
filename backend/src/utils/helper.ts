import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { GqlBadRequestErrorException } from './errors/errors';
import { TIMELINE_KEYS } from './constants';

export function IsMatchingProperty(
  propertyToMatch: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isMatchingProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyToMatch],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (value !== relatedValue) {
            throw GqlBadRequestErrorException(
              `${propertyName} must match ${relatedPropertyName}`,
            );
          }
          return true;
        },
      },
    });
  };
}

export function tokenGenerator() {
  const token = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 20).toString(20))
    .join('');
  return token;
}

export const startDateLesserThanEndDate = ({ startDate, endDate }) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  return startDate < endDate ? true : false;
};

export const filterString = (inputString: string) => {
  return inputString.replace(/[^\w\s]+/g, ' ').replace(/\s+/g, ' ');
};

export function mapCamelKeysToPascalValues(camelKeys: string[]): string[] {
  return camelKeys.map((key) => TIMELINE_KEYS[key]);
}