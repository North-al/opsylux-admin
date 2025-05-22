<script setup lang="tsx">
    import { fetchUserList } from '~/api/module/menu'
    const list = ref([])
    const total = ref(0)
    const page = ref(1)
    const limit = ref(10)
    const loadData = () => {
        fetchUserList({ page: page.value, limit: limit.value })
            .then(res => {
                list.value = res.data.data.records
                total.value = res.data.data.total
                console.log(list.value)
            })
            .catch(err => {
                console.error(err)
            })
    }

    loadData()

    const handleEdit = row => {
        console.log('Edit:', row)
    }

    const columns = ref([
        {
            prop: 'username',
            label: 'username',
            width: 180
        },
        {
            prop: 'email',
            label: 'email',
            width: 300
        },
        {
            prop: 'phone',
            label: 'phone',
            width: 300
        },
        {
            // 编辑
            label: '操作',
            width: 200,
            render: row => {
                return (
                    <>
                        <el-button type='primary' size='small' onClick={() => handleEdit(row)}>
                            编辑
                        </el-button>
                        <el-button type='danger' size='small' onClick={() => handleEdit(row)}>
                            删除
                        </el-button>
                    </>
                )
            }
        }
    ])

    const handleSelectionChange = (selection: any) => {
        console.log('Selected rows:', selection)
    }

    const handleCurrentChange = (val: any) => {
        console.log(val)
    }
</script>

<template>
    <div>
        <json-config-table
            selection-mode="radio"
            :selectable="(row: any) => [1, 6, 7, 9].includes(row.id)"
            :columns="columns"
            :data="list"
            :total="total"
            v-model:page="page"
            v-model:limit="limit"
            :table-props="{ rowKey: 'id' }"
            @current-change="handleCurrentChange">
            <!-- @selection-change="handleSelectionChange" -->

            <template #phone="{ scope }">
                <el-tag type="primary">{{ scope.row.phone }}</el-tag>
            </template>
        </json-config-table>
    </div>
</template>

<style lang="scss" scoped></style>
