import { ErrorGeneric } from './ErrorGeneric';

type UploadError =
    | 'NOT_A_CSV_FILE'
    | 'SAME_NAME_FILE';

export class FileUploadError extends ErrorGeneric<UploadError>{}









// https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991