<template>
  <div
    :class="
      cx('user-profile font-size-tag', {
        'small-screen': isSmallScreen,
        'large-screen': !isSmallScreen,
        'edit-mode': editMode,
      })
    ">
    <div class="operations">
      <div class="left">
        <Transition name="scroll-left" :duration="500">
          <i v-if="editMode" class="operate-btn back-btn" @click="cancelEdit" />
        </Transition>
      </div>

      <div class="right">
        <i
          :class="
            cx('operate-btn edit-btn', {
              'save-btn': editMode,
            })
          "
          @click="onClickEdit" />
      </div>
    </div>

    <div v-for="fieldSection in FIELDS" :class="cx('info-section', fieldSection.className)" :key="fieldSection.name">
      <Transition name="hide" :duration="500">
        <div v-if="!editMode && (!fieldSection.extra || !fieldSection.extra.hideLabel)" class="section-title">
          {{ fieldSection.label }}
        </div>
      </Transition>

      <ProfileItem
        v-for="field in fieldSection.items"
        :class="field.name"
        :name="field.name"
        :key="field.name"
        :editMode="editMode"
        :label="field.label"
        :value="userInfo[field.name]"
        :extra="field.extra"
        :type="field.type"
        @change="handleFieldChange(field.name, $event)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import cx from 'classnames';

import useScreenSize from '@/hooks/useScreenSize.js';
import useUserInfo from '@/hooks/useUserInfo.js';
import ProfileItem from './ProfileItem.vue';
import { FIELDS } from './constant.js';

const { isSmallScreen } = useScreenSize();
const { userInfo, updateUserInfo } = useUserInfo();

const editMode = ref(false);
// 备份用户信息，用于取消编辑
let userInfoBackup = { ...userInfo.value };

const onClickEdit = () => {
  if (editMode.value) {
    saveEdit();
  } else {
    goEditMode();
  }
};

const goEditMode = () => {
  userInfoBackup = { ...userInfo.value };

  editMode.value = true;
};

const cancelEdit = () => {
  if (JSON.stringify(userInfoBackup) !== JSON.stringify(userInfo.value)) {
    if (!window.confirm('确定放弃编辑吗？')) {
      return;
    }
  }

  userInfo.value = { ...userInfoBackup };

  editMode.value = false;
};

const saveEdit = () => {
  editMode.value = false;

  updateUserInfo(userInfo.value);
};

const handleFieldChange = (fieldName, value) => {
  userInfo.value[fieldName] = value;
};
</script>

<script>
export default {
  name: 'UserProfile',
};
</script>

<style lang="less" scoped>
.user-profile {
  font-size: 10px;
  * {
    transition: all 0.5s ease-in-out;
  }
  .operations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .left {
      position: absolute;
      left: 30px;
      top: 30px;
      z-index: 1;
    }

    .right {
      position: absolute;
      right: 30px;
      top: 30px;
      z-index: 1;
    }

    .operate-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fff;
      color: #fff;
      cursor: pointer;
      transition: all 0.5s ease;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgba(6, 231, 216, 0.3);
      box-shadow: 0px 2px 2px 0px rgba(108, 215, 216, 0.6) inset, 0px -2px 2px 0px rgba(39, 137, 139, 0.7) inset,
        0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      transform: translateX(0);
      display: block;
    }

    .back-btn {
      background-image: url('./assets/back-icon.svg');
    }

    .edit-btn {
      background-image: url('./assets/edit-icon.svg');
    }

    .save-btn {
      background-image: url('./assets/save-icon.svg');
    }

    .scroll-left-enter-active,
    .scroll-left-leave-active {
      transition: all 0.5s ease-in-out;
    }

    .scroll-left-enter-from,
    .scroll-left-leave-to {
      transform: translateX(calc(-100% - 40px));
    }
  }

  .info-section {
    padding: 20px 20px;
    margin-top: 30px;
    background-color: var(--bg-color2);
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;

    .section-title {
      border-bottom: 0.5px solid #e0e0e0;
      color: var(--font-color2);
      text-transform: uppercase;
      letter-spacing: 16px;
      margin: 0 0 10px;
      font-size: 24px;
      text-align: left;
      padding-bottom: 5px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;

      &.hide-enter-active,
      &.hide-leave-active {
        transition: all 0.5s ease-in-out;
      }

      &.hide-leave-from,
      &.hide-enter-to {
        opacity: 1;
        height: 30px;
        margin: 0 0 10px;
        padding-bottom: 5px;
      }

      &.hide-enter-from,
      &.hide-leave-to {
        opacity: 0;
        height: 0;
        margin-bottom: 0;
        padding: 0;
      }
    }

    &.main-info {
      // 头像区样式定制

      &:before {
        content: '';
        display: block;
        top: 20px;
        right: 20px;
        left: 20px;
        height: 200px;
        background: linear-gradient(to right, #0d6e6e, #4a9d9c);
        position: absolute;
        border-radius: 20px;
      }

      .avatar {
        width: 50%;
        padding-bottom: 50%;
        border-radius: 50%;
        height: 0;
        overflow: hidden;
        position: relative;
        border: 10px solid var(--bg-color2);
        box-sizing: content-box;
        margin: 80px auto 0;
        position: relative;
        background-color: var(--bg-color2);

        ::v-deep {
          .info-value {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            .field-item-img-block {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
      ::v-deep {
        .nickname {
          .info-value {
            font-weight: 700;
            color: var(--font-color1);
            letter-spacing: 2px;
            overflow: visible;
            margin: 0;
            height: 20px;

            * {
              transition: all 0.5s ease-in-out;
            }
            .field-item-input-div {
              width: fit-content;
              position: absolute;
              left: 50%;
              transform: translateX(-50%) scale(2);
            }
          }

          &.edit-mode-item {
            .info-value {
              .field-item-input-div {
                width: fit-content;
                position: absolute;
                left: 0;
                transform: translateX(0) scale(1);
              }
            }
          }
        }
      }
    }
  }

  .info-section + .info-section {
    margin-top: 28px;
  }

  &.edit-mode {
    .info-section + .info-section {
      margin-top: 0;
    }

    .info-section {
      border-radius: 0;
      margin-bottom: 0;
      padding: 0 20px 14px;

      &:last-child {
        border-radius: 0 0 10px 10px;
      }
    }

    .main-info {
      border-radius: 10px 10px 0 0;

      ::v-deep {
        .nickname {
          .info-value {
            margin-bottom: 0;
            margin-top: 0;
            font-size: 16px;
          }
        }
        .info-label {
          display: block;
        }
      }
    }
  }

  &.large-screen {
    display: grid;
  }
}

// 标记给postcss转换单位插件使用
.font-size-tag {
  font-size: 16px;
}

.font-size-tag.large-screen {
  font-size: 6px;
}

.large-screen {
  display: grid;
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;

  .operations {
    .left {
      top: 20px;
    }

    .right {
      top: 20px;
    }
  }

  .info-section {
    margin: 0 !important;
    border-radius: 10px !important;
    position: relative;
    overflow: scroll;

    &.main-info {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 3;

      &:before {
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 100%;
        box-sizing: content-box;
        height: 0;
      }

      .avatar {
        width: 60%;
        padding-bottom: 60%;
        border-radius: 50%;
        height: 0;
        left: 50%;
        top: 0;
        transform: translate(-50%, calc(15px + 20%));
        margin: 0;
        position: absolute;
      }
      ::v-deep {
        .nickname {
          .info-value {
            transition: all 0.5s ease-in-out;
            margin-top: 40px;
          }
        }
      }
    }
  }

  &.edit-mode {
    .info-section {
      border-radius: 10px !important;
      padding: 40px 20px 14px;

      &.main-info {
        ::v-deep {
          .nickname {
            .info-value {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
