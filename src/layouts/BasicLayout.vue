<script lang="tsx">
	import { useTheme } from '~/hooks/useTheme'
	import Aside from './components/Aside'
	import LOGO from '~/assets/Logo.png'

	export default defineComponent({
		name: 'BasicLayout',
		setup(_, { slots }) {
			// 控制侧边栏折叠状态
			const isCollapse = ref(false)
			// 主题状态
			const { theme, toggleTheme } = useTheme()

			// 切换侧边栏折叠状态
			const toggleCollapse = () => {
				isCollapse.value = !isCollapse.value
			}

			return () => (
				<el-container class='h-screen'>
					{/* 侧边栏 */}
					<el-aside
						width={isCollapse.value ? '64px' : '240px'}
						class='transition-width duration-300 ease-in-out bg-[var(--bg-menu)]'>
						{/* Logo */}
						<div class='h-14 flex items-center px-4 border-b border-[var(--border-menu)]'>
							<img src={LOGO} class='w-12 h-12' />
							<h1
								class={`ml-2 text-sm font-semibold truncate transition-all duration-300 text-[var(--text-primary)] ${
									isCollapse.value ? 'opacity-0 w-0' : 'opacity-100 w-32'
								}`}>
								Opsylux Admin
							</h1>
						</div>

						{/* 菜单 */}
						<Aside isCollapse={isCollapse.value} />
					</el-aside>

					{/* 主容器 */}
					<el-container class='h-full'>
						{/* 头部 */}
						<el-header class='h-14 px-4 border-b border-[var(--border-base)] bg-[var(--bg-header)] flex items-center justify-between transition-colors duration-300'>
							<div class='flex items-center gap-2'>
								<el-button
									class='!flex !items-center !justify-center !w-8 !h-8 !p-0 rounded-full hover:bg-[var(--bg-menu-hover)]'
									text
									onClick={toggleCollapse}>
									<el-icon class='text-lg'>{isCollapse.value ? <expand /> : <fold />}</el-icon>
								</el-button>
								<el-button
									class='!flex !items-center !justify-center !w-8 !h-8 !p-0 rounded-full hover:bg-[var(--bg-menu-hover)]'
									text>
									<el-icon class='text-lg'>
										<refresh />
									</el-icon>
								</el-button>
							</div>

							<div class='flex items-center gap-2'>
								<el-button
									class='!flex !items-center !justify-center !w-8 !h-8 !p-0 rounded-full hover:bg-[var(--bg-menu-hover)]'
									text
									onClick={toggleTheme}>
									<el-icon class='text-lg'>{theme.value === 'dark' ? <sunny /> : <moon />}</el-icon>
								</el-button>
								<el-dropdown
									v-slots={{
										dropdown: () => (
											<el-dropdown-menu>
												<el-dropdown-item>
													<el-icon>
														<setting />
													</el-icon>
													<span>设置</span>
												</el-dropdown-item>
												<el-dropdown-item divided>
													<el-icon>
														<switch-button />
													</el-icon>
													<span>退出登录</span>
												</el-dropdown-item>
											</el-dropdown-menu>
										)
									}}>
									<div class='flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer hover:bg-[var(--bg-menu-hover)]'>
										<el-avatar
											size={28}
											src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
										/>
										<span class='text-sm text-[var(--text-primary)]'>Admin</span>
										<el-icon class='text-sm'>
											<caret-bottom />
										</el-icon>
									</div>
								</el-dropdown>
							</div>
						</el-header>

						{/* 内容区域 */}
						<el-main class='bg-[var(--bg-base)]'>{slots.default?.()}</el-main>
					</el-container>
				</el-container>
			)
		}
	})
</script>

<style lang="scss" scoped>
	.el-aside {
		border-right: 1px solid var(--border-color);
	}

	.el-dropdown-menu {
		.el-dropdown-item {
			padding: 4px 16px !important;

			.el-icon {
				margin-right: 8px;
			}
		}
	}

	// 下拉菜单暗黑模式
	:deep(.dropdown-menu-dark) {
		background-color: var(--bg-elevated) !important;
		border-color: var(--border-color) !important;

		.el-dropdown-menu__item {
			color: var(--text-secondary) !important;

			&:not(.is-disabled):hover {
				background-color: var (--bg-menu-hover) !important;
				color: var(--text-primary) !important;
			}

			&.el-dropdown-menu__item--divided {
				border-top-color: var(--border-color) !important;
			}
		}
	}
</style>
