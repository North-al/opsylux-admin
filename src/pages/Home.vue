<template>
	<div>
		<SchemaSearchForm v-model="searchParams" :schema="mySearchSchema" @search="handleSearch" @reset="handleReset" />
		<p>当前搜索参数:</p>
		<pre>{{ JSON.stringify(searchParams, null, 4) }}</pre>
	</div>
</template>

<script setup lang="ts">
	import type { SearchFormData, SearchFormSchema } from '~/components/SchemaSearchForm/type' // 导入需要的类型

	const mySearchSchema: SearchFormSchema = [
		{
			key: 'keyword',
			label: '关键词',
			type: 'input',
			placeholder: '请输入关键词',
			props: {
				clearable: true,
				type: 'password'
			}
		},
		{
			key: 'status',
			label: '状态',
			type: 'select',
			placeholder: '请选择状态',
			options: [
				{ label: '全部', value: '' },
				{ label: '启用', value: 1 },
				{ label: '禁用', value: 0 }
			],
			props: {
				clearable: true,
				filterable: true
			}
		},
		{
			key: 'category',
			label: '分类',
			type: 'cascader',
			placeholder: '请选择分类',
			options: [
				{
					value: 'electronic',
					label: '电子产品',
					children: [
						{
							value: 'phone',
							label: '手机'
						},
						{
							value: 'computer',
							label: '电脑'
						}
					]
				},
				{
					value: 'clothing',
					label: '服装',
					children: [
						{
							value: 'men',
							label: '男装'
						},
						{
							value: 'women',
							label: '女装'
						}
					]
				}
			],
			props: {
				props: { expandTrigger: 'hover', multiple: true }
			}
		},
		{
			key: 'startDate',
			label: '开始日期',
			type: 'date',
			placeholder: '请选择开始日期',
			valueFormat: 'YYYY-MM-DD',
			props: {
				clearable: true
			}
		},
		{
			key: 'publishTime',
			label: '发布时间',
			type: 'datetime',
			placeholder: '请选择发布时间',
			valueFormat: 'YYYY-MM-DD HH:mm:ss',
			props: {
				clearable: true
			}
		},
		{
			key: 'createTimeRange',
			label: '创建时间',
			type: 'datetimerange',
			placeholder: '请选择时间范围',
			valueFormat: 'YYYY-MM-DD HH:mm:ss',
			props: {
				clearable: true
			}
		}
	]

	// 搜索参数，使用 ref 确保响应性，并通过 v-model 绑定到 SchemaSearchForm
	const searchParams = ref<SearchFormData>({
		status: 1,
		createTimeRange: ['2025-05-21 00:00:00', '2025-06-15 00:00:00']
	})

	// 处理查询事件
	const handleSearch = (params: SearchFormData) => {
		console.log('执行搜索，参数:', params)
		// 在这里执行你的搜索逻辑，通常会调用 API
		// 注意：createTimeRange 的值将是一个包含两个字符串（或 null）的数组
	}

	// 处理重置事件
	const handleReset = () => {
		console.log('表单已重置')
		// 重置逻辑已经在组件内部处理，这里可以执行额外的重置操作
	}
</script>
