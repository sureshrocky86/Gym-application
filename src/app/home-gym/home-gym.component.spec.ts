import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGymComponent } from './home-gym.component';

describe('HomeGymComponent', () => {
  let component: HomeGymComponent;
  let fixture: ComponentFixture<HomeGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
