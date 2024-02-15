import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Inject, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import {
  VacancyDTO,
  VacancyEditDto,
  AllVacanciesResponse,
  FileResponse,
  VacanciesDetailResponse,
  SearchVacancyDto,
  ApplicationPerVacancy,
  VacanciesAwaitingApprovalResponse,
  NewVacancyResponse,
  AllLatestOpenVacanciesResponse,
  SearchActiveVacanciesDTO,
  VacanciesDetailResponseAll,
  allVacanciesResponse,
  AllActiveVacanciesResponse,
  AppliedOrNot,
} from '../../dto/vacancy/vacancy.dto';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';
import { JwtAuthenticationGuard } from '../../utils/guards/jwtAuthenticationGuard';
import { Role } from '../../utils/enum';
import {
  CampaignResponse,
  CampaignsDTO,
  UpdateCampaignDTO,
  VacancyCampaignsResponse,
} from '../../dto/admin/campaign.dto';
import { VacancyCampaignsEntity } from '../../entity/admin/campaign.entity';
import { RoleAuthorizationGuard } from '../../utils/guards/roleAuthorizationGuard';
import { getAuthorizedRoles } from '../../utils';
import { user } from '../../utils/decorators/user.decorator';
import { MessageResponse } from '../../dto';

@Resolver(() => VacancyEntity)
export class VacancyResolver {
  constructor(@Inject(VacancyService) private vacancyService: VacancyService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard, new RoleAuthorizationGuard(Role.EMPLOYER))
  @Mutation(() => NewVacancyResponse)
  async newVacancy(
    @Args('vacancyDto') vacancyDto: VacancyDTO,
    @Args('userId') userId: number,
    @Args('uploadFile', { type: () => GraphQLUpload, nullable: true })
    uploadFile: FileUpload,
    @Args('additionalFile', { type: () => GraphQLUpload, nullable: true })
    additionalFile: FileUpload,
  ) {
    return this.vacancyService.newVacancyService(
      vacancyDto,
      userId,
      uploadFile,
      additionalFile,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(
    JwtAuthenticationGuard,
    new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)),
  )
  @Query(() => AllVacanciesResponse)
  async employersAllVacancies(
    @Args('employerId', { type: () => Int, nullable: true }) employerId: number,
    @Args('userId', { type: () => Int, nullable: true })
    userId: number,
    @Args('searchParams', { nullable: true }) searchParams: SearchVacancyDto,
  ) {
    return this.vacancyService.employersAllVacanciesService(
      employerId,
      userId,
      searchParams,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(
    JwtAuthenticationGuard,
    new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)),
  )
  @Query(() => VacanciesDetailResponse)
  async vacancyDetails(@Args('vacancyId') vacancyId: number) {
    return this.vacancyService.vacancyDetailsService(vacancyId);
  }

  @UsePipes(ValidationPipe)
  @Query(() => VacanciesDetailResponseAll)
  async vacancyDetailsById(@Args('vacancyId') vacancyId: number) {
    return this.vacancyService.vacancyDetailsById(vacancyId);
  }

  @UsePipes(ValidationPipe)
  @Query(() => allVacanciesResponse)
  async allVacancyDetails() {
    return this.vacancyService.allVacancyDetails();
  }

  @UsePipes(ValidationPipe)
  @Query(() => allVacanciesResponse)
  async vacancyByCat(@Args('JobCat') JobCat: string) {
    return this.vacancyService.vacancyDetailsByCategory(JobCat);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard, new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => MessageResponse)
  async approveVacancy(
    @Args('vacancyId', { type: () => Int }) vacancyId: number,
  ) {
    return this.vacancyService.approveVacancyService(vacancyId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(
    JwtAuthenticationGuard,
    new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)),
  )
  @Mutation(() => MessageResponse)
  async closeVacancy(
    @Args('vacancyId', { type: () => Int }) vacancyId: number,
    @Args('closeReason') closeReason: string,
  ) {
    return this.vacancyService.closeVacancyService(vacancyId, closeReason);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard, new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => CampaignResponse)
  async startCampaign(
    @Args('campaignsDto') campaignsDto: CampaignsDTO,
    @Args('vacancyId', { type: () => Int }) vacancyId: number,
    @user(['id']) userId: number,
  ) {
    return this.vacancyService.startCampaignService(
      campaignsDto,
      vacancyId,
      userId,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard, new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => CampaignResponse)
  async updateCampaign(
    @Args('updateCampaignDto') updateCampaignDto: UpdateCampaignDTO,
  ) {
    return this.vacancyService.updateCampaignService(updateCampaignDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard, new RoleAuthorizationGuard(Role.ADMIN))
  @Mutation(() => CampaignResponse)
  async updateCampaignStatus(
    @Args('status') status: number,
    @Args('campaignId', { type: () => Int }) campaignId: number,
  ) {
    return this.vacancyService.updateCampaignStatusService(campaignId, status);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard)
  @Query(() => VacancyCampaignsResponse)
  async vacancyCampaignsList(
    @Args('vacancyId', { type: () => Int }) vacancyId: number,
  ) {
    return await this.vacancyService.vacancyCampaignsListService(vacancyId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard)
  @Query(() => VacancyCampaignsEntity)
  async campaignDetails(
    @Args('campaignId', { type: () => Int }) campaignId: number,
  ) {
    return await this.vacancyService.campaignsDetailsService(campaignId);
  }

  @UseGuards(
    JwtAuthenticationGuard,
    new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)),
  )
  @Mutation(() => MessageResponse)
  async updateVacancy(
    @Args('vacancyDto') vacancyDto: VacancyEditDto,
    @Args('vacancyId') vacancyId: number,
  ) {
    return await this.vacancyService.updateVacancyService(
      vacancyDto,
      vacancyId,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(
    JwtAuthenticationGuard,
    new RoleAuthorizationGuard([Role.EMPLOYER, Role.ADMIN]),
  )
  @Mutation(() => MessageResponse)
  async updateJobDescriptionFile(
    @Args('uploadFile', { type: () => GraphQLUpload, nullable: true })
    uploadFile: FileUpload,
    @Args('additionalFile', { type: () => GraphQLUpload, nullable: true })
    additionalFile: FileUpload,
    @Args('vacancyId') vacancyId: number,
  ) {
    return await this.vacancyService.updateVacancyFileService(
      uploadFile,
      additionalFile,
      vacancyId,
    );
  }
  @UsePipes(ValidationPipe)
  @UseGuards(
    JwtAuthenticationGuard,
    new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)),
  )
  @Query(() => FileResponse)
  async downloadVacancyFile(@Args('vacancyId') vacancyId: number) {
    return this.vacancyService.downloadVacancyFileService(vacancyId);
  }

  @UsePipes(JwtAuthenticationGuard, ValidationPipe)
  @Query(() => ApplicationPerVacancy)
  async getApplicationsByVacancy(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number,
    @Args('vacancyId', { type: () => Int }) vacancyId: number,
  ) {
    return await this.vacancyService.findApplicationsByVacancy(
      current,
      pageSize,
      vacancyId,
    );
  }

  @UsePipes(JwtAuthenticationGuard, ValidationPipe)
  @Query(() => VacanciesAwaitingApprovalResponse)
  async getVacanciesAwaitingApproval() {
    return this.vacancyService.vacanciesAwaitingApprovalService();
  }

  @Query(() => AllLatestOpenVacanciesResponse)
  async getLatestOpenVacancies(
    @Args({ name: 'fromJobSearch', nullable: true }) fromJobSearch: boolean,
  ) {
    return this.vacancyService.getLatestOpenVacanciesService(fromJobSearch);
  }

  @Query(() => AllActiveVacanciesResponse)
  async searchActiveVacancies(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number,
    @Args({ name: 'searchParams' }) searchParams: SearchActiveVacanciesDTO,
  ) {
    return this.vacancyService.searchActiveVacanciesService(
      current,
      pageSize,
      searchParams,
    );
  }

  @UsePipes(ValidationPipe)
  @Query(() => AppliedOrNot)
  async isUserAppliedToVacancy(
    @Args('vacancyId') vacancyId: number,
    @user(['id']) userId: number,
  ) {
    return this.vacancyService.isUserAppliedToVacancy(vacancyId, userId);
  }
}
