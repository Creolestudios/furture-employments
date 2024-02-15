import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CandidateNoteEntity } from '../../entity/admin/candidateNote.entity';
import { EmployerNotesEntity } from '../../entity/admin/employerNote.entity';

@InputType()
export class AddNotesDTO {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;
}

@InputType()
export class UpdateNotesDTO {
  @Field(() => Int)
  notesId: number;

  @Field()
  description: string;
}
@ObjectType()
export class NoteResponse {
  @Field(() => CandidateNoteEntity)
  data: CandidateNoteEntity;
}
@ObjectType()
export class NotesResponse {
  @Field(() => [CandidateNoteEntity])
  data: [CandidateNoteEntity];
}
@ObjectType()
export class EmployerNoteResponse {
  @Field(() => EmployerNotesEntity)
  data: EmployerNotesEntity;
}
@ObjectType()
export class EmployerNotesResponse {
  @Field(() => [EmployerNotesEntity])
  data: [EmployerNotesEntity];
}
