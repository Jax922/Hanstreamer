import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Modal, Form } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory} from "react-router-dom";
import CopyToClipboardButton from "./CopyToClipboardButton";
import UploadFileButton from "./UploadFileButton";
import { database, firestore } from "../firebase";
import File from "./File";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import slidesUpload from "./design/slidesUpload";
import SlideCard from "./design/SlideCard";
import Image from 'react-bootstrap/Image';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [files, setFiles] = useState([]);
    const [newSlidesModalShow, setNewSlidesModalShow] = useState(false);
    const [slideName, setSlideName] = useState("");
    const [slides, setSlides] = useState([]);
    const [displayLink, setDisplayLink] = useState("");

    // instead of emptying files everytime the files are updated on the database,
    // only empty it when the component is first created
    useEffect(() => {
        setFiles([]);
    }, []);

    // when the currentUser changes, change the files displayed to the account to ones owned by the currentUser
    useEffect(() => {
        // const cleanup = database.files
        //     .where("userId", "==", currentUser.uid)
        //     .orderBy("ordering")
        //     .onSnapshot((snapshot) => {
        //         setFiles(snapshot.docs.map(database.formatDoc));
        //     });
        // return cleanup;
        const cleanup = database.slides
            .where("userId", "==", currentUser.uid)
            .orderBy("updateTime", "desc")
            .onSnapshot((snapshot) => {
                setSlides(snapshot.docs.map(database.formatDoc));
                console.log(snapshot)
                console.log(currentUser.uid)
            });
        
        return cleanup;
    }, [currentUser]);

    // // whenever the files changes, change the ordering too
    // useEffect(() => {
    //     // for some reason, database.batch doesn't work because it thinks firestore is not configured
    //     const batch = firestore.batch();
    //     slides
    //         .map((slide, index) => {
    //             return { ...slide, ordering: index };
    //         })
    //         .forEach((slide) => {
    //             batch.update(database.files.doc(slide.id), {
    //                 ordering: slide.ordering,
    //             });
    //         });
    //     batch.commit();
    // }, [currentUser, slides]);

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = Array.from(files);
        const [removed] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, removed);

        setFiles(items);
    }

    const handleNewSlides = () => {
        const newSlideData = {
            title: slideName,
            coverImg: "",
            pages: [],
            createdAt: database.getCurrentTimestamp(),
            time: Date.now()
        }
        const slideJson = JSON.stringify(newSlideData);
        const slideBlob = new Blob([slideJson], { type: 'application/json' });

        slidesUpload(currentUser.uid, slideBlob, slideName);
       
        setSlideName("");
        handleModalClose(); 
    };
    const handleInputChange = (e) => {
        setSlideName(e.target.value);
    };
    const handleModalShow = () => {
        setSlideName("");
        setNewSlidesModalShow(true);
    }
    const handleModalClose = () => setNewSlidesModalShow(false);
    const emptyTip = () => {
        return (
            <Container>
                <Row className="justify-content-center sticky-bottom">
                    <h6 style={{textAlign: "center", color: "grey"}}>Add Slides to Display</h6>
                    <Image src="empty_data.jpg" rounded style={{width: "400px"}}/>
                    
                </Row>
            </Container>
        )
    }

    const handleDisplaySelect = (e, value) => {
        setDisplayLink(e.target.value)
    }

    return (
        <div>
            <NavigationBar />
            <Container className="d-flex flex-column">
                <Row className="p-3 mt-4 bg-light rounded-3">
                    <Col>
                        <Container
                            fluid
                            className="py-1 d-flex align-items-center"
                        >
                            <div className="p-2 flex-grow-1 bd-highlight fs-2">
                                My Display
                            </div>
                            {/* https://stackoverflow.com/questions/11401897/get-the-current-domain-name-with-javascript-not-the-path-etc */}
                            <CopyToClipboardButton
                                className="m-3 p-4 bd-highlight fs-4"
                                textToBeCopied={`${window.location.host}/display`}
                                defaultText={"Copy Display Link"}
                                onSuccessText={"Link Copied!"}
                            />
                            {/* open the display in new browser tab */}
                            <Form.Select onChange={handleDisplaySelect} style={{width: '300px'}} className="m-3 p-4 bd-highlight fs-4" aria-label="Default select example">
                                {
                                    slides.map((slide, idx) => {
                                        return (
                                            <option key={idx} value={`userId=${slide.userId}&slide=${slide.name}&title=${slide.title}`}>{slide.title}</option>
                                        )
                                    })
                                }
                            </Form.Select>

                            <Button variant="success" className="m-3 p-4 bd-highlight fs-4">
                                <a
                                    href={`http://localhost:3001/?model=selfie_segmentation&${displayLink}`}
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >   
                                    <i className="bi bi-display"></i>
                                    {" "}
                                    Preview Display
                                </a>
                            </Button>
                        </Container>
                    </Col>
                </Row>
                <Row className="p-3 mt-4 bg-light">
                    <Row>
                        <Col>
                            <Container
                                fluid
                                className="py-1 d-flex align-items-center"
                            >
                                <div className="p-2 flex-grow-1 bd-highlight fs-2">
                                    My Slides
                                </div>
                                <Button className="bd-highlight" onClick={handleModalShow}>
                                    <i className="bi bi-file-earmark-plus"></i>
                                    {" "}
                                    Create New Slides
                                </Button>
                            </Container>
                        </Col>
                    </Row>
                    {
                        slides.length === 0 && emptyTip()
                    }
                    <Row xs={1} md={5}>
                        {
                            slides.map((slide, idx) => {
                                return (
                                    <Col key={idx} style={{marginTop: '10px'}}>
                                        <Link
                                            to={`/design?userId=${slide.userId}&slide=${slide.name}&title=${slide.title}`}
                                            target={"_blank"}
                                            rel={"noopener noreferrer"}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        > 
                                            <SlideCard slide={slide} />
                                        </Link>
                                        
                                    </Col>
                                    
                                )
                            })
                        }
                    </Row>
                    

                </Row>
                {/* <Row className="p-3 mt-4 bg-light rounded-3 h-25">
                    <div>
                        <Col
                            style={{ overflowY: "scroll", maxHeight: "600px" }}
                        >
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {files.map((file, index) => (
                                                <Draggable
                                                    key={file.id}
                                                    draggableId={file.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Row>
                                                                <File
                                                                    file={file}
                                                                    className="fs-4 m-1 p-2 d-flex align-items-center btn-success"
                                                                />
                                                            </Row>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Col>
                        <Col>
                            <Row className="justify-content-center sticky-bottom">
                                <UploadFileButton className="mx-3 mt-3 p-4 bd-highlight fs-4" />
                            </Row>
                        </Col>
                    </div>
                </Row> */}
            </Container>
            <Modal 
                show={newSlidesModalShow}
                onHide={handleModalClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Create New Slides</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control 
                        type="text" placeholder="Enter Slides Name"
                        value={slideName}
                        onChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleNewSlides}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
            <Footer style={{ textAlign: 'center', marginTop: '120px' }}>Chart Design ©2023 Copyright</Footer>
        </div>
    );
}
