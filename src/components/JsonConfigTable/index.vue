<script setup lang="tsx" generic="T = any">
    import type { ElTable } from 'element-plus'
    import Sortable from 'sortablejs'

    const attrs = useAttrs()
    const emits = defineEmits()

    const tableEventAttrs = computed(() => {
        const events = Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith('on')))
        return {
            ...events
        }
    })

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
        selectable = () => true,
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
        selectable?: (row: T, index: number) => boolean
        tableProps?: Partial<InstanceType<typeof ElTable>['$props']>
    }>()

    const tableSelectRow = computed(() => {
        if (selectionMode === 'radio') {
            return {
                'highlight-current-row': true
            }
        }

        return {}
    })

    const columnSettings = ref(
        columns.map(col => ({
            ...col,
            visible: true,
            fixed: col.fixed ?? false // 确保默认是 false
        }))
    )

    const visibleColumns = computed(() => {
        return columnSettings.value.filter(col => col.visible)
    })

    const toggleFixed = (col: Column<T>, direction: 'left' | 'right') => {
        if (col.fixed === direction) {
            col.fixed = false
        } else {
            col.fixed = direction
        }
    }

    const popoverVisible = ref(false)
    const sortableListRef = ref<HTMLElement>()
    let sortable: Sortable | null = null

    const initSortable = () => {
        // 避免重复初始化
        if (sortable || !sortableListRef.value) return

        sortable = Sortable.create(sortableListRef.value, {
            animation: 150,
            handle: '.drag-handle',
            filter: '.fixed-column',
            preventOnFilter: true,
            onEnd(evt) {
                const oldIndex = evt.oldIndex!
                const newIndex = evt.newIndex!
                const movedItem = columnSettings.value.splice(oldIndex, 1)[0]
                columnSettings.value.splice(newIndex, 0, movedItem)
            }
        })
    }
</script>

<template>
    <div class="w-full">
        <!-- <div class="flex justify-between items-center mb-2">
            <slot name="toolbar">
                <div></div>
            </slot>
        </div> -->
        <el-table
            v-bind="{ ...tableProps, ...tableSelectRow, ...tableEventAttrs }"
            :data="data"
            v-loading="loading"
            :total="total"
            :selection-mode="selectionMode">
            <el-table-column
                v-if="selectionMode === 'checkbox'"
                :reserve-selection="true"
                type="selection"
                :selectable="selectable"
                width="55">
            </el-table-column>
            <template v-for="column in visibleColumns" :key="column.prop">
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
            <el-table-column align="right" fixed="right">
                <template #header>
                    <el-popover
                        placement="bottom-end"
                        trigger="click"
                        width="220"
                        v-model:visible="popoverVisible"
                        @show="initSortable">
                        <template #reference>
                            <el-button text icon>
                                <el-icon><setting /></el-icon>
                            </el-button>
                        </template>

                        <div ref="sortableListRef" class="space-y-2 max-h-80 overflow-auto">
                            <div
                                v-for="(col, index) in columnSettings"
                                :key="col.prop"
                                class="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                                <div class="flex items-center gap-2">
                                    <el-icon class="drag-handle cursor-move">
                                        <Menu />
                                    </el-icon>
                                    <el-checkbox v-model="col.visible">{{ col.label }}</el-checkbox>
                                </div>
                                <!-- 固定列操作 -->
                                <div class="flex items-center gap-1 text-gray-500">
                                    <el-tooltip content="左固定" placement="top">
                                        <el-icon
                                            :class="[
                                                'cursor-pointer fixed-column',
                                                col.fixed === 'left' ? 'text-blue-500' : 'text-gray-400'
                                            ]"
                                            @click="toggleFixed(col, 'left')">
                                            <Fold />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip content="右固定" placement="top">
                                        <el-icon
                                            :class="[
                                                'cursor-pointer fixed-column',
                                                col.fixed === 'right' ? 'text-blue-500' : 'text-gray-400'
                                            ]"
                                            @click="toggleFixed(col, 'right')">
                                            <Expand />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-if="showPagination" v-model:page="page" v-model:limit="limit" :total="total" />
    </div>
</template>

<style lang="scss" scoped>
    .drag-handle {
        cursor: move;
        pointer-events: auto; // ✨ 确保鼠标事件生效
    }
</style>
