import { Button, Modal } from "react-bootstrap";
import '../../../StyleSheets/gradient.css';
import CommentForm from "./CommentForm";

const ModalPic = props => {
    if (!props.pic) return null;

    return (
        <Modal show={props.modalToggle} onHide={props.modalHandler}>
            <Modal.Header closeButton>
                <Modal.Title className="text-success">{props.pic.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{ width: "100%" }} src={props.pic.image} alt={props.pic.name} />
                <h3 className="text-center mt-4 mb-2">Comments</h3>
                <div className="my-3">{props.comments}</div>
            </Modal.Body>
            <CommentForm picId={props.pic.id} addComment={props.addComment} />
            <Modal.Footer className="myModalFooterBG shadow">
                <Button variant="outline-secondary" onClick={props.modalHandler}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPic;