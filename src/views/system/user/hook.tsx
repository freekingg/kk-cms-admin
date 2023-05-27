import dayjs from "dayjs";
import { message } from "@/utils/message";
import { getAllGroups } from "@/api/system";
import UserModel from "@/api/user";
import AdminModel from "@/api/admin";

import editForm from "./form.vue";
import { addDialog } from "@/components/ReDialog";
import { ref, computed, onMounted, h } from "vue";
export function useUser() {
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const allGroups = ref([]);
  const columns: TableColumnList = [
    {
      label: "用户名称",
      prop: "username",
      minWidth: 130
    },
    {
      label: "角色",
      minWidth: 90,
      prop: "groups",
      formatter: ({ groups }) => {
        let groupsStr = "";
        groups.map(item => {
          groupsStr += item.name + " ";
        });
        return groupsStr;
      }
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  async function handleDelete(row?: any) {
    await AdminModel.deleteOneUser(row.id);
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const data: any = await AdminModel.getAdminUsers({});
    dataList.value = data.items;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(row?: any) {
    const title = row?.id ? "修改" : "新增";
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          username: row?.username ?? "",
          email: row?.email ?? "",
          groupIds: row?.groups.map(item => item.id) ?? []
        },
        allGroups,
        isEdited: row?.id ? true : false
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormUserInfoRef = formRef.value.getUserInfoRef();
        const FormPwdRef = formRef.value.getPwdRef();
        const activeTab = formRef.value.activeTab;
        const curData = options.props.formInline;
        if (activeTab === 0) {
          FormUserInfoRef.validate(valid => {
            if (valid) {
              // 表单规则校验通过
              if (!row?.id) {
                UserModel.register(curData).then(() => {
                  message(`新增用户成功`, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                });
                done();
              } else {
                AdminModel.updateOneUser(
                  curData.email,
                  curData.groupIds,
                  row.id
                ).then(() => {
                  message(`修改用户成功`, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                });
                done();
              }
            }
          });
        } else {
          FormPwdRef.validate(valid => {
            if (valid) {
              // 表单规则校验通过
              AdminModel.changePassword(
                curData.password,
                curData.confirmPassword,
                row.id
              ).then(() => {
                message(`修改密码成功`, {
                  type: "success"
                });
                onSearch(); // 刷新表格数据
              });
              done();
            }
          });
        }
      }
    });
  }

  onMounted(() => {
    onSearch();
    getAllGroups().then((result: any) => {
      allGroups.value = result;
    });
  });

  return {
    loading,
    columns,
    dataList,
    buttonClass,
    onSearch,
    openDialog,
    resetForm,
    handleDelete
  };
}
