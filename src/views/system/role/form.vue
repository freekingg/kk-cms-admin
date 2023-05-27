<script setup lang="ts">
import { ref, reactive } from "vue";

interface FormProps {
  formInline: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    status: number;
    groupIds: any;
  };
  allGroups: any[];
  isEdited: boolean;
}
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    groupIds: "",
    status: 1
  }),
  allGroups: () => [],
  isEdited: false
});

/** 表单规则校验 */
const checkUserName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("用户名不能为空"));
  }
  callback();
};
/**
 * 验证密码
 */
const validatePassword = (rule, value = "", callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 6) {
    callback(new Error("密码长度不能少于6位数"));
  } else {
    callback();
  }
};
/**
 * 再次验证密码
 */
const validatePassword2 = (rule, value = "", callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== newFormInline.value.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const formRules = reactive({
  password: [{ validator: validatePassword, trigger: "blur", required: true }],
  username: [
    { validator: checkUserName, trigger: ["blur", "change"], required: true }
  ],
  confirmPassword: [
    { validator: validatePassword2, trigger: "blur", required: true }
  ]
});

const ruleFormRef = ref();
const ruleFormPwdRef = ref();
const activeTab = ref(0);

const newFormInline = ref(props.formInline);
const groups = ref(props.allGroups);

function getUserInfoRef() {
  return ruleFormRef.value;
}

function getPwdRef() {
  return ruleFormPwdRef.value;
}

defineExpose({ getUserInfoRef, getPwdRef, activeTab });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="newFormInline.username"
        clearable
        :disabled="isEdited"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入邮箱"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password" v-if="!isEdited">
      <el-input
        v-model="newFormInline.password"
        clearable
        auto-complete="new-password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword" v-if="!isEdited">
      <el-input
        v-model="newFormInline.confirmPassword"
        clearable
        type="password"
        auto-complete="new-password"
        placeholder="请输入确认密码"
      />
    </el-form-item>
    <el-form-item label="选择分组">
      <el-checkbox-group
        v-model="newFormInline.groupIds"
        size="small"
        style="transform: translateY(5px)"
      >
        <el-checkbox
          v-for="item in groups"
          :key="item.id"
          :label="item.id"
          border
          style="margin-left: 0"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>
