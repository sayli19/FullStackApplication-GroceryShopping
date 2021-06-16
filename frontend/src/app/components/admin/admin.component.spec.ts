import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Admin component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h3 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Orders');
  }));

  it('Pagination set on first page', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(component.pagCounter).toEqual(1);
  }));



});
