"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersList = ({ users }) => {
  if (!users.length) {
    return <p>No users available.</p>;
  }

  return (
    <div className="overflow-x-auto px-4">
      <h1 className="font-bold text-3xl text-center my-4 mb-8 underline">
        Users
      </h1>
      <Table className="overflow-x-auto">
        <TableCaption>A table of users data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Created on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell className="">
                {new Date(user.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
