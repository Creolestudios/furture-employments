import { Test, TestingModule } from '@nestjs/testing';
import { SignUpResolver } from './sign-up.resolver';

describe('SignUpResolver', () => {
  let resolver: SignUpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpResolver],
    }).compile();

    resolver = module.get<SignUpResolver>(SignUpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
