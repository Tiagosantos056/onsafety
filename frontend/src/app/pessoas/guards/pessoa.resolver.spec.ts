import { TestBed } from '@angular/core/testing';

import { PessoaResolver } from './pessoa.resolver';

describe('PessoaResolver', () => {
  let resolver: PessoaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PessoaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
