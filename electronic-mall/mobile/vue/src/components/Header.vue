<template>
  <header :class="{ 'mini-header': isMini }">
    <div class="fixed">
      <div class="menu">
        <router-link to="tabnav">
          <MenuIcon class="menu-icon" />
        </router-link>
        <router-link v-if="!isLogin" :to="{ name: 'login' }" class="login">登录</router-link>
        <div v-if="isLogin" class="user-icon" @click="handleShowUserNav">
          <UserIcon class="icon"/>
        </div>
      </div>
      <div class="logo">EMALL</div>
      <router-link class="search" to="search">
        <SearchIcon class="search-icon"/>
        <span class="search-text">搜索商品、品牌</span>
      </router-link>
    </div>
    <UserNav v-model="showUserNav" />
  </header>
</template>

<script>
import Cookies    from 'js-cookie'
import MenuIcon   from '@/components/icons/Menu'
import SearchIcon from '@/components/icons/Search'
import UserIcon   from '@/components/icons/User'
import UserNav    from '@/components/UserNav'

export default {
  name: 'Header',
  data() {
    return {
      isMini: false,
      isLogin: false,
      showUserNav: false
    }
  },
  components: {
    MenuIcon,
    SearchIcon,
    UserIcon,
    UserNav
  },
  methods: {
    toggle () {
      this.isMini = window.pageYOffset > 100
    },
    handleShowUserNav () {
      this.showUserNav = true
    }
  },
  created () {
    this.isLogin = Cookies.get('token')
  },
  mounted () {
    window.addEventListener('scroll', this.toggle)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.toggle)
  },
}
</script>


<style lang="scss" scoped>
  header {
    height: 182px;
  }
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 20px;
    width: 750px;
    background-color: rgb(255, 0, 54);
    transition: transform 300ms ease;
    transform: translateY(0);
    z-index: 1000;
  }
  .menu {
    position: absolute;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 88px;
    transition: transform 300ms ease;
    transform: translateY(0);
  }
  .menu-icon {
    width: 60px;
    height: 60px;
    color: #fff;
  }
  .login {
    font-size: 28px;
    color: #fff;
  }
  .logo {
    display: flex;
    align-items: center;
    height: 88px;
    font-size: 36px;
    color: #fff;
    transition: transform 300ms ease;
    transform: scale(1);
  }
  .search {
    display: flex;
    align-items: center;
    border-radius: 8px;
    width: 710px;
    height: 72px;
    background-color: #fff;
    transition: transform 300ms ease;
    transform: scaleX(1);
  }
  .search-icon {
    margin: 20px;
    width: 29px;
    height: 32px;
    color: #999;
    transition: transform 300ms ease;
    transform: scaleX(1);
  }
  .search-text {
    font-size: 28px;
    color: rgba(0, 0, 0, 0.5);
    transition: transform 300ms ease;
    transform: scaleX(1);
  }
  .mini-header {
    .fixed {
      transform: translateY(-64px);
    }
    .menu {
      transform: translateY(78px);
    }
    .logo {
      transform: scale(0);
    }
    .search {
      transform: scaleX(0.8);
    }
    .search-icon {
      transform: scaleX(1.25) translateX(8px);
    }
    .search-text {
      transform: scaleX(1.25) translateX(35px);
    }
  }
  .user-icon {
    width: 60px;
    height: 60px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: #fff;
    .icon {
      width: 60px;
      height: 60px;
    }
  }
</style>
