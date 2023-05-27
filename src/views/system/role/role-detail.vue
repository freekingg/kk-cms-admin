<script>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AdminModel from "@/api/admin";
import { ElMessage } from "element-plus";
import GroupPermissions from "./group-permission.vue";

export default {
  components: {
    GroupPermissions
  },
  setup(props, ctx) {
    /**
     * 表单验证规则
     */
    const { rules } = getRules();

    // originally data properties
    const form = ref(null);
    const groupPermissions = ref(null);

    const loading = ref(false);
    const router = useRouter();
    const permissions = ref([]);
    const allPermissions = ref([]);
    const group = reactive({ name: "", info: "" });

    /**
     * 重置表单
     */
    const resetForm = () => {
      form.value.resetFields();
      groupPermissions.value.getGroupPermissions();
    };

    /**
     * 提交表单
     * 添加新的分组
     */
    const submitForm = async () => {
      form.value.validate(async valid => {
        if (valid) {
          let res = {};
          const finalPermissions = permissions.value.filter(
            x => Object.keys(allPermissions.value).indexOf(x) < 0
          );
          try {
            loading.value = true;
            res = await AdminModel.createOneGroup(
              group.name,
              group.info,
              finalPermissions
            );
            console.log(res);
            ElMessage.success(`${res.message}`);
            resetForm();
          } catch (e) {
            loading.value = false;
            console.error(e);
          }
          loading.value = false;
          ctx.emit("finish");
        } else {
          ElMessage.error("请将信息填写完整");
        }
      });
    };

    /**
     * 编辑后的最终权限
     */
    const updatePermissions = picked => {
      permissions.value = picked;
    };

    return {
      form,
      rules,
      group,
      loading,
      resetForm,
      submitForm,
      groupPermissions,
      updatePermissions
    };
  }
};

function getRules() {
  const checkName = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("分组名称不能为空"));
    }
    callback();
  };
  const rules = {
    info: [],
    name: [
      { validator: checkName, trigger: ["blur", "change"], required: true }
    ]
  };
  return { rules };
}
</script>

<template>
  <div class="main">
    <div class="w-full px-10 py-6 bg-bg_color">
      <el-form
        ref="form"
        status-icon
        :rules="rules"
        :model="group"
        label-position="right"
        label-width="100px"
        v-loading="loading"
        @submit.prevent
      >
        <el-form-item label="分组名称" prop="name">
          <el-input clearable v-model="group.name" />
        </el-form-item>
        <el-form-item label="分组描述" prop="info">
          <el-input clearable v-model="group.info" />
        </el-form-item>
        <el-form-item>
          <group-permissions
            title="分配权限"
            ref="groupPermissions"
            @updatePermissions="updatePermissions"
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('form')"
            >保 存</el-button
          >
          <el-button @click="resetForm('form')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
