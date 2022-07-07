/**
 * <Modal
 *   v-model="showModal"     // 显示/隐藏
 *   :closable="false"       // 是否显示右上角的关闭按钮，无标题此值无效。默认true
 *   :maskClosable="false"   // 是否允许点击遮罩层关闭。默认true
 *   title="标题"            // 标题
 *   okText="确定"           // 确定按钮
 *   @ok="handleOk"          // 点击确定的回调
 *   cancelText="取消"       // 取消按钮
 *   @cancel="handleCancel"  // 点击取消的回调
 *   @visibleChange="handleVisibleChange"    // 显示状态发生变化时触发，返回值 true / false
 *   width="80%"             // 默认弹窗宽度80%
 *   align="top"             // 对齐窗口，默认垂直左右居中。可选择值：全屏'fullscreen', 上对齐'top', 'right', 'bottom', 'left', 右上角对齐'top right'（两个组合）
 * >内容</
 */
<template>
  <div v-show="visible" class="modal" :class="align" @click="handleMask">
    <div class="scroll" :style="{ width: width, 'margin-top': top }">
      <div class="modal-content" @click.stop>
        <div v-if="title" class="modal-header">
          {{ title }}
          <div v-if="closable" class="modal-close" @click="close"><TimesIcon class="close-icon"/></div>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div v-if="okText || cancelText" class="modal-footer">
          <Button v-if="okText" class="btn" theme="white" @click="ok">{{ okText }}</Button>
          <Button v-if="cancelText" class="btn" theme="white" @click="cancel">{{ cancelText }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button'
import TimesIcon from './icons/Times'

export default {
  name: 'Modal',
  components: { Button, TimesIcon },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '80%'
    },
    title: String,
    okText: String,
    cancelText: String,
    align: String,
    top: String
  },
  data () {
    return {
      visible: this.value,
      bodyOverflow: ''
    }
  },
  watch: {
    value (val) {
      this.visible = val
      if (val) {
        this.bodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = this.bodyOverflow
      }
    },
    visible (val) {
      this.$emit('visibleChange', val)
    },
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('input', false)
      this.$emit('cancel')
    },
    handleMask () {
      if (this.maskClosable) {
        this.close()
      }
    },
    ok () {
      this.$emit('ok')
    },
    cancel () {
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 4100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 750px;
  height: 100vh;
  background: rgba(0, 0, 0, .3);
  overflow: hidden;

  &.top {
    align-items: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  &.bottom {
    align-items: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
  &.right.left {
    .scroll {
      width: 100% !important;
      .modal-content {
        border-radius: 0;
        min-width: 100%;
      }
    }
  }
  &.fullscreen {
    .scroll {
      width: 100% !important;
      height: 100% !important;

      .modal-content {
        border-radius: 0;
        min-width: 100%;
        min-height: 100%;
      }
    }
  }
}

.scroll {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

.modal-content {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 15px;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #d8d8d8;
  line-height: 90px;
  text-align: center;
  color: #333;
  border-radius: 15px 15px 0 0;

  & + .modal-body {
    border-radius: 0;
  }
}

.modal-close {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 90px;
  height: 90px;
  justify-content: center;
  align-items: center;
  z-index: 4101;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.close-icon {
  width: 28px;
  height: 28px;
}

.modal-body {
  flex-grow: 1;
  padding: 25px 45px;
  background: #fff;
  border-radius: 15px 15px 0 0;
}

.modal-footer {
  display: flex;
  align-items: stretch;
  height: 110px;
  border-top: 1px solid #d8d8d8;
  border-radius: 0 0 15px 15px;
  overflow: hidden;

  .btn {
    border-radius: 0;
    flex: 1 1 50%;
    height: auto;

    & + .btn {
      border-left: 1px solid #d8d8d8;
    }
  }
}
</style>
