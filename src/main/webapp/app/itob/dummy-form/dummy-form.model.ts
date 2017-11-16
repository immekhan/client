import { BaseEntity } from './../../shared';

export class ITOBDummyForm implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public imageFileName?: string,
        public imageFileContentType?: string,
        public imageFile?: any,
        public binaryFileName?: string,
        public binaryFileContentType?: string,
        public binaryFile?: any,
        public clobTextField?: any,
    ) {
    }
}
