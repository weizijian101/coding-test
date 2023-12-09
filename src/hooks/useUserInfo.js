import { ref } from 'vue';

import useIndexedDB from '@/hooks/useIndexedDB.js'; // 引入 useIndexedDB

const DEFAULT_IMG = '/src/components/UserProfile/assets/default_avatar.svg';

const DEFAULT_USER_INFO = {
  avatar: '', // 默认头像
  poster: '', // 默认封面
  nickname: '奥特曼', // 默认昵称
  email: 'ultraman.@example.com', // 默认邮箱
  phone: '18888888888', // 默认手机号
  address: 'M78星云 大白村', // 默认地址
  birthday: '2000-01-01', // 默认生日
};

// todo: 扩展属性结构，在结构内判断
const imgTypeList = ['avatar', 'poster'];

const useUserInfo = () => {
  const userInfo = ref({ ...DEFAULT_USER_INFO });

  const { storeImg, getImg } = useIndexedDB();

  // 加载用户信息，不包括图片
  const loadUserInfo = async () => {
    const savedUserInfo = localStorage.getItem('userInfo');

    if (savedUserInfo) {
      // imgTypeList 类型从getImg中获取
      const tempUserInfo = {
        ...userInfo.value,
        ...JSON.parse(savedUserInfo),
      };

      // 使用await getImg imgTypeList
      for (const imgType of imgTypeList) {
        try {
          const imgData = await getImg(imgType);
          tempUserInfo[imgType] = imgData.img;
        } catch (error) {
          console.log(error);
        }
      }

      userInfo.value = tempUserInfo;
    } else {
      for (const imgType of imgTypeList) {
        userInfo.value[imgType] = DEFAULT_IMG;
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
    }
  };

  // 更新用户信息，图片单独处理
  const updateUserInfo = async (updatedInfo) => {
    const storeUserInfo = {};
    Object.keys(updatedInfo).forEach(async (key) => {
      if (imgTypeList.includes(key)) {
        await storeImg(key, updatedInfo[key]);
      } else {
        storeUserInfo[key] = updatedInfo[key];
      }
    });

    localStorage.setItem('userInfo', JSON.stringify(storeUserInfo));
  };

  loadUserInfo();

  return { userInfo, updateUserInfo };
};

export default useUserInfo;
