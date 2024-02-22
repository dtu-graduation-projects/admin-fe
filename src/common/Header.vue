<template>
    <div>
        <vue-confirm-dialog></vue-confirm-dialog>
        <ul class="new_menu change">
            <div @click="$router.push('/home')" v-show="!changeHeader" class="new_menu__name"><img src="" /></div>
            <div @click="$router.push('/home')" v-show="changeHeader" class="new_menu__name"><img src="" /></div>
            <li class="new_menu__item">
                <a class="main" href="#">
                    <span class="">HI</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
  data() {
    return {
    };
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  created() {

  },
  computed: {},
  methods: {
    clickButton() {
      this.showMenu = !this.showMenu;
    },
    goChild(number, item, event) {
      if (this.step != number) {
        this.step = number;
      } else {
        this.step = null;
      }
      if (event.type == 'click') {
        if (item.children.length == 0) {
          this.goRouter(item)
        }
      }
    },
    // Toggle if navigation is shown or hidden
    onScroll() {
      if (window.pageYOffset < 0) {
        return
      }
      this.changeHeader = window.pageYOffset < 0
    },
  },
};
</script>

<style scoped>
.change {
  background-color: #0A3045;
  transition: height 1s, background-color 1s, transform 1s;
  height: 80px !important;
}

.change .new_menu__item,
.change .new_menu__name,
.change .new_menu__menu {
  color: white;
}

.change .new_menu__item a,
.change .new_menu__name a,
.change .new_menu__menu a {
  color: white;
}

.new_menu__item {
  position: relative;
}

.new_menu__item .nav__link {
  height: 100%;
  display: flex;
  align-items: center;
}

.new_menu__item--child {
  position: absolute;
  top: 75px;
  background-color: #000;
  width: 150px;
  padding: 10px;
  text-align: left;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 2px;
}

.new_menu__item--child p {
  color: #fff f;
  padding: 0px;
  margin: 5px;
}

.hoverAni {
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 1s;
}

.layout-cart {
  flex-direction: row !important;
}

.new_menu {
  display: flex;
  width: 100%;
  column-gap: 30px;
  align-content: center;
  height: 110px;
  transition: height 0.5s, background-color 0.5s, transform 0.5s;
  color: black;
  font-size: 18px;
}

.new_menu__name {
  position: fixed;
  align-self: center;
  left: 55px;
  cursor: pointer;
}

.new_menu__name img {
  width: 250px;
  margin-left: -70%;
}

.new_menu__cart {
  position: fixed;
  align-self: center;
  right: 55px;
  cursor: pointer;
}

.new_menu__cart img {
  width: 100px;
  margin-top: -15px;
}

.new_menu__name:hover {
  color: var(--success) !important;
}

.new_menu__icon {
  display: none;
  position: fixed;
  align-self: center;
  left: 55px;
  cursor: pointer;
}

.new_menu__item {
  min-width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.new_menu__item :hover {
  color: var(--success) !important;
}

.new_menu__item a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}

.new_menu__item .main {
  font-size: 40px;
  font-weight: 600;
  margin: 0 20px;
}

.new_menu__item :hover+.hoverAni {
  width: 100%;
  transition: width 1s;
}

.new_menu__menu {
  position: fixed;
  align-self: center;
  right: 55px;
  cursor: pointer;
}

.new_menu__menu__container {
  position: fixed;
  width: 100%;
  top: 74px;
  right: 0;
  background: #000;
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
}

.new_menu__menu__container__item {
  width: 100%;
  padding: 10px 0px;
  border-bottom: 2px solid gray;
}

.new_menu__menu__container__item .mb-child {
  background-color: #000;
  padding: 10px 10px 5px;
}

.new_menu__menu__container__item .mb-child p {
  color: #fff;
  margin-bottom: 10px;
}

.new_menu__menu__container :hover {
  color: var(--success) !important;
}

.new_menu__menu__container__close {
  position: absolute;
  right: 10px;
  top: 10px;
}

.new_menu__menu__container {
  transition: max-height 5s ease-out;
  overflow: hidden;
  max-height: 0;
}

#my-collapse.visible {
  max-height: 200px;
  transition: max-height 5s ease-in;
}

@media (max-width: 1620px) {
  .change {
    height: 75px !important;
  }

  .new_menu {
    height: 90px;
    column-gap: 10px;
    font-size: 16px;
  }

  .new_menu .main {
    font-size: 30px;
    font-weight: 600;
  }

  .new_menu__name {
    left: 30px;
  }
}

@media (max-width: 1310px) {
  .mobile {
    display: block !important;
    margin: auto;
  }

  .b-icon:hover {
    color: var(--success) !important;
  }

  .layout-cart {
    display: block !important;
  }

  .new_menu {
    color: white;
    background-color: black;
  }

  .new_menu__name img {
    /* content: url("@/assets/white_logo2.png"); */
  }

  .new_menu__cart {
    right: 110px;
  }

  .new_menu__item {
    display: none;
  }

  .new_menu__item a {
    color: white;
  }
}

@media (max-width: 700px) {
  .layout-cart a:first-child {
    display: none;
  }
}

@media (max-width: 550px) {
  .new_menu__name {
    left: 15px;
  }

  .new_menu__menu {
    right: 15px;
  }
}

@media (max-width: 450px) {
  .new_menu__name {
    display: none;
  }

  .new_menu__icon {
    display: block;
    left: 15px;
  }

  .new_menu__cart {
    right: 40px;
  }
}
</style>
