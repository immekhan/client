import {Renderer, Injectable} from '@angular/core';

@Injectable()
export class DownloadCsvService {

    private errorReport: any[];
    private errorReportHeader: any[];
    private fileName: string;

    constructor(private renderer: Renderer) {}

    /**
     * This service is generate csv error report
     * @param {any[]} errorReport
     * @param {any[]} errorReportHeader
     * @param {string} fileName
     */
    downloadCsv(errorReport: any[], errorReportHeader: any[] , fileName: string) {

        if (!errorReport.length || !errorReportHeader.length) {
            // this.onError.emit(new Error('Data not available.'));
            return;
        }

        if (!fileName.length) {
            this.fileName = 'download';
        }

        this.errorReport = errorReport;
        this.errorReportHeader = errorReportHeader;
        this.fileName = fileName;

        const csvString = this.construct();
        this.buildDownloader(csvString);
    }

    private getDocumentBody(): any {
        return document.body;
    }

    private construct(): string {
        let tabText = '';
        const keys = Object.keys(this.errorReport[0]);
        if (!this.errorReportHeader.length) {
            // if no errorReportHeader are passed, use data keys for errorReportHeader
            this.errorReportHeader = keys;
        }

        this.errorReportHeader.forEach((h) => {
            tabText += '' + h + ',';
        });

        if (tabText.length > 0) {
            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        }

        this.errorReport.forEach((d) => {
            keys.forEach((k) => {
                if (d.hasOwnProperty(k) && d[k] != null) {
                    tabText += '' + d[k] + '';
                } else {
                    tabText += '"",';
                }
            });

            // tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        });

        return tabText;
    }

    private buildDownloader(data) {
        const anchor = this.renderer.createElement(this.getDocumentBody(), 'a');
        this.renderer.setElementStyle(anchor, 'visibility', 'hidden');
        this.renderer.setElementAttribute(anchor, 'href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(data));
        this.renderer.setElementAttribute(anchor, 'target', '_blank');
        this.renderer.setElementAttribute(anchor, 'download', this.fileName + '.csv');

        setTimeout(() => {
            this.renderer.invokeElementMethod(anchor, 'click');
            this.renderer.invokeElementMethod(anchor, 'remove');
        }, 5);

    }
}
