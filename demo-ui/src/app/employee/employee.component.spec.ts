import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ModalService } from '../commons/my-dialog/modal.service';
import { EmployeeComponent } from './employee.component';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { MyDateComponent } from '../commons/my-date/my-date.component';


describe('Employee component function', () => {
  let fixture: ComponentFixture<EmployeeComponent>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [EmployeeComponent, MyDateComponent],
      providers: [EmployeeService, ModalService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    employeeService = TestBed.get(EmployeeService);
  });

  it('should push tabeData on calling save() when selected is -1', fakeAsync(() => {
    const selected = -1;
    const res = new Employee();
    const component = fixture.componentInstance;
    spyOn(employeeService, 'addEmployee').and.callFake(res1 => {
      return Promise.resolve(res);
    });
    spyOn(employeeService, 'getAllEmployee').and.returnValue(
      Promise.resolve([])
    );

    spyOn(component, 'closeModal').and.callFake(() => {});

    const config = [new Employee(), new Employee()];
    component.selected = selected;

    fixture.detectChanges();
    tick();

    expect(component.employeeForm.valid).toBeFalsy();

    component.employeeForm.controls['firstName'].setValue('firstName');
    component.employeeForm.controls['lastName'].setValue('lastName');
    component.employeeForm.controls['email'].setValue('abc@abc.com');
    component.employeeForm.controls['dob'].setValue('10/2/1992');
    fixture.detectChanges();

    expect(component.employeeForm.valid).toBeTruthy();

    component.config = { tableData: config };

    component.save();
    tick();

    expect(component.config.tableData.length).toBeGreaterThan(2);
  }));

  it('should override employee in tabeData on save call on selectd employee index', fakeAsync(() => {
    const selected = 0;
    const res = new Employee();
    res.firstName = 'UpdatedFirstName';
    res.email = 'UpdatedEmail@gmail.com';
    res.lastName = 'UpdatedLastName';
    res.dob = new Date('3/3/2003');
    const component = fixture.componentInstance;

    spyOn(component, 'closeModal').and.callFake(() => {});
    spyOn(employeeService, 'addEmployee').and.callFake(res1 => {
      return Promise.resolve(res);
    });
    spyOn(employeeService, 'getAllEmployee').and.returnValue(
      Promise.resolve([])
    );
    const config = [new Employee(), new Employee()];
    config[0].firstName = 'FirstEmployee';
    config[0].lastName = 'FirstLastName';
    config[0].email = 'FirstEmployee@gmail.com';
    config[0].dob = new Date('1/1/2001');
    config[1] = {
      firstName: 'SecondEmployee',
      lastName: 'SecondLastName',
      email: 'SecondEmployee@gmail.com',
      dob: new Date('2/2/2002')
    };

    component.selected = selected;

    fixture.detectChanges();
    tick();
    component.employeeForm.controls['firstName'].setValue('firstName');
    component.employeeForm.controls['lastName'].setValue('lastName');
    component.employeeForm.controls['email'].setValue('abc@abc.com');
    component.employeeForm.controls['dob'].setValue('10/2/1992');
    fixture.detectChanges();

    expect(component.employeeForm.valid).toBeTruthy();

    component.config = { tableData: config };

    component.save();
    tick();

    expect(component.config.tableData[selected].firstName).toEqual(
      'UpdatedFirstName'
    );
    expect(component.config.tableData[selected].lastName).toEqual(
      'UpdatedLastName'
    );
    expect(component.config.tableData[selected].email).toEqual(
      'UpdatedEmail@gmail.com'
    );
    expect(component.config.tableData[selected].dob).toEqual(
      new Date('3/3/2003')
    );
  }));

  it('should verify the form is available in component', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.employeeForm).toBeTruthy();
  });


  it('should verify ngOnInt called after component created', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {});
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should verify ngOnInt called after component created', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {});
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should set tableData after ngOnInit called', fakeAsync(() => {
    const component = fixture.componentInstance;
    const res = [new Employee(), new Employee()];
    spyOn(employeeService, 'getAllEmployee').and.returnValue(Promise.resolve(res));

    component.ngOnInit();
    tick();

    expect(component.config.tableData).toEqual(res);
  }));
});

describe('Interaction with template', () => {
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [EmployeeComponent, MyDateComponent],
      providers: [EmployeeService, ModalService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EmployeeComponent);
  });

  it('should call save() on save button click', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'save').and.returnValue(1);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.mat-raised-button'));
    button.triggerEventHandler('click', null);

    expect(component.save).toHaveBeenCalled();
  });

  it('should call closeModal() on Cancel button  ', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'closeModal').and.callFake(id => {});
    // let service = TestBed.get(ModalService);
    // spyOn(service, 'close').and.callFake(id => {});
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.emp-cancel'));
    button.triggerEventHandler('click', null);

    expect(component.closeModal).toHaveBeenCalledWith('employee-modal');
  });

});
