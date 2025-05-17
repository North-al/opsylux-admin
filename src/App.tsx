import './assets/vue.svg'
import BasicLayout from './layout/BasicLayout.vue'

export default function App() {
	return (
		<BasicLayout>
			{/* 这里可以放置路由出口或主内容 */}
			<div>
				<a href='https://vite.dev' target='_blank'>
					<img src='/vite.svg' class='logo' alt='Vite logo' />
				</a>
				<a href='https://vuejs.org/' target='_blank'>
					<img src='./assets/vue.svg' class='logo vue' alt='Vue logo' />
				</a>
			</div>
		</BasicLayout>
	)
}
