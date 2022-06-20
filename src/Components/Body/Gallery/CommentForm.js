import React from "react";
import '../../../StyleSheets/gradient.css';
import { Formik } from "formik";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        email: state.state.email,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
        category: state.state.selectedCategory,
    }
}

const CommentForm = props => {
    // React.useEffect(() => {
    // });
    //console.log("CommentForm", props);

    return (
        <div className="p-3 myBGT">
            <h3 className="display-5 fw-bold text-center text-info text-shadow">post a comment</h3>
            <p className="text-center fs-4 text-success my-3">Your Email: {props.email}</p>
            <Formik
                initialValues={{ comment: "" }}
                validate={values => {
                    const errors = {};
                    if (values.comment.length < 5) errors.comment = "at least few more words";
                    return errors;
                }}
                onSubmit={values => {
                    const commentObj = {
                        email: props.email,
                        message: values.comment,
                        userId: props.userId,
                        category: props.category,
                        imageId: props.picId,
                    }
                    props.addComment(commentObj);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit} className="col-12">
                            <textarea className="form-control mb-3"
                                name="comment"
                                rows={7}
                                placeholder="what you think of the photo!"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comment}
                            />
                            <span className="text-center text-dark">{errors.comment && touched.comment && errors.comment}</span>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-info rounded-pill px-5 py-2 fw-bold fs-6" type="submit" disabled={isSubmitting}>
                                    Post
                                </button>
                            </div>
                        </form></div>
                )}
            </Formik>
        </div>
    );
}

export default connect(mapStateToProps)(CommentForm);