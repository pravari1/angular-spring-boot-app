import { EmployeeComponent } from './employee.component';
import { Employee } from './employee.model';
import { ModalService } from '../commons/my-dialog/modal.service';
import { fakeAsync, tick } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { AlertService } from '../commons/util/alert/alert.service';

describe('Employee component open function test', () => {
    let component: EmployeeComponent;
    let modalService;
    let employeeService;
    // let alertService;

    beforeEach(() => {
        modalService = new ModalService();
        // alertService = new AlertService(null);

        spyOn(modalService, 'open').and.callFake(() => {});
        employeeService = new EmployeeService(null); 
        component = new EmployeeComponent(employeeService , modalService, null);
    });
    it('should get employee from config tabledata when calling openModal', () => {
        const action = 'Edit';
        const empIndex = 1;
        const config = [new Employee(), new Employee()];
        config[0].firstName = '0';
        config[1].firstName = '1';
        spyOn(component, 'closeModal').and.callFake(() => {});
        spyOn(component, 'resetForm').and.callFake(() => {});
        component.config = {tableData: []};
        component.config.tableData = config;
        component.openModal(action, '', empIndex);

        expect(component.config.tableData[empIndex].firstName).toEqual(config[1].firstName);

    });
    it('should set employee a new employee for action add', () => {
        const action = 'Add';
        spyOn(component, 'closeModal').and.callFake(() => {});
        spyOn(component, 'resetForm').and.callFake(() => {});
        component.openModal(action, '', 0);

        expect(component.selected).toEqual(-1);
    });

    it('should call open of modalservice with id', () => {
        const id = 'my-id';
        spyOn(component, 'closeModal').and.callFake(() => {});
        spyOn(component, 'resetForm').and.callFake(() => {});
        component.openModal('', id, 0);

        expect(modalService.open).toHaveBeenCalledWith(id);
    });
    it('should refresh the grid data setting config.tabledata', fakeAsync(() => {
        let res: Employee[];
        res = [new Employee(), new Employee()];
        spyOn(employeeService, 'getAllEmployee').and.returnValue(Promise.resolve(res));

        component.config = {};
        component.config.tableData = [];
        component.refresh(null);

        tick();

        expect(component.config.tableData.length).toEqual(2);

    }));

    it('should set employee to new Employee object', () => {
        expect(component.employee).not.toBeUndefined();
    });

});
