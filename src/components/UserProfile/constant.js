// 用户信息表单配置
export const FIELDS = [
  {
    name: 'mainInfo',
    className: 'main-info',
    items: [
      {
        name: 'avatar',
        type: 'img',
        extra: {
          placeholder: '请上传头像',
          hideLabel: true,
        },
      },
      {
        label: '昵称',
        name: 'nickname',
        type: 'input',
        extra: {
          placeholder: '请输入昵称',
          hideLabel: true,
          showLabelInEditMode: true,
        },
      },
    ],
    extra: {
      hideLabel: true,
    },
  },
  {
    label: '基本信息',
    name: 'baseInfo',
    className: 'base-info',
    items: [
      {
        label: '生日',
        name: 'birthday',
        type: 'date',
        extra: {
          placeholder: '请选择生日',
        },
      },
      {
        name: 'poster',
        type: 'img',
        label: '封面',
        extra: {
          placeholder: '请上传封面',
        },
      },
    ],
  },
  {
    label: '联系方式',
    name: 'contactInfo',
    className: 'contact-info',
    items: [
      {
        label: '邮箱',
        name: 'email',
        type: 'input',
        extra: {
          placeholder: '请输入邮箱',
        },
      },
      {
        label: '手机号',
        name: 'phone',
        type: 'input',
        extra: {
          placeholder: '请输入手机号',
        },
      },
      {
        label: '地址',
        name: 'address',
        type: 'input',
        extra: {
          placeholder: '请输入地址',
        },
      },
    ],
  },
];
