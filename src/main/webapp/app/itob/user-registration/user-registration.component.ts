import {Component, OnInit, AfterViewInit, Renderer, ElementRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageService} from 'ng-jhipster';

import {UserRegister} from './user-registration.service';
import {LoginModalService, Principal} from '../../shared';
import {CommonService} from '../common/common.service';
import {WindowRefService} from '../common/window.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {FileUploadModule} from 'primeng/primeng';

@Component({
    selector: 'jhi-abs-user-register',
    templateUrl: './user-registration.component.html',
    providers: [MessageService]
})
export class UserRegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    userDTO: any;
    searchCriteria: any;
    registrationTypes: any[];
    cities: any[];
    countries: any[];
    success: boolean;
    modalRef: NgbModalRef;
    loggedInUser: any;
    usernameError: string;
    emailError: string;
    displayNameError: string;
    firstNameError: string;
    middleNameError: string;
    lastNameError: string;
    isActiveError: string;
    regTypeError: string;
    citiesError: string;
    countryError: string;
    passwordError: string;
    confirmPasswordError: string;
    requestIsValid: boolean;
    text: string;
    disabled: boolean;
    clicks: number;
    msgs: Message[] = [];

    uploadedFiles: any[] = [];

    constructor(private languageService: JhiLanguageService,
                private loginModalService: LoginModalService,
                private registerService: UserRegister,
                private elementRef: ElementRef,
                private principal: Principal,
                private renderer: Renderer,
                private commonService: CommonService,
                private window: WindowRefService,
                private messageService: MessageService,
                private fileUploadModule: FileUploadModule,
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.userDTO = {};
        this.userDTO.username = '';
        this.userDTO.email = '';
        this.userDTO.displayName = '';
        this.userDTO.firstName = '';
        this.userDTO.middleName = '';
        this.userDTO.lastName = '';
        this.userDTO.isActive = false;
        this.userDTO.userType = '';
        this.userDTO.idCountry = '';
        this.userDTO.idCity = '';
        this.userDTO.password = '';
        this.confirmPassword = '';

        this.principal.identity().then((account) => {
            this.loggedInUser = account;
        });

        this.commonService.fetchCountries().subscribe((response) => {

            if (response.json.statusCode = '00' ) {
                this.countries = response.json.dataList;
            } else {
                this.error = response.json.statusValue;
                window.scrollTo( 0, 0 );
            }
        });

        const roleCategory = 'ROLE';

        this.commonService.fetchByUserTypeCategory( roleCategory ).subscribe((response) => {

            if (response.json.statusCode = '00' ) {
                this.registrationTypes = response.json.dataList;
            } else {
                this.error = response.json.statusValue;
                window.scrollTo( 0, 0);
            }

        });

    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        window.scrollTo( 0, 0 );
        /*validate the user registration request*/
        this.validateRequest();

        if (this.requestIsValid) {
            this.usernameError = '';
            this.emailError = '';
            this.displayNameError = '';
            this.firstNameError = '';
            this.middleNameError = '';
            this.lastNameError = '';
            this.regTypeError = '';
            this.countryError = '';
            this.citiesError = '';
            this.passwordError = '';
            this.confirmPasswordError = '';

            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            // this.userDTO.idOrgUnit = this.loggedInUser.idOrgUnit;
            this.userDTO.createdBy = this.loggedInUser.id;

            this.registerService.save(this.userDTO).subscribe(() => {
                this.success = true;
            }, (response) => this.processError(response));
        }
    }

    private validateRequest() {
        this.requestIsValid = true;

        if (this.userDTO.username === '') {
            this.usernameError = 'Username is required.';
            this.requestIsValid = false;
        } else {
            this.usernameError = '';
        }

        if (this.userDTO.email === '') {
            this.emailError = 'Email is required.';
            this.requestIsValid = false;
        } else {
            this.emailError = '';
        }

        if (this.userDTO.displayName === '') {
            this.displayNameError = 'Display Name is required.';
            this.requestIsValid = false;
        } else {
            this.displayNameError = '';
        }

        if (this.userDTO.firstName === '') {
            this.firstNameError = 'First Name is required.';
            this.requestIsValid = false;
        } else {
            this.firstNameError = '';
        }

        if (this.userDTO.middleName === '') {
            this.middleNameError = 'Middle Name is required.';
            this.requestIsValid = false;
        } else {
            this.middleNameError = '';
        }

        if (this.userDTO.lastName === '') {
            this.lastNameError = 'Last Name is required.';
            this.requestIsValid = false;
        } else {
            this.lastNameError = '';
        }

        if (this.userDTO.userType === '') {
            this.regTypeError = 'Registration Type is required.';
            this.requestIsValid = false;
        } else {
            this.regTypeError = '';
        }

        if (this.userDTO.idCountry === '') {
            this.countryError = 'Country is required.';
            this.requestIsValid = false;
        } else {
            this.countryError = '';
        }

        if (this.userDTO.idCity === '') {
            this.citiesError = 'City is required.';
            this.requestIsValid = false;
        } else {
            this.citiesError = '';
        }

        if (this.userDTO.password === '') {
            this.passwordError = 'Password is required.';
            this.requestIsValid = false;
        } else {
            this.passwordError = '';
        }

        if (this.confirmPassword === '') {
            this.confirmPasswordError = 'Confirm Password is required.';
            this.requestIsValid = false;
        } else {
            this.confirmPasswordError = '';
        }

        if (this.confirmPassword !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
            this.requestIsValid = false;
        }
    }

    fetchCities() {
        this.commonService.fetchCitiesByCountryId(this.userDTO).subscribe((response) => {

            if (response.json.statusCode = '00' ) {
                this.cities = response.json.dataList;
            } else {
                this.error = response.json.statusValue;
                window.scrollTo( 0, 0 );
            }
        });

    }

    /*openLogin() {
     this.modalRef = this.loginModalService.open();
     }*/

    private processError(response) {
        window.scrollTo( 0, 0 );
        this.success = null;
        if (response.status === 400) {
            this.error = response._body;
        } else {
            this.error = 'ERROR';
        }
    }

    showSuccess() {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
    }

    showInfo() {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
    }

    showError() {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
    }

    showMultiple() {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks'});
        this.msgs.push({severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks'});
        this.msgs.push({severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks'});
    }

    showViaService() {
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
    }

    clearViaService() {
        this.messageService.clear();
    }

    clear() {
        this.msgs = [];
    }

    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}
