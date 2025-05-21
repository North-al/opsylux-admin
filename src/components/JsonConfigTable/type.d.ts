type selectionModeType = 'checkbox' | 'radio' | 'none'

interface JsonConfigTableProps<T> {
    data: T[]
    columns: Column<T>[]
    page: number
    limit: number
    total: number
    loading: boolean
    showPagination: boolean
    selectionMode: string
    tableProps: Partial<InstanceType<typeof ElTable>['$props']>
}

// 定义表格列的类型
interface Column<T = any> {
    prop: string
    label: string
    width?: number
    slot?: boolean
    //   formatter?: (row: T) => string;
    render?: (row: T, column: Column<T>, index: number) => JSX.Element
    //   sortable?: boolean;
    //   filterable?: boolean;
    //   filters?: { text: string; value: any }[];
}
