<template>
  <div
    :class="
      cx('info-item', {
        'edit-mode-item': editMode,
      })
    ">
    <Transition :duration="500" name="info-label">
      <div v-if="showLabel" class="info-label">
        {{ label }}
      </div>
    </Transition>

    <div class="info-value">
      <!-- 图片类型可上传 -->
      <template v-if="type === 'img'">
        <div class="field-item-img-block">
          <img :src="value" alt="" />
          <Transition name="uploader" :duration="500">
            <div v-if="editMode" class="field-item-uploader">
              <input :id="`upload-${name}`" type="file" @change="afterRead" accept="image/*" />
              <label :for="`upload-${name}`" class="inner">
                <div class="tip"></div>
              </label>
            </div>
          </Transition>
        </div>
      </template>

      <!-- input类型 -->
      <template v-if="type === 'input'">
        <div
          class="field-item-input-div"
          :contenteditable="editMode"
          :placeholder="extra.placeholder"
          @input="(e) => onChange(e.target.innerText)">
          {{ value }}
        </div>
        <Transition name="editable-tag" :duration="500">
          <div v-if="editMode" class="editable-tag"></div>
        </Transition>
      </template>

      <!-- date类型 -->
      <template v-if="type === 'date'">
        <label :for="`datepicker-${name}`">
          {{ value }}
        </label>
        <Transition name="date" :duration="500">
          <input
            v-if="editMode"
            class="field-item-date-picker"
            :id="`datepicker-${name}`"
            type="date"
            :placeholder="placeholder"
            :value="value"
            @input="(e) => onChange(e.target.value)" />
        </Transition>

        <Transition name="editable-tag" :duration="500">
          <div v-if="editMode" class="editable-tag"></div>
        </Transition>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

import cx from 'classnames';

const props = defineProps({
  editMode: Boolean,
  label: String,
  value: String,
  type: String,
  onChange: Function,
  extra: Object,
  name: String,
});

const showLabel = computed(() => {
  if (!props.label) return false;
  if (props.extra && props.extra.hideLabel) {
    if (!props.editMode) return false;
    if (props.extra.showLabelInEditMode) return true;
  }

  return true;
});

// 图片转为base64，存储本地
const afterRead = (e) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    props.onChange(e.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
};
</script>

<script>
export default {
  name: 'ProfileItem',
};
</script>

<style lang="less" scoped>
.info-item {
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .info-label {
    flex: 0 0 auto;
    width: 60px;
    color: var(--font-color2);
    font-weight: 700;
    margin-right: 10px;
    text-align: justify;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: -20px;
    height: 20px;
    overflow: hidden;
    transform: translateX(0);

    &::after {
      content: '';
      display: inline-block;
      width: 100%;
    }

    &.info-label-enter-active,
    &.info-label-leave-active {
      transition: all 0.5s ease-in-out;
    }

    &.info-label-enter-from,
    &.info-label-leave-to {
      margin-right: 0;
      width: 0;
    }
  }

  .info-value {
    flex: 1 1 auto;
    text-align: left;
    position: relative;
    overflow: hidden;
    color: var(--font-color2);

    .field-item-uploader {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      input {
        display: none;
      }

      .inner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .tip {
          background-color: var(--main-color2);
          opacity: 0.7;
          height: 50%;
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100% 100% 0 0;
          background-image: url('./assets/choose-pic.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 30px 30px;
        }
      }

      &.uploader-enter-active,
      &.uploader-leave-active {
        * {
          transition: all 0.5s ease-in-out;
        }
      }

      &.uploader-enter-from,
      &.uploader-leave-to {
        .inner {
          .tip {
            top: 100%;
          }
        }
      }
    }

    .field-item-input-div {
      outline: none;

      &[contenteditable='true']:empty:before {
        content: attr(placeholder);
        pointer-events: none;
        display: block;
        color: var(--font-color2);
        opacity: 0.6;
        font-size: 12px;
      }
    }

    .field-item-img-block {
      width: 200px;
      height: 200px;
      position: relative;
      overflow: hidden;
      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .editable-tag {
      width: 100%;
      height: 0;
      border-bottom: 0.5px solid var(--main-color2);
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateX(0);

      &.editable-tag-enter-active,
      &.editable-tag-leave-active {
        transition: all 0.5s ease-in-out;
      }

      &.editable-tag-enter-from,
      &.editable-tag-leave-to {
        transform: translateX(-100%);
      }
    }

    .field-item-date-picker {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-color2);
      border: none;
      color: var(--font-color2);
      padding: 0;
      outline: none;
      box-sizing: border-box;
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      font-family: inherit;

      &.date-enter-active,
      &.date-leave-active {
        transition: all 0.5s ease-in-out;
      }

      &.date-enter-from,
      &.date-leave-to {
        left: -100%;
        right: -100%;
      }
    }
  }

  &.edit-mode-item {
    .info-value {
      font-weight: 400 !important;
      color: var(--font-color2) !important;

      .field-item-input-div {
        width: auto !important;
      }
    }
  }
}

.info-item + .info-item {
  margin-top: 14px;
}
</style>
