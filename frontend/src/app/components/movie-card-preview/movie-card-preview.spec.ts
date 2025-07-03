import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardPreview } from './movie-card-preview';

describe('MovieCardPreview', () => {
  let component: MovieCardPreview;
  let fixture: ComponentFixture<MovieCardPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
