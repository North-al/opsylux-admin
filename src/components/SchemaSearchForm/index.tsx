// src/components/SchemaSearchForm.tsx

import type {
	SearchFormSchema,
	SearchFormData,
	// InputFormItemSchema,
	SelectFormItemSchema,
	CascaderFormItemSchema,
	DateFormItemSchema,
	DateTimeFormItemSchema,
	DateTimeRangeFormItemSchema
} from './type' // 根据你的文件路径调整

export default defineComponent({
	name: 'SchemaSearchForm',
	props: {
		// 表单 schema 配置
		schema: {
			type: Array as PropType<SearchFormSchema>,
			required: true
		},
		// v-model 绑定的表单数据
		modelValue: {
			type: Object as PropType<SearchFormData>,
			default: () => ({})
		},
		// 表单项标签宽度
		labelWidth: {
			type: String,
			default: 'auto'
		},
		// 是否显示查询和重置按钮
		showActions: {
			type: Boolean,
			default: true
		},
		// 查询按钮文本
		searchText: {
			type: String,
			default: '查询'
		},
		// 重置按钮文本
		resetText: {
			type: String,
			default: '重置'
		},
		// 每行显示的表单项数量
		itemsPerRow: {
			type: Number,
			default: 4,
			validator: (val: number) => val > 0 && 24 % val === 0 // 确保大于 0 且能被 24 整除
		},
		// 是否默认展开
		defaultExpanded: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		'update:modelValue', // 用于 v-model 双向绑定
		'search', // 点击查询按钮时触发
		'reset' // 点击重置按钮时触发
	],
	setup(props, { emit }) {
		// 将 chunkArray 助手函数移动到 setup 函数内部
		const chunkArray = <T extends any>(array: T[], size: number): T[][] => {
			const result: T[][] = []
			for (let i = 0; i < array.length; i += size) {
				result.push(array.slice(i, i + size))
			}
			return result
		}

		// 内部使用的表单数据，通过 reactive 确保响应性
		const formData = reactive<SearchFormData>({})
		// 展开/收起状态，默认根据 props.defaultExpanded 初始化
		const isExpanded = ref(props.defaultExpanded)

		// 根据 schema 和 modelValue 初始化 formData
		const initializeFormData = () => {
			props.schema.forEach(item => {
				// 如果 modelValue 中存在对应 key 的值，则使用它，否则根据类型设置默认值
				if (props.modelValue && props.modelValue[item.key] !== undefined) {
					formData[item.key] = props.modelValue[item.key]
				} else {
					// 设置默认值 based on type
					switch (item.type) {
						case 'select':
						case 'cascader':
							formData[item.key] = undefined // select 和 cascader 默认使用 undefined
							break
						case 'datetimerange':
							formData[item.key] = [] // 初始化范围选择器为空数组
							break
						default:
							formData[item.key] = null // 其他类型默认 null
					}
				}
			})
		}

		watch(
			() => props.modelValue,
			newValue => {
				// 简单检查以避免如果父组件使用相同的值更新导致无限循环
				// 对于复杂嵌套对象，可能需要更强大的深比较库
				if (JSON.stringify(newValue) !== JSON.stringify(formData)) {
					initializeFormData()
				}
			},
			{ immediate: true, deep: true }
		)

		// 监听内部 formData 的变化，并触发 update:modelValue 事件以实现 v-model 双向绑定
		watch(
			formData,
			newValue => {
				emit('update:modelValue', newValue)
			},
			{ deep: true }
		)

		// 处理查询按钮点击
		const handleSearch = () => {
			emit('search', formData)
		}

		// 处理重置按钮点击
		const handleReset = () => {
			const resetData: SearchFormData = {}
			props.schema.forEach(item => {
				switch (item.type) {
					case 'select':
					case 'cascader':
						resetData[item.key] = undefined
						break
					case 'datetimerange':
						resetData[item.key] = []
						break
					default:
						resetData[item.key] = null
				}
			})
			Object.assign(formData, resetData)
			emit('reset')
		}

		// 切换展开/收起状态
		const toggleExpand = () => {
			isExpanded.value = !isExpanded.value
		}

		// 计算属性：根据展开状态获取可见的 schema 项目
		const visibleSchema = computed(() => {
			return isExpanded.value ? props.schema : props.schema.slice(0, props.itemsPerRow)
		})

		// 渲染单个表单控件 (Input, Select, DatePicker etc.)
		const renderFormControl = (item: SearchFormSchema[number]): JSX.Element | null => {
			const { key, type, props: itemProps = {}, placeholder } = item

			const commonProps: Record<string, any> = {
				// 根据类型设置默认占位文本，如果 schema 中没有提供
				placeholder:
					placeholder ||
					`请${type.includes('date') || type === 'select' || type === 'cascader' ? '选择' : '输入'}${
						item.label
					}`,
				modelValue: formData[key], // 绑定 modelValue
				'onUpdate:modelValue': (value: any) => {
					// 监听 update:modelValue 事件更新数据
					formData[key] = value
				},
				style: { width: '100%' } // 默认宽度 100% 以填充父容器 (ElCol)
			}

			// 为支持 clearable 的类型添加 default clearable: true，除非用户显式设置为 false
			const supportsClearable = ['input', 'select', 'cascader', 'date', 'datetime', 'datetimerange'].includes(
				type
			)
			if (supportsClearable && itemProps.clearable !== false) {
				commonProps.clearable = true
			}
			// 允许用户显式设置 clearable: false
			if (itemProps.clearable === false) {
				commonProps.clearable = false
			}

			// 合并用户传入的额外 props，用户 props 优先（注意 cascader 的 'props' 需要特殊处理）
			const userProvidedProps = { ...itemProps }
			// 提取 cascader 特有的 'props' 对象
			const cascaderSpecificProps = userProvidedProps.props
			delete userProvidedProps.props // 从 userProvidedProps 中移除 'props'

			Object.assign(commonProps, userProvidedProps) // 合并剩余的用户 props

			switch (type) {
				case 'input':
					return <el-input {...commonProps} />
				case 'select':
					const selectItem = item as SelectFormItemSchema
					return (
						<el-select {...commonProps}>
							{selectItem.options.map(option => (
								<el-option
									key={option.value}
									label={option.label}
									value={option.value}
									disabled={option.disabled}
								/>
							))}
						</el-select>
					)
				case 'cascader':
					const cascaderItem = item as CascaderFormItemSchema
					// 将 cascader 特有的 props 作为单独的 props 传递
					return <el-cascader {...commonProps} options={cascaderItem.options} props={cascaderSpecificProps} />

				case 'date':
				case 'datetime':
				case 'datetimerange':
					const datePickerItem = item as
						| DateFormItemSchema
						| DateTimeFormItemSchema
						| DateTimeRangeFormItemSchema
					const datePickerProps: Record<string, any> = {
						...commonProps,
						type: type, // 动态设置类型
						// 使用 item 的 valueFormat 如果提供，否则使用默认值
						valueFormat:
							datePickerItem.valueFormat || (type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')
					}

					// 处理范围选择器特有的 props 和 modelValue
					if (type === 'datetimerange') {
						datePickerProps.startPlaceholder = itemProps.startPlaceholder || '开始时间'
						datePickerProps.endPlaceholder = itemProps.endPlaceholder || '结束时间'
						datePickerProps.rangeSeparator = itemProps.rangeSeparator || '-'
						datePickerProps.modelValue = Array.isArray(formData[key]) ? formData[key] : []
					}

					return <el-date-picker {...datePickerProps} />

				default:
					console.warn(`Unsupported form item type: ${type}`)
					return null
			}
		}

		return () => {
			const itemsPerRow = props.itemsPerRow
			const colSpan = 24 / itemsPerRow // 计算每个表单项占据的栅格列数

			// 将可见的 schema 项目按行分块
			const visibleSchemaRows = chunkArray(visibleSchema.value, itemsPerRow)

			return (
				// 使用 inline 属性让表单项水平排列，结合 ElRow/ElCol 实现栅格布局
				<el-form model={formData} inline label-width={props.labelWidth}>
					{visibleSchemaRows.map((rowItems, rowIndex) => (
						<el-row gutter={20} key={`row-${rowIndex}`} style={{ alignItems: 'center' }}>
							{rowItems.map(item => (
								<el-col span={colSpan} key={item.key}>
									<el-form-item label={item.label} style={{ marginRight: 0, width: '100%' }}>
										{renderFormControl(item)}
									</el-form-item>
								</el-col>
							))}
						</el-row>
					))}

					{/* 始终在新的行中渲染查询和重置按钮 (如果 showActions 为 true) */}
					{/* 这样处理可以简化逻辑，并且在展开/收起状态下都能确保按钮可见 */}
					{props.showActions && (
						<el-row gutter={20}>
							{/* 按钮独占一行，占据全部 24 列，并右对齐 */}
							<el-col span={24} style={{ textAlign: 'right' }}>
								<el-button link type='primary' onClick={toggleExpand}>
									{isExpanded.value ? '收起' : '展开'}
									{/* 使用动态组件渲染图标 */}
									<el-icon style={{ verticalAlign: 'middle', marginLeft: '4px' }}>
										{/* 假设 ArrowUp 和 ArrowDown 图标组件通过自动导入可用 */}
										{isExpanded.value ? <arrow-up /> : <arrow-down />}
									</el-icon>
								</el-button>
								{/* 搜索按钮添加默认的搜索图标 */}
								<el-button type='primary' onClick={handleSearch} icon={<search />}>
									{' '}
									{/* 假设 Search 图标组件通过自动导入可用 */}
									{props.searchText}
								</el-button>
								<el-button onClick={handleReset}>{props.resetText}</el-button>
							</el-col>
						</el-row>
					)}
				</el-form>
			)
		}
	}
})
