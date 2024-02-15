import { Test, TestingModule } from '@nestjs/testing';
import { VacancyResolver } from './vacancy.resolver';

describe('VacancyResolver', () => {
  let resolver: VacancyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacancyResolver],
    }).compile();

    resolver = module.get<VacancyResolver>(VacancyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
