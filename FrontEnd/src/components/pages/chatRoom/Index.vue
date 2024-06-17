<template>
	<div class="main">
		<div class="menu-box">
			<Menu 
				:user="user"
				:currentPath="currentPath"
				@navigateMenu="navigateMenu"
			/>
		</div>
		<div class="full-box">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import { ref  } from 'vue';
import Menu from './menu/Menu.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default  {
  name: 'ChatRoom',
	components: {
    Menu,
  },
	setup() {
		const currentPath = ref('chats');
    const store = useStore();
    const user = store.state.user;
		const router = useRouter();

		const navigateMenu = (path: string) => {
			router.push(`/chat-room/${path}`);
		};

    return {
			currentPath, 
			user,
			navigateMenu
		};
  },

}
</script>

<style scoped lang="scss">
.main {
	display: flex;
	height: 100vh;
	.menu-box {
		width: 300px;
    min-width: 300px;
		@media(max-width: 960px) {
			min-width: auto;
			width: 50px;
		}
	}

	.full-box {
		width: calc(100% - 280px);
    background-color: #fff;
    border-radius: 30px;
    position: absolute;
    z-index: 9999;
    left: 270px;
    height: 100%;
		@media(max-width: 960px) {
			left: 50px;
			width: calc(100% - 50px);
		}
	}
}
</style>
