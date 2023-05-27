<script setup lang="ts">
import { useUser } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "User"
});

const { loading, columns, dataList, onSearch, openDialog, handleDelete } =
  useUser();
</script>

<template>
  <div class="main">
    <div class="w-full">
      <PureTableBar title="用户管理" :columns="columns" @refresh="onSearch">
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增用户
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
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="openDialog(row)"
                :icon="useRenderIcon(EditPen)"
              >
                修改
              </el-button>
              <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
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
