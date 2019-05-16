export interface Page {
    id: any;
    label: any;
    hidden?: boolean;
}

export interface PaginationSetting {

    /* 数据总数 */

    total: number;

    /* 当前索引页 */
    pageIndex: number;

    /* 每页数量 */
    pageSize?: number;

    /* 自定义每页数量集合 */
    pageSizeCollection?: number[];

    /* 展示的页数*/
    displayPages?: number;

    /* 展示可改变每页数量的下拉框 */

    enableChangePageSize?: boolean;

    /* 展示可跳转多页的输入框 */

    enableChangePageIndex?: boolean;
}
