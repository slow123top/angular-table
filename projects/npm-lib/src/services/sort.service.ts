import { Injectable } from '@angular/core';
import { SortSetting, SortDirection } from '../types';
import { orderBy } from 'lodash-es';
@Injectable()
export class SortService {
    // 排序
    sortBy(data: any, sort: SortSetting[]) {
        const sortFields = sort.reduce((pre: any, current: any) => {
            return pre.push(current.field);
        }, []);
        const sortDirs = sort.reduce((pre: any, current: any) => {
            if (!current.dir) {
                return pre.push('');
            }
            return pre.push(current.dir);
        }, []);
        return orderBy(data, sortFields, sortDirs);
    }
}
