import { Component } from "react";
import { Row } from "react-bootstrap";
import { Card, CardImg } from "reactstrap";
import '../../../StyleSheets/ItemMenu.css';
import { connect } from "react-redux";
import ModalPic from "./ModalPic";
import { addComment, asyncFetchComments } from "../../../redux/ActionCreator";

const mapStateToProps = state => {
    return {
        images: state.state.images,
        category: state.state.selectedCategory,
        comments: state.state.comments,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        addComment: commentObj => dispatchEvent(addComment(commentObj)),
        fetchComment: () => dispatchEvent(asyncFetchComments()),
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPic: null,
            modalToggle: false,
            show: false,
            setShow: false,
        }
    }
    onPicSelect = pic => {
        this.setState({
            selectedPic: pic,
        });
        this.modalHandler();
    }
    modalHandler = () => {
        this.setState({
            modalToggle: !this.state.modalToggle,
        })
    }
    componentDidMount() {
        this.props.fetchComment();
    }

    render() {
        let allComments = [];
        if (this.props.comments) {
            for (let comment in this.props.comments) {
                comment = this.props.comments[comment];
                if (comment.category === this.props.category && this.state.selectedPic && this.state.selectedPic.id === comment.imageId) {
                    comment = <div key={Math.random()}>
                        <div className="fs-4 text-success">{comment.message}</div>
                        <div className="text-primary">User: {comment.email}</div>
                    </div>;
                    allComments = [...allComments, comment];
                }
            }
        }
        document.title = "Photo Gallery";
        let galleryRender = null;
        if (this.props.images) {
            galleryRender = this.props.images.map(imgObj => {
                return (
                    <div className="col-md-6 my-2" key={imgObj.id}>
                        <Card className="p-2 shadow my-cards" style={{ cursor: "pointer" }} onClick={() => this.onPicSelect(imgObj)}>
                            <CardImg
                                width="100%"
                                alt={imgObj.name}
                                src={imgObj.image}
                            />
                        </Card>
                    </div>
                );
            });
        }
        // galleryRender = [...galleryRender, ...galleryRender, ...galleryRender];
        return (
            <>
                <ModalPic
                    modalToggle={this.state.modalToggle}
                    comments={allComments}
                    modalHandler={this.modalHandler}
                    pic={this.state.selectedPic}
                    addComment={this.props.addComment}
                />
                <Row>
                    {galleryRender}
                </Row>
            </>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);