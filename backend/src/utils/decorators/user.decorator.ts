import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// REVIEW create only user decorator and access it's property as per your requirement
//NOTE - resolved
export const user = createParamDecorator(
  (properties: string[], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const PROPERTIES: string[] = ['id', 'role'];

    const hasAllProperties = () =>
      properties.every((property: string) => PROPERTIES.includes(property));

    switch (properties?.length) {
      case 1:
        if (properties[0].toLowerCase() === PROPERTIES[0]) {
          return Number(user.id);
        } else if (properties[0].toLowerCase() === PROPERTIES[1]) {
          return user.role;
        }
        return null;
      case 2:
        if (hasAllProperties()) {
          return {
            id: Number(user.id),
            role: user.role,
          };
        }
        return null;
      default:
        return null;
    }
  },
);
