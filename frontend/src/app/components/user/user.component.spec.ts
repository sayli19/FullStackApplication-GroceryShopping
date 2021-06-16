import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/service/auth.service';
import { UserComponent } from './user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Users Page should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Orders tab should be invisible by default', async(() => {
    expect(fixture.debugElement.query(By.css('#orders')).nativeElement.style.display).toEqual('none');
  }));
  
  it('Increment and decrement pagination should exists', () => {
    
    expect(component.decrementPag).toBeTruthy()
    expect(component.incrementPag).toBeTruthy()
  });




});
