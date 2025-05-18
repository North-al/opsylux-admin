import { fetchMenuTree } from '~/api/module/menu'

export default defineComponent({
	name: 'Aside',
	props: {
		isCollapse: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const menuList = reactive<SysMenu[]>([])

		const loadMenuTree = async () => {
			const { data } = await fetchMenuTree()
			Object.assign(menuList, data.data)
		}

		// 渲染菜单项内容
		const renderMenuContent = (menu: SysMenu) => (
			<>
				<el-icon class='menu-icon'>{h(resolveComponent(menu.icon || 'Menu'))}</el-icon>
				<span class='menu-title'>{menu.menuTitle}</span>
			</>
		)

		// 递归渲染菜单项组件
		const MenuItems = (menu: SysMenu) => {
			if (menu.children?.length) {
				return (
					<el-sub-menu
						index={String(menu.id)}
						popperClass='menu-popper'
						teleported={false}
						v-slots={{
							title: () => renderMenuContent(menu)
						}}>
						{menu.children.map(item => MenuItems(item))}
					</el-sub-menu>
				)
			}

			return <el-menu-item index={String(menu.id)}>{renderMenuContent(menu)}</el-menu-item>
		}

		onMounted(() => {
			loadMenuTree()
		})

		return () => (
			<div class='h-[calc(100%-56px)]'>
				<el-scrollbar>
					<el-menu default-active='1' collapse={props.isCollapse} collapseTransition={false}>
						{menuList.map(menu => MenuItems(menu))}
					</el-menu>
				</el-scrollbar>
			</div>
		)
	}
})
