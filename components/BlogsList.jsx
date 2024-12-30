import Link from "next/link";

const BlogsList = ({ blogs }) => {
  // Handle cases where blogs is undefined, null, or empty
  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-center text-3xl font-bold opacity-50">
        No blogs found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 w-[90%] m-auto">
      {blogs.map((blog) => (
        <Link href={`/blogs/${blog.id}`} key={blog.id}>
          <div className=" rounded-md cursor-pointer shadow-md hover:shadow-md scale-95 hover:scale-100 transition-all duration-300">
            <div className="w-full h-40 rounded-lg">
              <img
                src={blog.img}
                alt={blog.title}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <p className="p-3 font-semibold text-lg mt-3">{blog.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogsList;
