import blogScheme from '../model/blogModel.js'; 

//  Add a new blog
const addBlog = async (req, res) => {
    const blog = new blogScheme({
        blogImage: req.body.blogImage, 
        title: req.body.title,
        shortContent: req.body.shortContent,
        fullContent: req.body.fullContent
    });

    try {
        await blog.save();
        res.status(201).json({ success: true, message: "Blog Added", blog });
    } catch (error) {
        console.error("Add Blog Error:", error);
        res.status(500).json({ success: false, message: "Error adding blog" });
    }
};

//  Get all blogs
const allBlogs = async (req, res) => {
    try {
        const blogs = await blogScheme.find({});
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error("Fetch Blogs Error:", error);
        res.status(500).json({ success: false, message: "Error fetching blogs" });
    }
};

//  Delete a blog
const removeBlog = async (req, res) => {
    try {
        const { id } = req.body; // Get blog ID from request body

        // Check if blog exists
        const blog = await blogScheme.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Delete the blog
        await blogScheme.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("❌ Delete Blog Error:", error);
        res.status(500).json({ success: false, message: "Error deleting blog" });
    }
};


export { addBlog, allBlogs, removeBlog };
