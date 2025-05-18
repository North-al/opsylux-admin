<script lang="tsx">
	import Aside from './components/Aside'

	// 控制侧边栏折叠状态
	const isCollapse = ref(false)

	// 切换侧边栏折叠状态
	const toggleCollapse = () => {
		isCollapse.value = !isCollapse.value
	}

	export default defineComponent({
		name: 'BasicLayout',
		setup(_, { slots }) {
			return () => (
				<el-container class='h-screen'>
					<el-aside
						width={isCollapse.value ? '64px' : '200px'}
						class='!bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-300 ease-in-out border-r border-gray-700'>
						{/* 顶部 Logo */}
						<div class='flex items-center justify-between h-14 px-4 text-white border-b border-gray-700'>
							<h1
								class={`text-xl font-bold truncate transition-all ${
									isCollapse.value ? 'w-0 invisible' : 'w-32'
								}`}>
								Opsylux Admin
							</h1>
							<el-button type='text' onClick={toggleCollapse} class='hover:bg-gray-700 rounded-full p-2'>
								<el-icon class='text-white text-xl'>{isCollapse.value ? <expand /> : <fold />}</el-icon>
							</el-button>
						</div>
						{/* 侧边栏菜单 */}
						<div class='overflow-y-auto hover:overflow-y-overlay'>
							<Aside isCollapse={isCollapse.value}></Aside>
						</div>
					</el-aside>

					<el-container>
						{/* 顶部导航 */}
						<el-header class='bg-white border-b border-gray-200 p-0'>
							<div class='flex items-center justify-between h-full px-4'>
								<div class='flex items-center gap-2'>
									<el-breadcrumb>
										<el-breadcrumb-item>首页</el-breadcrumb-item>
										<el-breadcrumb-item>系统管理</el-breadcrumb-item>
									</el-breadcrumb>
								</div>
								<div class='flex items-center gap-4'>
									<el-button circle>
										{/* <el-icon>
												<i-ep-refresh />
											</el-icon> */}
									</el-button>
									<el-dropdown
										trigger='click'
										v-slots={{
											dropdown: () => (
												<el-dropdown-menu>
													<el-dropdown-item>
														{/* <el-icon>
																<i-ep-user />
															</el-icon> */}
														个人中心
													</el-dropdown-item>
													<el-dropdown-item>
														{/* <el-icon>
																<i-ep-edit />
															</el-icon> */}
														修改密码
													</el-dropdown-item>
													<el-dropdown-item divided>
														{/* <el-icon>
																<i-ep-switch-button />
															</el-icon> */}
														退出登录
													</el-dropdown-item>
												</el-dropdown-menu>
											)
										}}>
										<div class='flex items-center gap-2 cursor-pointer'>
											<el-avatar
												size='small'
												src='https://avatars.githubusercontent.com/u/499550'
											/>
											<span>Admin</span>
											{/* <el-icon class='mt-1'>
													<i-ep-arrow-down />
												</el-icon> */}
										</div>
									</el-dropdown>
								</div>
							</div>
						</el-header>

						{/* 主内容区 */}
						<el-main class='bg-gray-100 p-4'>
							{slots?.default ? slots.default() : <div>欢迎使用 Opsylux Admin</div>}
						</el-main>
					</el-container>
				</el-container>
			)
		}
	})
</script>

<template>
	<el-button tag=""></el-button>
</template>

<style lang="scss" scoped>
	:deep(.el-menu) {
		border-right: none;
		background-color: transparent;

		.el-menu-item,
		.el-sub-menu__title {
			@apply text-gray-300 px-4 h-12 leading-12 transition-all duration-200;

			&:hover {
				@apply bg-gray-700 text-white rounded-md;
			}

			&.is-active {
				@apply bg-blue-600 text-white font-semibold rounded-md;
			}

			.el-icon {
				margin-right: 8px;
			}
		}
	}

	:deep(.el-sub-menu__title .el-icon) {
		transition: transform 0.2s ease;
	}

	:deep(.el-sub-menu__title:hover .el-icon) {
		transform: scale(1.1);
	}
</style>
