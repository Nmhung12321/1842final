<template>
  <div class="ui blue inverted segment navbar">
    <div class="ui grid middle aligned">
      <!-- Logo -->
      <div class="four wide column center aligned">
        <img 
        src="../assets/logo.png" 
        alt="Vocab Learning Logo" 
        class="ui mini centered image"
        />
        <strong>Vocab Learning</strong>
      </div>

      <!-- Navbar -->
      <div class="eight wide column center aligned computer tablet only">
        <div class="ui large blue inverted secondary menu compact">
          <router-link v-for="(item, index) in navItems" :to="item.to" :key="index" class="item">
            <i :class="`${item.icon} icon`"></i> {{ item.name }}
          </router-link>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="three wide column right floated mobile only sidebar-container">
        <button class="ui icon inverted button" @click="toggleSidebar">
          <i class="sidebar icon"></i>
        </button>

        <!-- Sidebar Menu -->
        <transition name="sidebar-slide">
          <div v-if="isVisibled" class="ui vertical teal inverted menu sidebar-custom" @click="closeSidebar">
            <router-link v-for="(item, index) in navItems" :to="item.to" :key="index" class="item">
              <i :class="`${item.icon} icon`"></i> {{ item.name }}
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isVisibled: false,
      navItems: [
        {
          name: 'Words',
          to: '/words',
          icon: 'comment outline'
        },
        {
          name: 'Categories',
          to: '/categories',
          icon: 'bookmark'
        },
        {
          name: 'New',
          to: '/new',
          icon: 'plus circle'
        },
        {
          name: 'Test',
          to: '/test',
          icon: 'graduation cap icon'
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isVisibled = !this.isVisibled;
    },
    closeSidebar() {
      this.isVisibled = false;
    }
  }
}
</script>

<style scoped>
div.navbar {
  padding: 1.5em;
  margin-bottom: 1.5em;
}

.sidebar-container {
  position: relative;
}

.sidebar-slide-enter {
  transform: translateX(100%);
}
.sidebar-slide-enter-activate, .sidebar-slide-leave-activate {
  transition: transform 0.3s ease;
}
.sidebar-slide-enter-to {
  transform: translateX(0%);
}
.sidebar-slide-leave-to {
  transform: translateX(100%);
}

.sidebar-custom {
  position: absolute;
  top: 1;
  right: 0;
  width: 150px;
  z-index: 1000;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 1rem 0;
}
</style>