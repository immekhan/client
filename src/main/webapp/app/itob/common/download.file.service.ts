import {Renderer, Injectable} from '@angular/core';

@Injectable()
export class DownloadFileService {

    private byteData: any;
    private fileName: string;
    private fileType: string;

    constructor(private renderer: Renderer) {}

    /**
     * Download file with byte fileType e.g. csv , jpg etc many more
     * @param byteData
     * @param {string} fileName
     * @param {string} fileType
     */
    download(byteData: any , fileName: string , fileType: string) {

        if (byteData === undefined || fileName === undefined || fileType === undefined) {
            // && (fileType === 'jpeg' || fileType === 'png' || fileType === 'gif')) {
            // this.onError.emit(new Error('Data not available.'));
            return;
        }

        if (!fileName.length) {
            this.fileName = 'download';
        }

        this.byteData = byteData;
        this.fileName = fileName;
        this.fileType = fileType;

        this.buildDownloader(this.byteData);
    }

    /** Download File with giving the file extension with file name e.g. FileName.csv FileName.jpg etc
     * @param byteData
     * @param {string} fileName
     */
    downloadFile(byteData: any , fileName: string) {

        if (byteData === undefined || fileName === undefined) {
            // && (fileType === 'jpeg' || fileType === 'png' || fileType === 'gif')) {
            // this.onError.emit(new Error('Data not available.'));
            return;
        }

        if (!fileName.length) {
            this.fileName = 'download';
        }

        this.byteData = byteData;
        this.fileName = fileName;

        this.buildDownloader(this.byteData);
    }

    private getDocumentBody(): any {
        return document.body;
    }

    private buildDownloader(data) {
        const anchor = this.renderer.createElement(this.getDocumentBody(), 'a');
        this.renderer.setElementStyle(anchor, 'visibility', 'hidden');
        this.renderer.setElementAttribute(anchor, 'href', 'data:image/PNG;base64,' + encodeURIComponent(data));
        this.renderer.setElementAttribute(anchor, 'target', '_blank');
        if (this.fileType !== undefined) {
            this.renderer.setElementAttribute(anchor, 'download', this.fileName + '.' + this.fileType);
        } else {
            this.renderer.setElementAttribute(anchor, 'download', this.fileName);
        }
        setTimeout(() => {
            this.renderer.invokeElementMethod(anchor, 'click');
            this.renderer.invokeElementMethod(anchor, 'remove');
        }, 5);

    }
}
