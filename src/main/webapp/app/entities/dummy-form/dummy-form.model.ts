import { BaseEntity } from './../../shared';

export class ITOBDummyForm implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public imageFileContentType?: string,
        public imageFile?: any,
        public binaryFileContentType?: string,
        public binaryFile?: any,
        public clobTextField?: any,
    ) {
    }
}
