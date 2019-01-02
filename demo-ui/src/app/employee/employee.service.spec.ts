import { EmployeeService } from './employee.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EmployeeService function', () => {
    let service: EmployeeService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EmployeeService]
        });
        service = TestBed.get(EmployeeService);
        httpMock = TestBed.get(HttpTestingController);
        spyOn<any>(service, 'handleError').and.returnValue(Promise.reject('error'));
    });
    it('shoud return promise on call #getAllEmployee()', () => {
        const employeeData = [
            {
                firstName: 'firstEmployee',
                lastName: 'lastEmployee',
                email: 'email@employee.com',
                dob: new Date('10/10/2018')
            },
            {
                firstName: 'secondEmployee',
                lastName: 'SecondEmployee',
                email: 'Second@employee.com',
                dob: new Date('20/10/2018')
            }
        ];

        service.getAllEmployee().then(emps => {
            expect(emps.length).toBe(2);
            expect(emps).toEqual(employeeData);
        });

        const req = httpMock.expectOne('http://localhost:8080/hrsolapp/employee/employees');
        expect(req.request.method).toBe('GET');
        req.flush(employeeData);
        httpMock.verify();
    });

    it('error response of #getAllEmployee', () => {
        service.getAllEmployee().then((res) => {
        }).catch((err) => {
            expect(err).toBe('error');
        });
    });

    // --------------------------------------------------------------------------
    it('shoud return promise on call #addEmployee()', () => {
        const employee = {
                    firstName: 'firstEmployee',
                    lastName: 'lastEmployee',
                    email: 'email@employee.com',
                    dob: new Date('10/10/2018')
                };

        service.addEmployee(employee).then(emps => {
            expect(emps).toEqual(employee);
        });

        const req = httpMock.expectOne('http://localhost:8080/hrsolapp/employee/create');
        expect(req.request.method).toBe('POST');
        req.flush(employee);
        httpMock.verify();
    });

    it('error response of #addEmployee', () => {
        const employee = {
            firstName: 'firstEmployee',
            lastName: 'lastEmployee',
            email: 'email@employee.com',
            dob: new Date('10/10/2018')
        };
        service.addEmployee(employee).then((res) => {
        }).catch((err) => {
            expect(err).toBe('error');
        });
    });

    // --------------------------------------------------------------------------
    it('shoud return promise on call #editEmployee()', () => {
        const employee = {
            firstName: 'firstEmployee',
            lastName: 'lastEmployee',
            email: 'email@employee.com',
            dob: new Date('10/10/2018')
        };

        service.editEmployee(employee).then(emps => {
            expect(emps).toEqual(employee);
        });

        const req = httpMock.expectOne('http://localhost:8080/hrsolapp/employee/edit');
        expect(req.request.method).toBe('PUT');
        req.flush(employee);
        httpMock.verify();
    });

    it('error response of #editEmployee', () => {
        const employee = {
            firstName: 'firstEmployee',
            lastName: 'lastEmployee',
            email: 'email@employee.com',
            dob: new Date('10/10/2018')
        };
        service.addEmployee(employee).then((res) => {
        }).catch((err) => {
            expect(err).toBe('error');
        });
    });


});
