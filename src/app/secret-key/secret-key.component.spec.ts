import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretKeyComponent } from './secret-key.component';

describe('SecretKeyComponent', () => {
  let component: SecretKeyComponent;
  let fixture: ComponentFixture<SecretKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
