const BlogDetails = ({ blog }) => {
  if (!blog) {
    return (
      <p className="text-3xl text-center font-bold text-gray-300">
        Could not fetch blog
      </p>
    );
  }

  return (
    <div className="p-4 w-[85%] m-auto">
      <h1 className="text-center font-bold text-3xl">{blog.title}</h1>
      <div className="my-10 w-full h-[400px] sm:h-[500px]  lg:h-[550px]">
        <img
          src={`${blog.img}`}
          alt={`Blog image`}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-gray-600">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
