import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Inject, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import {
  AboutCandidateDTO,
  UpdateAboutCandidateDto,
} from '../../dto/candidate/registration/about.dto';
import {
  CVContentResponse,
  CVDetailsResponse,
  CandidateRegistrationResponse,
} from '../../dto/candidate/registration';
import {
  CandidateProfileDTO,
  UpdateCandidateProfileDto,
} from '../../dto/candidate/registration/profile.dto';
import {
  CandidateJobPreferenceDto,
  UpdateCandidateJobPreferenceDto,
} from '../../dto/candidate/registration/job-preference.dto';
import { CandidateUser } from '../../dto/candidate/registration/user.dto';
import { FileValidationPipe } from '../../utils/pipes/file-validation.pipe';
import { CandidateJobPreferenceEntity } from '../../entity/candidate/registration/jobPreference.entity';
import {
  CandidateRegistration,
  CandidateProfile,
} from '../../entity/candidate/registration';
import { JwtAuthenticationGuard } from '../../utils/guards/jwtAuthenticationGuard';
import { RoleAuthorizationGuard } from '../../utils/guards/roleAuthorizationGuard';
import { Role } from '../../utils/enum';
import { UpdateUserBasicSignupDto } from '../../dto/user/updateUser.dto';
import { getAllAuthorized, getAuthorizedRoles } from '../../utils';
import { user } from '../../utils/decorators/user.decorator';
import { CreateApplicationResponse, MessageResponse } from '../../dto';
import { FileService } from '../file/file.service';
import { NotesResponse } from '../../dto/admin/adminNote.dto';

@Resolver(() => CandidateRegistration)
@UseGuards(JwtAuthenticationGuard)
export class CandidateResolver {
  constructor(
    @Inject(CandidateService) private candidateService: CandidateService,
    @Inject(FileService) private readonly fileService: FileService,
  ) {}

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.CANDIDATE_SIGN_UP))
  @Mutation(() => CandidateRegistrationResponse)
  async candidateRegistration(
    @Args('userArgs') userArgs: CandidateUser,
    @Args('profileArgs') profileArgs: CandidateProfileDTO,
    @Args('aboutArgs') aboutArgs: AboutCandidateDTO,
    @Args('jobPreferenceArgs')
    jobPreferenceArgs: CandidateJobPreferenceDto,
    @Args('userId', { type: () => Int }) userId: number,
    @Args(
      'cv',
      { type: () => GraphQLUpload, nullable: true },
      FileValidationPipe,
    )
    cv: FileUpload,
  ) {
    return await this.candidateService.candidateRegisterService(
      userArgs,
      profileArgs,
      aboutArgs,
      jobPreferenceArgs,
      cv,
      userId,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  @Mutation(() => MessageResponse)
  async updateCandidateProfile(
    @Args('userInfoArgs', { defaultValue: null })
    userInfoArgs: UpdateUserBasicSignupDto,
    @Args('profileArgs', { defaultValue: null })
    profileArgs: UpdateCandidateProfileDto,
    @Args('aboutArgs', { defaultValue: null })
    aboutArgs: UpdateAboutCandidateDto,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.candidateService.updateCandidateProfileService(
      userInfoArgs,
      profileArgs,
      aboutArgs,
      userId,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  @Mutation(() => MessageResponse)
  async updateCV(
    @Args('userId', { type: () => Int }) userId: number,
    @Args(
      'cv',
      { type: () => GraphQLUpload, nullable: true },
      FileValidationPipe,
    )
    cv: FileUpload,
  ) {
    return await this.candidateService.updateCV(userId, cv ?? null);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.CANDIDATE))
  @Mutation(() => MessageResponse)
  async updateJobPreference(
    @Args('jobPreferenceId', { type: () => Int }) jobPreferenceId: number,
    @Args('jobPreferenceArgs')
    jobPreferenceArgs: UpdateCandidateJobPreferenceDto,
  ) {
    return await this.candidateService.updateJobPreferences(
      jobPreferenceId,
      jobPreferenceArgs,
    );
  }

  @Query(() => CandidateProfile)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  getCandidateProfile(@user(['id']) userId: number) {
    return this.candidateService.findCandidateProfile(userId);
  }

  @Query(() => CandidateJobPreferenceEntity)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  getCandidateJobPreference(@user(['id']) userId: number) {
    return this.candidateService.findJobPreference(userId);
  }

  @Query(() => CVDetailsResponse)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  // REVIEW naming convention
  //NOTE - resolved
  async getCVDetails(@user(['id']) userId: number) {
    return this.candidateService.findCVDetails(userId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  @Mutation(() => CreateApplicationResponse)
  async createApplication(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('vacancyId', { type: () => Int }) vacancyId: number,
  ) {
    return this.candidateService.createApplication(userId, vacancyId);
  }

  @Query(() => CVContentResponse)
  @UseGuards(new RoleAuthorizationGuard(getAllAuthorized()))
  getCvContentUrl(@Args('cv') cv: string) {
    return this.fileService.getDownloadFileUrl(cv);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async updateCandidateFutureProspectsCv(
    @Args('aboutId', { type: () => Int }) aboutId: number,
    @Args('futureProspectsCv') futureProspects: string,
  ) {
    return await this.candidateService.updateCandidateFutureProspectsCvService(
      aboutId,
      futureProspects,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(Role.CANDIDATE))
  @Query(() => NotesResponse)
  async candidateNotesList(@user(['id']) candidateId: number) {
    return this.candidateService.candidateNoteService(candidateId);
  }
}
