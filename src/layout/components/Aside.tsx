import { fetchMenuTree } from '~/api/module/menu'

export default defineComponent({
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
			console.log(menuList)
		}

		// 递归渲染菜单项组件
		const MenuItems = (menu: SysMenu) => {
			if (menu.children && menu.children.length > 0) {
				return (
					<el-sub-menu
						index={String(menu.id)}
						v-slots={{
							title: () => (
								<>
									<el-icon> {h(resolveComponent(menu.icon || 'Menu'))}</el-icon>
									<span>{menu.menuTitle}</span>
								</>
							)
						}}>
						{menu.children.map(item => MenuItems(item))}
					</el-sub-menu>
				)
			}
			return (
				<el-menu-item index={String(menu.id)}>
					<el-icon>{h(resolveComponent(menu.icon || 'Menu'))}</el-icon>
					<span>{menu.menuTitle}</span>
				</el-menu-item>
			)
		}

		onMounted(() => {
			loadMenuTree()
		})

		return () => (
			<el-menu
				default-active='1'
				class='h-[calc(100%-56px)]'
				collapse={props.isCollapse}
				background-color='#111827'
				text-color='#fff'>
				{menuList.map(menu => MenuItems(menu))}
			</el-menu>
		)
	}
})
