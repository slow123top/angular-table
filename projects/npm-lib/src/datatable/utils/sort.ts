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
export const sortData = (originData: any, data: any, column: any) => {
    // 获取当前的排序类型  升序 降序 还原  三种状态转换
    const direction = nextSort(column.direction);
    // 数据排序
    if (!direction) {
        return {
            data: JSON.parse(JSON.stringify(originData)),
            dir: direction
        };
    }
    const sortedData = sortBy(data, [{
        field: column.field,
        dir: direction
    }]);
    return {
        data: sortedData,
        dir: direction
    };
};



