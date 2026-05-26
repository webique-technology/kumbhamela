// export const slugify = (text) => {
//     return text
//         .toString()
//         .toLowerCase()
//         .trim()
//         .replace(/\s+/g, '-')     // Replace spaces with -
//         .replace(/[^\w-]+/g, '')  // Remove all non-word chars
//         .replace(/--+/g, '-')     // Replace multiple - with single -
//         .replace(/^-+/, '')       // Trim - from start
//         .replace(/-+$/, '');      // Trim - from end
// };

export const slugify = (text = "") => {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")     // Replace spaces with -
        .replace(/[^\w-]+/g, "")  // Remove all non-word chars
        .replace(/--+/g, "-")     // Replace multiple - with single -
        .replace(/^-+/, "")       // Trim - from start
        .replace(/-+$/, "");      // Trim - from end
};


// Image URL helper
export const imageUrl = (path = "") => {
    if (!path) return null;

    // already full URL
    if (path.startsWith("http")) {
        return path;
    }

    // remove /api only for images
    const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "";

    return `${baseUrl}${path}`;
};