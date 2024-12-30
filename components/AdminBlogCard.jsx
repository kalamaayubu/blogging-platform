"use client";

import { deleteBlog } from "@/actions/deleteBlog";
import { faEdit, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import { useRouter } from "next/navigation";

const AdminBlogCard = ({ blog }) => {
  const [dialogInput, setDialogInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Set the blog in order to be accessed in the update-blog page
  const handleEdit = (blog) => {
    dispatch(
      setBlog({
        ...blog,
        createdAt: blog.createdAt.toISOString(), // Serialize date for easy transmission and storage
      })
    );
    router.push("/admin/update-blog"); // Navigate to the update-blog page
  };

  // Function to delete a blog
  const handleDelete = async (blogId) => {
    setIsDeleting(true);

    try {
      const res = await deleteBlog(blogId);

      if (res.success) {
        toast.success(`${res.message}`);
      } else {
        toast.error(`${res.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`${res.message}`);
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 shadow-md rounded-md scale-90 hover:scale-95 transition-all duration-300 max-w-[500px] m-auto group">
      <div className="w-full h-40 overflow-hidden rounded-t-lg">
        <img
          src={blog.img}
          alt={`${blog.title} blog image`}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <p className="p-4">{blog.title}</p>
        <div className="px-4 opacity-0 gap-4 flex items-center group-hover:opacity-90 transition-opacity duration-500">
          {/* Blog deletion confirmation dialogue */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <FontAwesomeIcon
                icon={faTrash}
                title="Delete blog"
                className="hover:text-red-600 cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription className="text-red-600">
                <FontAwesomeIcon icon={faWarning} />
                <span>
                  &nbsp;This will permanently delete the blog. Type{" "}
                  {`"${blog.title}"`} and confirm.
                </span>
              </DialogDescription>
              <input
                type="text"
                value={dialogInput}
                onChange={(e) => setDialogInput(e.target.value)}
                placeholder="Type here..."
                className="py-2 px-3 border rounded-md outline-red-600"
              />
              <DialogFooter
                className={`flex flex-row justify-around sm:justify-around pt-2`}
              >
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-black text-white hover:bg-gray-900 px-3 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(true);
                    handleDelete(blog.id);
                  }}
                  disabled={dialogInput !== blog.title}
                  className={`text-white px-3 py-2 rounded-md 
                      ${
                        dialogInput !== blog.title
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-600"
                      }`}
                >
                  {isDeleting ? "Deleting..." : "Confirm"}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => handleEdit(blog)} // Pass blog data to the function
            title="Edit blog"
            className="hover:text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;
