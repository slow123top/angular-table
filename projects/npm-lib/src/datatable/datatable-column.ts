import { TemplateRef } from '@angular/core';
export interface DataTableColumn {
    // 字段名
    title: string;
    // 字段id
    field: string;
    // 列宽
    width: number;
    // 列横向对齐方式
    align?: string;
    // 列的显隐
    hidden?: boolean;
    // 固定列
    fixed?: any;
    // 列排序
    sortable?: boolean;
    className?: string;
    // 可编辑
    edit?: string;
    // 列格式化API 用户自定义
    formatter?: any;
    /* 单元格模板和编辑模板 */
    cellTempl?: TemplateRef<any>;
    editTempl?: TemplateRef<any>;
}
export const convertColumns = (columns: any, direction: any) => {
    const tempFixedColumns = [];
    const tempNotFixedColumns = [];
    columns.forEach(ele => {
        if (ele.fixed && (ele.fixed === direction || ele.fixed.type === direction)) {
            tempFixedColumns.push(ele);
        } else {
            tempNotFixedColumns.push(ele);
        }
    });
    return tempFixedColumns.concat(tempNotFixedColumns);
};
function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
export const deepCopy = (data) => {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (const dataItem of data) {
            o.push(deepCopy(dataItem));
        }
    } else if (t === 'object') {
        for (const i of Object.keys(data)) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
};



