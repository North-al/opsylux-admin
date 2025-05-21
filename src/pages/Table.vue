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

    const columns = ref([
        {
            prop: 'username',
            label: 'username',
            width: 180
            // render: (row: any) => {
            //     return <span>{row.username}</span>
            // }
        },
        {
            prop: 'email',
            label: 'email',
            width: 300
            // render: (row: any) => {
            //     return <span>{row.age}</span>
            // }
        },
        {
            prop: 'phone',
            label: 'phone',
            width: 300
        }
    ])
</script>

<template>
    <div>
        <json-config-table :columns="columns" :data="list" :total="total" v-model:page="page" v-model:limit="limit">
        </json-config-table>
    </div>
</template>

<style lang="scss" scoped></style>
