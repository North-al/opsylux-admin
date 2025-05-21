<script setup lang="tsx" generic="T = any">
    import type { ElTable } from 'element-plus'

    defineOptions({
        name: 'JsonConfigTable'
    })

    const page = defineModel('page', {
        type: Number,
        default: 1
    })

    const limit = defineModel('limit', {
        type: Number,
        default: 10
    })

    const {
        data,
        columns,
        total = 0,
        loading = false,
        showPagination = true,
        selectionMode = 'none',
        tableProps = {}
    } = defineProps<{
        data: T[]
        columns: Column<T>[]
        page: number
        limit: number
        total: number
        loading?: boolean
        showPagination?: boolean
        selectionMode?: selectionModeType
        tableProps?: Partial<InstanceType<typeof ElTable>['$props']>
    }>()

    const emits = defineEmits<{
        (e: 'update:page', page: number): void
        (e: 'update:limit', limit: number): void
        (e: 'selectionChange', selection: T[]): void
    }>()
</script>

<template>
    <el-table
        v-bind="tableProps"
        :data="data"
        :loading="loading"
        :total="total"
        :selection-mode="selectionMode"
        @selection-change="emits('selectionChange', $event)">
        <template v-for="column in columns" :key="column.prop">
            <el-table-column v-bind="column">
                <template v-if="column.render" #default="scope">
                    <component :is="column.render(scope.row, scope.column, scope.$index)"></component>
                </template>
                <template v-else-if="column.slot !== false" #default="scope">
                    <slot :name="column.prop" :scope="scope">
                        {{ scope.row[column.prop] }}
                    </slot>
                </template>
            </el-table-column>
        </template>
    </el-table>

    <el-pagination
        v-if="showPagination"
        v-model:page="page"
        v-model:limit="limit"
        :total="total"
        @update:page="emits('update:page', $event)"
        @update:limit="emits('update:limit', $event)" />
</template>

<style lang="scss" scoped></style>
