interface SysMenu {
	createdAt: string
	updatedAt: string
	id: number
	menuTitle: string
	parentId: number
	path: string
	component: string
	routeName: string
	menuType: number
	isFrame: number
	isHidden: number
	isCache: number
	status: number
	permission: string
	icon: string
	children: SysMenu[]
}
