import { getAllUsers } from "@/actions/getAllUsers"

const { default: UsersList } = require("@/components/UsersList")

const UserManagementPage = async () => {

  const res = await getAllUsers()
  const users = res.success ? res.data : []
  console.log('Users:', users)

  return <UsersList users={users} />;
}

export default UserManagementPage