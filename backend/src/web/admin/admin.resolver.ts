import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Inject, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AllAdminListDto,
  DisableAdminDto,
  PdfToMarkdownTextResponse,
  UpdateAdminDto,
} from '../../dto/admin/admin.dto';
import { AdminService } from './admin.service';
import {
  EmployerListResponse,
  SearchClientDto,
} from '../../dto/admin/client.dto';
import { RoleAuthorizationGuard } from '../../utils/guards/roleAuthorizationGuard';
import { Role } from '../../utils/enum';
import {
  CandidateDetailForAdminResponse,
  CandidateFutureProspectCvDetails,
  CandidateListResponse,
  CandidateUpdateSkillsDTO,
  InviteCandidatesDTO,
  SearchCandidateDto,
} from '../../dto/admin/candidate.dto';
import { MessageResponse, UserRegistrationResponse } from '../../dto';
import { getAuthorizedRoles } from '../../utils';
import { UpdateUserBasicSignupDto } from '../../dto/user/updateUser.dto';
import { UpdateCandidateProfileDto } from '../../dto/candidate/registration/profile.dto';
import { UpdateAboutCandidateDto } from '../../dto/candidate/registration/about.dto';
import { FileValidationPipe } from '../../utils/pipes/file-validation.pipe';
import { UpdateCandidateJobPreferenceDto } from '../../dto/candidate/registration/job-preference.dto';
import { user } from '../../utils/decorators/user.decorator';
import {
  AddNotesDTO,
  EmployerNotesResponse,
  NoteResponse,
  NotesResponse,
  UpdateNotesDTO,
} from '../../dto/admin/adminNote.dto';
import { AddAdminDTO } from '../../dto/admin/addAdmin.dto';
import { AddCityDTO } from '../../dto/lists/addList/addCity.dto';
import { AddCountryDTO } from '../../dto/lists/addList/addCountry.dto';
import { AddLanguageDTO } from '../../dto/lists/addList/addLanguage.dto';
import { AddJobTypeDTO } from '../../dto/lists/addList/addJobType.dto';
import { AddJobCatDTO } from '../../dto/lists/addList/addJobCat.dto';
import { SkillDTO, SkillResponse } from '../../dto/admin/skill.dto';
import { UserResponse } from 'src/dto/user/userRegister.dto';
import {
  CloseClientDTO,
  NewProspectDto,
  ProspectAddressDTO,
  ProspectClientDetailsResponse,
  ProspectClientsResponse,
  ProspectPeopleDTO,
  ProspectTimelineResponse,
  SearchProspectsClientsDto,
  UpdateConvertedClientDTO,
  UpdateProspectClientDTO,
} from 'src/dto/admin/prospectClient.dto';
import { EmployerProfileEditDto } from 'src/dto/employerRegistration/employerRegistration.dto';

@Resolver()
export class AdminResolver {
  constructor(@Inject(AdminService) private adminService: AdminService) {}

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addCountryList(@Args('addCountryDto') addCountryDto: AddCountryDTO) {
    return await this.adminService.addCountry(addCountryDto);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addCityList(@Args('addCityDto') addCityDto: AddCityDTO) {
    return await this.adminService.addCity(addCityDto);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addLanguageList(
    @Args('addLanguageDto') addLanguageDto: AddLanguageDTO,
  ) {
    return await this.adminService.addLanguage(addLanguageDto);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addJobTypeList(@Args('addJobTypeDto') addJobTypeDto: AddJobTypeDTO) {
    return await this.adminService.addJobType(addJobTypeDto);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addJobCatList(@Args('addJobCatDto') addJobCatDto: AddJobCatDTO) {
    return await this.adminService.addJobCat(addJobCatDto);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(new RoleAuthorizationGuard(Role.SUPER_ADMIN))
  @Mutation(() => UserRegistrationResponse)
  async addAdmin(@Args('addAdminDto') addAdminDto: AddAdminDTO) {
    return await this.adminService.addAdminService(addAdminDto);
  }

  @Mutation(() => MessageResponse)
  async disableAdmin(
    @Args('disableAdminDto') disableAdminDto: DisableAdminDto,
  ) {
    return this.adminService.disableAdminService(disableAdminDto);
  }

  @Mutation(() => MessageResponse)
  async updateAdmin(@Args('updateAdmin') updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdminService(updateAdminDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => EmployerListResponse)
  async searchClients(@Args('searchParams') searchParams: SearchClientDto) {
    return await this.adminService.searchClientService(searchParams);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => CandidateListResponse)
  async searchCandidate(
    @Args('searchParams') searchParams: SearchCandidateDto,
  ) {
    return this.adminService.searchCandidateService(searchParams);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard([Role.ADMIN, Role.EMPLOYER]))
  @Query(() => CandidateDetailForAdminResponse)
  async candidateDetail(
    @Args({ name: 'candidateId', type: () => Int }) candidateId: number,
    @Args({ name: 'applicationId', type: () => Int, nullable: true })
    applicationId: number,
  ) {
    return this.adminService.candidateDetailForAdmin(
      candidateId,
      applicationId,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard([Role.ADMIN, Role.SUPER_ADMIN]))
  @Query(() => AllAdminListDto)
  async allAdminList() {
    return await this.adminService.allAdminList();
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.SUPER_ADMIN))
  @Query(() => UserResponse)
  async adminDetails(
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return await this.adminService.adminDetails(userId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async candidateRemove(
    @Args({ name: 'candidateId', type: () => Int }) candidateId: number,
  ) {
    return this.adminService.removeCandidateService(candidateId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async clientRemove(
    @Args({ name: 'clientId', type: () => Int }) clientId: number,
  ) {
    return this.adminService.removeClientService(clientId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => CandidateFutureProspectCvDetails)
  async futureProspectCvDetail(
    @Args({ name: 'profileId', type: () => Int }) profileId: number,
  ) {
    return this.adminService.futureProspectsCvService(profileId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async updateCandidateSkills(
    @Args('updateSkillsDto') updateSkillsDto: CandidateUpdateSkillsDTO,
  ) {
    return this.adminService.UpdateSkillsService(updateSkillsDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async editCandidateByAdmin(
    @Args('userArgs', { defaultValue: null })
    userInfoArgs: UpdateUserBasicSignupDto,
    @Args('profileArgs', { defaultValue: null })
    profileArgs: UpdateCandidateProfileDto,
    @Args('aboutArgs', { defaultValue: null })
    aboutArgs: UpdateAboutCandidateDto,
    @Args('jobPreferenceArgs', { defaultValue: null })
    jobPreferenceArgs: UpdateCandidateJobPreferenceDto,
    @Args('userId', { type: () => Int }) userId: number,
    @Args(
      'cv',
      { type: () => GraphQLUpload, nullable: true },
      FileValidationPipe,
    )
    cv: FileUpload,
  ) {
    return await this.adminService.updateCandidateProfileService(
      userInfoArgs,
      profileArgs,
      aboutArgs,
      jobPreferenceArgs,
      cv,
      userId,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addNotesForEmployer(
    @Args('addNotesDto') addNotesDto: AddNotesDTO,
    @user(['id']) adminId: number,
  ) {
    return this.adminService.addNotesForEmployerService({
      addNotesDto,
      adminId: adminId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async updateEmployerNotes(
    @Args('updateNotesDto') updateNotesDto: UpdateNotesDTO,
  ) {
    return this.adminService.updateEmployerNotesService(updateNotesDto);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async removeEmployerNotes(
    @Args({ name: 'notesId', type: () => Int }) notesId: number,
  ) {
    return this.adminService.removeEmployerNotesService(notesId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => NotesResponse)
  async adminNotesForCandidate(
    @Args({ name: 'candidateId', type: () => Int }) candidateId: number,
    @user(['id']) adminId: number,
  ) {
    return this.adminService.adminNotesForCandidateService({
      candidateId,
      adminId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => NoteResponse)
  async getNotesById(
    @Args({ name: 'notesId', type: () => Int }) notesId: number,
  ) {
    return this.adminService.getNotesByIdService(notesId);
  }
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async addNotes(
    @Args('addNotesDto') addNotesDto: AddNotesDTO,
    @user(['id']) adminId: number,
  ) {
    return this.adminService.addNoteService({ addNotesDto, adminId: adminId });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async updateNotes(@Args('updateNotesDto') updateNotesDto: UpdateNotesDTO) {
    return this.adminService.updateNoteService(updateNotesDto);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async removeNotes(
    @Args({ name: 'notesId', type: () => Int }) notesId: number,
  ) {
    return this.adminService.removeNotesService(notesId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => EmployerNotesResponse)
  async adminNotesForEmployer(
    @Args({ name: 'employerId', type: () => Int }) employerId: number,
    @user(['id']) adminId: number,
  ) {
    return this.adminService.adminNotesForEmployerService({
      employerId,
      adminId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => NoteResponse)
  async adminNotesByIdForEmployer(
    @Args({ name: 'notesId', type: () => Int }) notesId: number,
  ) {
    return this.adminService.adminNotesByIdForEmployerService(notesId);
  }
  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => SkillResponse)
  async getSkills(@Args({ name: 'searchSkill' }) searchSkill: string) {
    return this.adminService.getSkillService(searchSkill);
  }
  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async addSkills(
    @Args({ name: 'skills', type: () => SkillDTO }) skills: SkillDTO,
  ) {
    return this.adminService.addSkillsService(skills);
  }
  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async inviteCandidates(
    @Args({ name: 'candidates', type: () => InviteCandidatesDTO })
    candidates: InviteCandidatesDTO,
  ) {
    return this.adminService.inviteCandidates(candidates);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => PdfToMarkdownTextResponse)
  async getPdfToMarkdownText(@Args('fileName') fileName: string) {
    return this.adminService.pdfToMarkDownService(fileName);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async newProspectClient(@Args('prospectData') prospectData: NewProspectDto) {
    return this.adminService.newProspectClientService(prospectData);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => ProspectClientsResponse)
  async getProspectClients(
    @Args('searchParams') searchParams: SearchProspectsClientsDto,
  ) {
    return this.adminService.getProspectClientsService(searchParams);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => ProspectClientDetailsResponse)
  async getProspectClientDetails(
    @Args('prospectClientId') prospectClientId: number,
  ) {
    return this.adminService.prospectClientDetails(prospectClientId);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async updateProspectClient(
    @Args('prospectClientId') prospectClientId: number,
    @Args('clientData') clientData: UpdateProspectClientDTO,
  ) {
    return this.adminService.updateProspectClient(prospectClientId, clientData);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async updateProspectPeople(
    @Args('prospectClientId') prospectClientId: number,
    @Args('peopleId') peopleId: number,
    @Args('peopleData') peopleData: ProspectPeopleDTO,
  ) {
    return this.adminService.updateProspectPeople(
      prospectClientId,
      peopleId,
      peopleData,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async updateProspectAddress(
    @Args('prospectClientId') prospectClientId: number,
    @Args('addressId') addressId: number,
    @Args('addressData') addressData: ProspectAddressDTO,
  ) {
    return this.adminService.updateProspectAddress(
      prospectClientId,
      addressId,
      addressData,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Query(() => ProspectTimelineResponse)
  async getProspectTimeline(
    @Args('prospectClientId') prospectClientId: number,
  ) {
    return this.adminService.prospectTimeline(prospectClientId);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async removeProspectPeople(@Args('peopleId') peopleId: number) {
    return this.adminService.removeProspectPeopleService(peopleId);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async removeProspectAddress(@Args('addressId') addressId: number) {
    return this.adminService.removeProspectAddressService(addressId);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async newProspectPeople(
    @Args('prospectClientId') prospectClientId: number,
    @Args('peopleData') peopleData: ProspectPeopleDTO,
  ) {
    return this.adminService.newProspectPeopleService(
      prospectClientId,
      peopleData,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async newProspectAddress(
    @Args('prospectClientId') prospectClientId: number,
    @Args('addressData') addressData: ProspectAddressDTO,
  ) {
    return this.adminService.newProspectAddressService(
      prospectClientId,
      addressData,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async convertToClient(
    @Args('prospectClientId') prospectClientId: number,
    @Args('personId') personId: number,
    @Args('addressId') addressId: number,
    @Args('clientData') clientData: EmployerProfileEditDto,
  ) {
    return this.adminService.convertToClient(
      prospectClientId,
      personId,
      addressId,
      clientData,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async closeProspectClient(
    @Args('prospectClientId') prospectClientId: number,
    @Args('email') email: CloseClientDTO,
  ) {
    return this.adminService.closeClientService(prospectClientId, email);
  }

  @UseGuards(new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async updateConvertedClient(
    @Args('updateData') updateData: UpdateConvertedClientDTO,
  ) {
    return this.adminService.updateConvertedClient(updateData);
  }
}
