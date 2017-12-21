<template>
  <transition name="fade">
    <div class="modal align-baseline" v-if="isActive" :class="{ 'is-active': isActive }">
      <div class="modal-background" v-if="backdrop" @click="backdropClose"></div>
      <transition :name="transition">
        <div class="modal-card" :style="modalWidth" v-show="isActive">
        <header class="modal-card-head" v-if="showHeader">
          <slot name="header">
            <p class="modal-card-title">{{ title }}</p>
            <span class="close" style="cursor: pointer" @click="handleCancel">×</span>
          </slot>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <footer class="modal-card-foot-wrapper" style="background-color: white" v-if="showFooter">
          <div class="foot-wrapper">
            <slot name="footer">
              <el-button  @click="handleCancel" v-if="showCancel">{{ cancelText }}</el-button>
              <el-button type="primary" :class="{'is-loading': isLoading}" @click="handleOk" v-if="showOk">{{ okText }}</el-button>
            </slot>
          </div>
        </footer>
      </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'tk-modal',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        okText: {
            type: String,
            default: '提交'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        onOk: {
            type: Function,
            default () {}
        },
        onCancel: {
            type: Function,
            default () {
                return function () {
                    this.isActive = false
                }
            }
        },
        backdrop: {
            type: Boolean,
            default: true
        },
        backdropClosable: {
            type: Boolean,
            default: true
        },
        okLoading: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 640
        },
        showOk: {
            type: Boolean,
            default: true
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'fade'
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            isActive: false,
            isLoading: false
        }
    },

    computed: {
        modalWidth () {
            if (this.width !== 640 && this.width !== 0) {
                return {width: `${this.width}px`}
            }
            return null
        }
    },

    methods: {
        active () {
            this.isActive = true
        },
        handleOk () {
            if (this.okLoading) {
                this.isLoading = true
                this.onOk()
            } else {
                this.onOk()
                this.handleClose()
            }
        },
        handleCancel () {
            this.onCancel()
            this.handleClose()
        },
        handleClose () {
            this.$emit('close')
        },
        backdropClose () {
            if (this.backdropClosable) {
                this.handleCancel()
            }
        }
    },

    watch: {
        isShow (val) {
            this.isActive = val
            if (!val && this.isLoading) {
                this.isLoading = false
            }
        }
    },

    mounted () {
        this.$nextTick(() => {
            document.body.appendChild(this.$el)
            if (this.isShow) {
                this.active()
            }
        })
    },

    beforeDestroy () {
        this.$el.remove()
    }
}
</script>
<style scoped lang="scss">
  .modal.is-active {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .modal{
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1050;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: none;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    .modal-background {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      background-color: hsla(0,0%,4%,.86);
    }
    .modal-card {
      display: flex;
      z-index: 1;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      max-height: calc(100vh - 40px);
      overflow: hidden;
      .modal-card-head {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #f5f5f5;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-shrink: 0;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        padding: 20px;
        position: relative;
        border-bottom: 1px solid #dbdbdb;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        .modal-card-title {
          color: #363636;
          -webkit-box-flex: 1;
          flex-grow: 1;
          flex-shrink: 0;
          font-size: 1.2rem;
          line-height: 1;
        }
        .close {
          font-style: inherit;
          font-weight: inherit;
        }
      }
      .modal-card-body {
        background-color: #fff;
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
        padding: 20px;
      }
      .modal-card-foot-wrapper {
        position: relative;
        padding: 10px 20px;
        height: 56px;
        border-top: 1px solid #ccc;
        border-radius: 0 0 5px 5px;
        .foot-wrapper {
          display: inline-block;
          position: absolute;
          right: 20px;
          a {
            margin-left: 10px;
          }
        }
      }
    }
  }
  @media print, screen and (min-width: 769px) {
    .modal-card, .modal-content {
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      width: 640px;
    }
  }

</style>
