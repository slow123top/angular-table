import { orderBy } from 'lodash-es';
import { SortSetting, SortDirection } from '../../types';
export const sortBy = (data: any, sort: SortSetting[]) => {
    const sortFields = sort.reduce((pre: any, current: any) => {
        pre.push(current.field);
        return pre;
    }, []);
    const sortDirs = sort.reduce((pre: any, current: any) => {
        pre.push(current.dir);
        return pre;
    }, []);
    return orderBy(data, sortFields, sortDirs);
};
export const nextSort = (dir: string) => {
    if (!dir) {
        return 'asc';
    } else if (dir === SortDirection.asc) {
        return 'desc';
    } else if (dir === SortDirection.desc) {
        return undefined;
    } else {
        return undefined;
    }
};


