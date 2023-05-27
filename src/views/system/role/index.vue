<script setup lang="ts">
import { useUser } from "./hook";
import { useGroupList, useEditGroup } from "./use-group";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import RoleDetail from "./role-detail.vue";
import RoleEdit from "./role-edit.vue";
import { ref } from "vue";
defineOptions({
  name: "User"
});
const { loading, columns, dataList, onSearch } = useUser();

/**
 * 分组列表所需数据
 */
const { getAllGroups, handleDelete } = useGroupList(onSearch);

/**
 * 编辑分组信息
 */
const {
  form,
  rules,
  group,
  resetForm,
  handleEdit,
  confirmEdit,
  handleClose,
  dialogFormVisible
} = useEditGroup(getAllGroups, onSearch);

const dialogFormVisible2 = ref(false);
const dialogFormVisible3 = ref(false);
const roleDetail = ref();
const roleEdit = ref();
const groupId = ref();
const creatRole = async () => {
  dialogFormVisible2.value = true;
};
const handleClose2 = async done => {
  roleDetail.value.resetForm();
  onSearch();
  done();
};

const finish1 = async () => {
  onSearch();
  dialogFormVisible2.value = false;
  dialogFormVisible3.value = false;
};
const handleClose3 = async done => {
  onSearch();
  done();
};
const handleEdit2 = async id => {
  dialogFormVisible3.value = true;
  groupId.value = id;
};
</script>

<template>
  <div class="main">
    <div class="w-full">
      <PureTableBar title="角色管理" :columns="columns" @refresh="onSearch">
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="creatRole()"
          >
            新增角色
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            border
            align-whole="center"
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataList"
            :columns="dynamicColumns"
            :header-cell-style="{
              background: 'var(--el-table-row-hover-bg-color)',
              color: 'var(--el-text-color-primary)'
            }"
          >
            <template #operation="{ row }">
              <el-button
                plain
                size="small"
                type="primary"
                @click="handleEdit(row)"
                >信息</el-button
              >
              <el-button
                plain
                size="small"
                type="info"
                @click="handleEdit2(row.id)"
                >权限</el-button
              >
              <el-button
                plain
                size="small"
                type="danger"
                @click="handleDelete(row.id)"
                >删除</el-button
              >
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>

    <!-- 分组信息 -->
    <el-dialog
      title="分组信息"
      :append-to-body="true"
      v-model="dialogFormVisible"
      :before-close="handleClose"
    >
      <div style="margin-top: -25px">
        <el-form
          ref="form"
          status-icon
          :rules="rules"
          :model="group"
          label-width="120px"
          v-if="dialogFormVisible"
          style="margin-left: -35px; margin-bottom: -35px; margin-top: 15px"
        >
          <el-form-item label="分组名称" prop="name">
            <el-input clearable v-model="group.name" />
          </el-form-item>
          <el-form-item label="分组描述" prop="info">
            <el-input clearable v-model="group.info" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer" style="padding-left: 5px">
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
          <el-button @click="resetForm">重 置</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加 -->
    <el-dialog
      title="添加角色"
      :append-to-body="true"
      v-model="dialogFormVisible2"
      :before-close="handleClose2"
    >
      <div style="margin-top: -25px" v-if="dialogFormVisible2">
        <RoleDetail ref="roleDetail" @finish="finish1" />
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      title="修改角色"
      :append-to-body="true"
      v-model="dialogFormVisible3"
      :before-close="handleClose3"
    >
      <div style="margin-top: -25px" v-if="dialogFormVisible3">
        <RoleEdit ref="roleEdit" :groupId="groupId" @finish="finish1" />
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
