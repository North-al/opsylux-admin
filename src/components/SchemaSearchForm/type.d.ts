import type { DatePickerProps, InputProps, SelectProps, CascaderInstance } from 'element-plus'

type FormItemType = 'input' | 'select' | 'cascader' | 'date' | 'datetime'

interface SelectOption {
	label: string
	value: any
	disabled?: boolean
}

interface CascaderOption {
	value: any
	label: string
	children?: CascaderOption[]
	disabled?: boolean
}

// 通用的表单项 Schema 接口
interface BaseFormItemSchema {
	key: string // 绑定数据的键名
	label: string // 表单项标签
	type: FormItemType // 表单项类型
	placeholder?: string // 占位文本
	props?: Record<string, any> // 直接传递给 Element Plus 组件的额外 props
}

type OmitKeys = 'modelValue' | 'placeholder'
interface InputFormItemSchema extends BaseFormItemSchema {
	type: 'input'
	props?: Partial<Omit<InputProps, OmitKeys>>
}

interface SelectFormItemSchema extends BaseFormItemSchema {
	type: 'select'
	options: SelectOption[] // Select 选项
	props?: Partial<Omit<SelectProps, OmitKeys>>
}

interface CascaderFormItemSchema extends BaseFormItemSchema {
	type: 'cascader'
	options: CascaderOption[] // Cascader 选项
	props?: Partial<Omit<CascaderInstance['$props'], OmitKeys>>
	// props?: Partial<Omit<ElCascader['$props'], OmitKeys>>
}

// 定义 DatePicker (Date) 类型的 Schema
interface DateFormItemSchema extends BaseFormItemSchema {
	type: 'date'
	props?: Partial<Omit<DatePickerProps, OmitKeys>> // 可以更具体地指定 DatePicker 的 props
	valueFormat?: string // 日期格式，默认为 'YYYY-MM-DD'
}

// 定义 DateTimePicker (Datetime) 类型的 Schema
interface DateTimeFormItemSchema extends BaseFormItemSchema {
	type: 'datetime'
	props?: Partial<Omit<DatePickerProps, OmitKeys>> // 可以更具体地指定 DateTimePicker 的 props
	valueFormat?: string // 日期时间格式，默认为 'YYYY-MM-DD HH:mm:ss'
}

// 定义 DateTimeRange 类型的 Schema
interface DateTimeRangeFormItemSchema extends BaseFormItemSchema {
	type: 'datetimerange'
	props?: Partial<Omit<DatePickerProps, OmitKeys>> // 可以指定 start-placeholder, end-placeholder, range-separator 等 props
	valueFormat?: string // 日期时间范围的格式，默认为 'YYYY-MM-DD HH:mm:ss'
}

// 定义整个搜索表单的 Schema 类型
export type SearchFormSchema = (
	| InputFormItemSchema
	| SelectFormItemSchema
	| CascaderFormItemSchema
	| DateFormItemSchema
	| DateTimeFormItemSchema
	| DateTimeRangeFormItemSchema
)[]

// 定义表单数据类型
export interface SearchFormData {
	[key: string]: any
}
