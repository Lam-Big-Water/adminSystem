import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  EllipsisVertical,
  Eye,
  Trash,
} from "lucide-react";
import React from "react";
import { format } from "date-fns";
import TableSkeleton from "../TableSkeleton";
import { Modal, ModalOpen, ModalWindow } from "../compose/Modal";
import { Menus, Toggle, List, Button } from "../compose/Menus";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../ConfirmDelete";
import Pagination from "../components/Pagination";
import { useGetUsers } from "../query/user/useGetUsers"; // 导入您的hook
// import { useDeleteUser } from "../query/users/useDeleteUser"; // 假设有这个hook

const UsersTable = () => {
  const { data: usersData, isPending } = useGetUsers();
  console.log(usersData);
  
  // 从数据中提取用户列表，根据实际API响应结构调整
  const users = usersData?.users || usersData || [];
  const count = usersData?.count || users.length;
  
  const navigate = useNavigate();
//   const { deleteUser, isDeleting } = useDeleteUser();
  
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState(null);
  
  const sortedData = React.useMemo(() => {
    if (!users || !sortColumn || !sortDirection) return users || [];

    return [...users].sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";

      // 处理日期排序
      if (sortColumn.includes("_at") || sortColumn === "created_at" || sortColumn === "last_sign_in_at" || sortColumn === "email_confirmed_at") {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }

      // 处理数字排序（如果有的话）
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      // 字符串排序
      const aString = String(aVal).toLowerCase();
      const bString = String(bVal).toLowerCase();
      
      if (aString < bString) return sortDirection === "asc" ? -1 : 1;
      if (aString > bString) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortColumn, sortDirection]);

  const handleSort = (column) => {
    let newDirection = "asc";

    if (sortColumn === column) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = null;
      }
    }

    setSortColumn(newDirection ? column : null);
    setSortDirection(newDirection);
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4" />;
    }

    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4" />;
    }

    if (sortDirection === "desc") {
      return <ArrowDown className="h-4 w-4" />;
    }
    return <ArrowUpDown className="h-4 w-4" />;
  };

  // 格式化日期显示
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch (error) {
      return "Invalid date";
    }
  };

  // 简化头像显示
  const getAvatar = (user) => {
    // 优先使用 user_metadata 中的 avatar_url 或 picture
    const avatarUrl = user?.user_metadata?.avatar_url || 
                     user?.user_metadata?.picture || 
                     user?.avatar_url;
    
    if (avatarUrl) {
      return (
        <img 
          src={avatarUrl} 
          alt={user.user_metadata?.full_name || user.email || "User"}
          className="h-8 w-8 rounded-full object-cover"
        />
      );
    }
    
    // 如果没有头像，显示首字母
    const displayName = user.user_metadata?.full_name || user.email || "U";
    return (
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        <span className="text-xs font-medium">
          {displayName.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  // 获取显示名称
  const getDisplayName = (user) => {
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.full_name || 
           "No name";
  };

  // 获取提供商信息
  const getProvider = (user) => {
    return user.app_metadata?.provider || 
           user.user_metadata?.provider || 
           user.provider || 
           "Unknown";
  };

  // 检查邮箱是否已验证
  const isEmailVerified = (user) => {
    return user.email_confirmed_at || 
           user.email_verified || 
           user.user_metadata?.email_verified || 
           false;
  };

  if (isPending)
    return (
      <div className="min-h-full flex flex-col items-center p-6">
        <TableSkeleton />
      </div>
    );

  // 如果没有用户数据
  if (!users || users.length === 0) {
    return (
      <div className="h-screen bg-background pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No users found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pt-4">
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("user_metadata.full_name")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      User
                      {getSortIcon("user_metadata.full_name")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Email
                      {getSortIcon("email")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("role")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Role
                      {getSortIcon("role")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("app_metadata.provider")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Provider
                      {getSortIcon("app_metadata.provider")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("email_confirmed_at")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Email Verified
                      {getSortIcon("email_confirmed_at")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("last_sign_in_at")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Last Sign In
                      {getSortIcon("last_sign_in_at")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("created_at")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Created At
                      {getSortIcon("created_at")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedData.map((user) => (
                  <tr
                    key={user.id}
                    className="last:border-0 border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {getAvatar(user)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {getDisplayName(user)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: {user.id?.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                          user.role === "authenticated"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : user.role === "admin"
                            ? "bg-purple-100 text-purple-800 border-purple-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {getProvider(user)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {isEmailVerified(user) ? (
                        <span className="text-green-600 font-medium">✓ Verified</span>
                      ) : (
                        <span className="text-amber-600">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(user.last_sign_in_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <Modal>
                        <Menus>
                          <div className="">
                            <Toggle id={user.id} positionY={10} positionX={10}>
                              <EllipsisVertical />
                            </Toggle>

                            <List id={user.id}>
                              <Button
                                onClick={() => navigate(`/users/${user.id}`)}
                              >
                                <div className="flex gap-2 items-center">
                                  <Eye size={18} strokeWidth={1.5} />
                                  <span>View Details</span>
                                </div>
                              </Button>

                              <ModalOpen opens="delete">
                                <Button>
                                  <div className="flex gap-2 items-center">
                                    <Trash size={18} strokeWidth={1.5} />
                                    <span>Delete User</span>
                                  </div>
                                </Button>
                              </ModalOpen>
                            </List>
                            <ModalWindow name="delete">
                              <ConfirmDelete
                                resourceName="user"
                                // onConfirm={() => deleteUser(user.id)}
                                // disabled={isDeleting}
                              />
                            </ModalWindow>
                          </div>
                        </Menus>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={count} />
        </div>
      </div>
  );
};

export default UsersTable;