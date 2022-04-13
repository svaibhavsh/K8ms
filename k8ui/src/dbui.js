import React from 'react';
// component with DB data
const DbUI = ({ blog_title, blog_body }) => {
    return (
        <div>
            <h3>Blog Details</h3>
            <h3>
                Blog Title: {blog_title}
            </h3>
            <h3>
                Blog Body: {blog_body}
            </h3>
        </div>
    )
}

export default DbUI;
