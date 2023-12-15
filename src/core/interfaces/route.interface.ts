import { Breadcrumb } from ".";

export interface Route {
    [x: string]: {
        path: string;
        breadcrumb: Breadcrumb[];
    };
}