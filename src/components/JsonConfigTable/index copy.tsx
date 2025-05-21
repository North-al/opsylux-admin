import { defineComponent, PropType, computed, h, ref } from 'vue';
import type { ElTable } from 'element-plus';

// 定义表格列的类型
interface Column<T = any> {
  prop: string;
  label: string;
  width?: number;
  slot?: string;
  formatter?: (row: T) => string;
  render?: (row: T, column: Column<T>, index: number) => JSX.Element;
  sortable?: boolean;
  filterable?: boolean;
  filters?: { text: string; value: any }[];
}

// 定义分页参数类型
interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export default defineComponent({
  name: 'JsonConfigTable',
  props: {
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },
    pagination: {
      type: Object as PropType<Pagination>,
      default: () => ({
        page: 1,
        limit: 10,
        total: 0,
      }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    selectionMode: {
      type: String as PropType<'checkbox' | 'radio' | 'none'>,
      default: 'none',
    },
    tableProps: {
      type: Object as PropType<Partial<InstanceType<typeof ElTable>['$props']>>,
      default: () => ({}),
    },
  },
  emits: ['update:page', 'update:limit', 'change', 'selection-change'],
  setup(props, { emit, slots, attrs }) {
    const tableRef = ref<InstanceType<typeof ElTable>>();

    const handlePageChange = (page: number) => {
      emit('update:page', page);
      emit('change', page, props.pagination.limit);
    };

    const handleSizeChange = (limit: number) => {
      emit('update:limit', limit);
      emit('change', props.pagination.page, limit);
    };

    const handleSelectionChange = (selection: any[]) => {
      emit('selection-change', selection);
    };

    const handleRowClick = (row: any, column: any, event: Event) => {
      if (props.selectionMode === 'radio') {
        tableRef.value?.clearSelection();
        tableRef.value?.toggleRowSelection(row, true);
      }
      attrs['onRowClick']?.(row, column, event);
    };

    return () => (
      <div class="json-config-table">
        {/* 表格 */}
        <el-table
          ref={tableRef}
          data={props.data}
          border={props.border}
          style={{ width: '100%' }}
          loading={props.loading}
          onSelectionChange={handleSelectionChange}
          onRowClick={handleRowClick}
          {...props.tableProps}
          {...attrs}
          v-slots={{
            empty: () =>
              slots['empty'] ? (
                slots['empty']()
              ) : (
                <el-empty description="暂无数据" />
              ),
          }}
        >
          {/* 选择列 */}
          {props.selectionMode !== 'none' && (
            <el-table-column
              type={props.selectionMode === 'checkbox' ? 'selection' : undefined}
              width="55"
            />
          )}

          {/* 动态列 */}
          {props.columns.map((column) => (
            <el-table-column
              prop={column.prop}
              label={column.label}
              width={column.width}
              sortable={column.sortable}
              filters={column.filters}
              filterable={column.filterable}
              onSortChange={(sort) => attrs['onSortChange']?.(sort)}
              onFilterChange={(filters) => attrs['onFilterChange']?.(filters)}
            >
              {({ row, $index }: { row: any; $index: number }) => {
                if (column.render) {
                  return column.render(row, column, $index);
                }
                if (slots[column.slot || column.prop]) {
                  return slots[column.slot || column.prop]?.({ row, $index });
                }
                if (column.formatter) {
                  return <span>{column.formatter(row)}</span>;
                }
                return <span>{row[column.prop]}</span>;
              }}
            </el-table-column>
          ))}

          {/* 操作列 */}
          {slots['operation'] && (
            <el-table-column label="操作" width="150">
              {({ row, $index }: { row: any; $index: number }) =>
                slots['operation']?.({ row, $index })
              }
            </el-table-column>
          )}

          {/* 表头插槽 */}
          {slots['header'] && (
            <el-table-column label="自定义表头">
              {() => slots['header']?.()}
            </el-table-column>
          )}

          {/* 默认插槽 */}
          {slots.default && slots.default()}
        </el-table>

        {/* 分页 */}
        {props.showPagination && (
          <div class="pagination-wrapper" style={{ marginTop: '16px', textAlign: 'right' }}>
            <el-pagination
              current-page={props.pagination.page}
              page-size={props.pagination.limit}
              total={props.pagination.total}
              page-sizes={[10, 20, 50, 100]}
              layout="total, sizes, prev, pager, next, jumper"
              onCurrentChange={handlePageChange}
              onSizeChange={handleSizeChange}
            />
            {slots.pagination && (
              <div class="custom-pagination-slot">{slots.pagination()}</div>
            )}
          </div>
        )}
      </div>
    );
  },
});