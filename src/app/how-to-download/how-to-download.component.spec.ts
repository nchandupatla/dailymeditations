import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToDownloadComponent } from './how-to-download.component';

describe('HowToDownloadComponent', () => {
  let component: HowToDownloadComponent;
  let fixture: ComponentFixture<HowToDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
