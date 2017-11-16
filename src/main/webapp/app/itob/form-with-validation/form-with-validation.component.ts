import {Component, OnInit, AfterViewInit, Renderer, ElementRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiDataUtils, JhiLanguageService} from 'ng-jhipster';

import {LoginModalService, Principal} from '../../shared';
import {CommonService} from '../common/common.service';
import {WindowRefService} from '../common/window.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {FormBuilder} from '@angular/forms';
import {FormWithValidationService} from './form-with-validation.service';
import {DownloadCsvService} from '../common/download.csv.service';
import {DownloadFileService} from '../common/download.file.service';
import {FileDTO} from '../common/dto/file.dto';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-abs-form-with-validation',
    templateUrl: './form-with-validation.component.html',
    providers: [MessageService , DownloadCsvService , DownloadFileService]
})
export class FormWithValidationComponent implements OnInit, AfterViewInit {

    private subscription: Subscription;

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    userDTO: any;
    csvFile: FileDTO;
    imgFile: FileDTO;
    searchCriteria: any;
    registrationTypes: any[];
    cities: any[];
    countries: any[];
    success: boolean;
    successUpdate: boolean;
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
    fileType: string;
    files: FileList;
    filestring: string;
    errorReport: any[];
    errorReportHeader: any[];
    csvFileRequiredErr: string;
    imgFileRequiredErr: string;
    submitBtnTitle: string;
    downloadSftpFileBtnTitle: string;
    isEditRequest: boolean;
    sftpFileName: string;
    sftpFile: any;

    constructor(private languageService: JhiLanguageService,
                private loginModalService: LoginModalService,
                private elementRef: ElementRef,
                private principal: Principal,
                private renderer: Renderer,
                private commonService: CommonService,
                private window: WindowRefService,
                private messageService: MessageService,
                private fb: FormBuilder,
                private formWithValidationService: FormWithValidationService,
                private downloadCsvService: DownloadCsvService,
                private downloadFileService: DownloadFileService,
                private route: ActivatedRoute,
                private dataUtils: JhiDataUtils,

    ) {
        this.csvFile = new FileDTO();
        this.imgFile = new FileDTO();
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe((params) => {
            if (params['id'] !== undefined) {
                this.load(params['id']);
                this.submitBtnTitle = 'Update';
                this.isEditRequest = true;
            } else {
                this.submitBtnTitle = 'Register';
            }
        });

        this.downloadSftpFileBtnTitle = 'Download File';
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
        this.sftpFileName = '';
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

    load(id) {
        this.formWithValidationService.find(id).subscribe((response) => {
            this.processSuccess(response , true);
        }, (response) => this.processError(response));
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
            this.userDTO.createdBy = this.loggedInUser.id;

            if (!this.isEditRequest) {
                this.formWithValidationService.save(this.userDTO).subscribe((response) => {
                    this.processSuccess(response, false);
                }, (response) => this.processError(response));
            } else {
                this.formWithValidationService.update(this.userDTO).subscribe((response) => {
                    this.processSuccess(response, false);
                }, (response) => this.processError(response));
            }
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

        if (this.userDTO.password === undefined || this.userDTO.password === '') {
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

        if (this.userDTO.csvFile === undefined) {
            this.csvFileRequiredErr = 'CSV file is required.';
            this.requestIsValid = false;
        } else {
            this.csvFileRequiredErr = '';
        }

        if (this.userDTO.imgFile === undefined) {
            this.imgFileRequiredErr = 'Image file is required.';
            this.requestIsValid = false;
        } else {
            this.imgFileRequiredErr = '';
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

    private processSuccess(response , isLoadDataReq: boolean) {
        window.scrollTo( 0, 0 );
        this.success = null;
        if (response.status === 200) {
            if (response.json.statusCode === '9999') {
                this.error = response.json.statusValue;
                this.showError('Form Submission failed');
                this.errorReport = response.json.dataArray;
                this.errorReportHeader = ['Error line # ', 'Error Description'];
                // this.showError();
            } else {
                if (isLoadDataReq) {
                    this.userDTO = response.json.data;
                    this.fetchCities();
                } else {
                    this.showSuccess('Request Processed Successfully');

                    if (this.isEditRequest) {
                        this.successUpdate = true;
                    } else {
                        this.success = true;
                    }
                }
            }
        } else {
            this.error = 'ERROR';
        }

    }

    private processError(response) {
        window.scrollTo( 0, 0 );
        this.success = null;
        if (response.status === 400) {
            this.error = response._body;
        } else {
            this.error = 'ERROR';
        }

    }

    showSuccess(strSuccess: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: strSuccess});
    }

    showInfo() {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
    }

    showError(strError: string) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: strError});
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

    onUpload(event, fileType: string) {
        this.fileType = fileType;
        this.files = event.target.files;
        if (this.files.length > 0) {
            const file = event.target.files[0];

            const fileTypeExt = file.type; // fileTypeExt e.g image/png image/jpeg text/csv
            if (this.fileType === 'csv') {
                this.csvFile.fileType = fileTypeExt;
                this.csvFile.fileName = file.name;
            } else if (this.fileType === 'img') {
                this.imgFile.fileType = fileTypeExt;
                this.imgFile.fileName = file.name;
            }

            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsArrayBuffer(file);

            this.msgs = [];
            this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});

        } else {

            if (this.fileType === 'csv') {
                this.csvFile = new FileDTO();
                this.userDTO.csvFile = this.csvFile;
            } else if (this.fileType === 'img') {
                this.imgFile = new FileDTO();
                this.userDTO.imgFile = this.imgFile;
            }

            this.msgs = [];
            this.msgs.push({severity: 'warn', summary: 'Please Attach A File', detail: ''});
        }

        this.files = null;
    }

    _handleReaderLoaded(readerEvt) {
        const arrayBuffer = readerEvt.target.result,
            array = new Uint8Array(arrayBuffer),
            binaryString = String.fromCharCode.apply(null, array);

        if (this.fileType === 'csv') {
            this.csvFile.byteData = btoa(binaryString);  // Converting binary string data.
            this.userDTO.csvFile = this.csvFile;
        } else if (this.fileType === 'img') {
            this.imgFile.byteData = btoa(binaryString);
            this.userDTO.imgFile = this.imgFile;
        }
    }

    downloadErrorReport() {
        this.downloadCsvService.downloadCsv(this.errorReport, this.errorReportHeader, 'Error Report');
    }

    downloadImgFile() {

        let fileType;

        if ( this.userDTO.imgFile.fileType === 'image/png') {
            fileType = 'png';
        } else if ( this.userDTO.imgFile.fileType === 'image/jpeg') {
            fileType = 'jpeg';
        } else if ( this.userDTO.imgFile.fileType === 'application/vnd.ms-excel') {
            fileType = 'csv';
            return;
        }
        this.downloadFileService.download(this.userDTO.imgFile.byteData, 'ImgFile', fileType);
    }

    downloadFileFromSFTPServer() {
        this.formWithValidationService.fetchFileFromSftp(this.sftpFileName).subscribe((response) => {
            this.processSuccessForSftp(response);
        }, (response) => this.processError(response));
    }

    private processSuccessForSftp(response) {
        window.scrollTo( 0, 0 );
        this.success = null;
        if (response.status === 200) {
            if (response.json.statusCode === '9999') {
                this.error = response.json.statusValue;
                this.showError('Form Submission failed');
                this.errorReport = response.json.dataArray;
                this.errorReportHeader = ['Error line # ', 'Error Description'];
                // this.showError();
            } else {
                this.sftpFile = response.json.data;
                this.showSuccess('Search Complete');
                // this.dataUtils.openFile('application/vnd.ms-excel', this.sftpFile);
                this.downloadFileService.downloadFile(this.sftpFile, this.sftpFileName);

            }
        } else {
            this.error = 'ERROR';
        }
    }
}
