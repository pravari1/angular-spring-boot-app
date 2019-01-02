import { fakeAsync, tick } from '@angular/core/testing';
import { EmployeeService} from './employee.service';

describe('EmployeeService functions', () => {
    let service;
    beforeEach(() => {
        service = new EmployeeService(null);
    });
    it('should #handleError return promise with reject', fakeAsync(() => {
        const error = 'not found';
        let newError;
        service.handleError(error).catch((err) => {
            newError = err;
        });
        tick();
        expect(newError).toBe(error);
    }));

    it('should #getConfigObject return object with header and tableData', () => {
        let config = service.getConfigObject();
        expect(config.tableData).toEqual(jasmine.any(Array));
        expect(config.headers).toEqual(jasmine.arrayContaining([{title: 'Id', field: 'id'}]));
    });
});


describe('EmployeeService URL', () => {
    let service;
    beforeEach(() => {
        service = new EmployeeService(null);
    });

    it('should have refreshURL, addEmployeeURL, editEmployeeURL while injecting service', () => {
        expect(service.refreshURL).toContain('/employee/employees');
        expect(service.addEmployeeURL).toContain('/employee/create');
        expect(service.editEmployeeURL).toContain('/employee/edit');
        expect(service.deleteEmployeeURL).toContain('/employee/delete');
    });

});

