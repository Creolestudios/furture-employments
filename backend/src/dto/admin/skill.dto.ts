import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SkillsEntity } from '../../entity/admin/skills.entity';

@InputType()
export class SkillDTO {
  @Field(() => [String])
  skills: string[];
}

@ObjectType()
export class SkillResponse {
  @Field(() => [SkillsEntity])
  data: SkillsEntity[];
}
