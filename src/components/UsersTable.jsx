import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Ellipsis,
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
import { useGetUsers } from "../query/user/useGetUsers";

const UsersTable = () => {
  const { data: usersData, isPending } = useGetUsers();
  console.log(usersData);
  
  const users = usersData?.users || usersData || [];
  const count = usersData?.count || users.length;
  
  const navigate = useNavigate();
  
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState(null);
  
  const sortedData = React.useMemo(() => {
    if (!users || !sortColumn || !sortDirection) return users || [];

    return [...users].sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";

      if (sortColumn.includes("_at") || sortColumn === "created_at" || sortColumn === "last_sign_in_at" || sortColumn === "email_confirmed_at") {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

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
      return <ChevronsUpDown size={14} strokeWidth={2} />;
    }

    if (sortDirection === "asc") {
      return <ChevronUp size={14} strokeWidth={2} />;
    }

    if (sortDirection === "desc") {
      return <ChevronDown size={14} strokeWidth={2} />;
    }
    return <ChevronsUpDown size={14} strokeWidth={2} />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch (error) {
      return "Invalid date";
    }
  };

  const getAvatar = (user) => {
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
    
    const displayName = user.user_metadata?.full_name || user.email || "U";
    return (
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        <span className="text-xs font-medium">
          {displayName.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  const getDisplayName = (user) => {
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.full_name || 
           "No name";
  };

  const getProvider = (user) => {
    return user.app_metadata?.provider || 
           user.user_metadata?.provider || 
           user.provider || 
           "Unknown";
  };

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
      <div className="mx-auto">
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border hover:bg-muted">
                <tr>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("user_metadata.full_name")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      User
                      {getSortIcon("user_metadata.full_name")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("email")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Email
                      {getSortIcon("email")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("role")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Role
                      {getSortIcon("role")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("app_metadata.provider")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Provider
                      {getSortIcon("app_metadata.provider")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("email_confirmed_at")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Email Verified
                      {getSortIcon("email_confirmed_at")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("last_sign_in_at")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Last Sign In
                      {getSortIcon("last_sign_in_at")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("created_at")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Created At
                      {getSortIcon("created_at")}
                    </button>
                  </th>
                  <th className="h-12 text-left px-2">
                    <span className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm"></span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <Menus>
                  {sortedData.map((user) => (
                    <tr
                      key={user.id}
                      className="last:border-0 border-b border-border text-nowrap hover:bg-muted"
                    >
                      <td className="p-2 text-nowrap">
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
                      <td className="p-2 text-sm text-muted-foreground text-nowrap">
                        {user.email}
                      </td>
                      <td className="p-2 h-9 text-nowrap">
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
                      <td className="p-2 text-sm text-muted-foreground text-nowrap">
                        {getProvider(user)}
                      </td>
                      <td className="p-2 text-sm text-muted-foreground text-nowrap">
                        {isEmailVerified(user) ? (
                          <span className="text-green-600 font-medium">✓ Verified</span>
                        ) : (
                          <span className="text-amber-600">Pending</span>
                        )}
                      </td>
                      <td className="p-2 text-sm text-muted-foreground text-nowrap">
                        {formatDate(user.last_sign_in_at)}
                      </td>
                      <td className="p-2 text-sm text-muted-foreground text-nowrap">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="p-2">
                        <Modal>
                          <Toggle
                            className="flex justify-center items-center p-1 rounded-sm hover:bg-muted-foreground/10"
                            id={user.id}
                            positionY={10}
                            positionX={10}
                          >
                            <Ellipsis size={16} strokeWidth={2} />
                          </Toggle>

                          <List
                            className="flex flex-col p-1 bg-background text-foreground border border-border shadow-sm rounded-lg"
                            id={user.id}
                          >
                            <Button
                              className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted"
                              onClick={() => navigate(`/users/${user.id}`)}
                            >
                              <div className="flex gap-2 items-center">
                                <Eye size={16} strokeWidth={2} />
                                <span>See details</span>
                              </div>
                            </Button>

                            <ModalOpen opens="delete">
                              <Button className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted">
                                <div className="flex gap-2 items-center">
                                  <Trash size={16} strokeWidth={2} />
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
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </Menus>
              </tbody>
            </table>
          </div>
          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
};

export default UsersTable;