import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [AlertService]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
