import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

function OptionsSettings({options, ...props}) {

    const fontsizes = [9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36]
    const fontweight = ['Normal', 'Bold', 'Bolder', 'Lighter']

    let defaultTitle = {
        show: true,
        textStyle: {
            color: '#333',
            fontWeight: 'bolder',
            fontSize: 18,
        },
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
    }
    let defaultLegend = {}
    

    if (options) {
        let optionsObj = JSON.parse(options)
        if (optionsObj.title === undefined) {
            defaultTitle = {}
        } else {
            defaultTitle = {...optionsObj.title, ...defaultTitle}
        }
        if (optionsObj.legend === undefined) {
            defaultLegend = {}
        } else {
            defaultLegend = {...optionsObj.legend, ...defaultLegend}
        }
    }

    const [title, setTitle] = useState(defaultTitle);
    const [legend, setLegend] = useState(defaultLegend)


    return (
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h6>Title</h6>
          </Accordion.Header>
          <Accordion.Body>
            {
                JSON.stringify(defaultTitle)
            }
            {

            }
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="titleForm.show">
                    <Form.Label column sm="2" >Show</Form.Label>
                    <Col sm="10">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label=""
                            checked={title.show}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="titleForm.content">
                    <Form.Label column sm="2" >Content</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled type="email" placeholder="Please input your chart title" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="titleForm.color">
                    <Form.Label column sm="2" >Color</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue="#563d7c"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="titleForm.font">
                    <Form.Label column sm="2" >Font</Form.Label>
                    <Col sm="10">
                        <Form.Select style={{display: 'inline-block'}} aria-label="Default select example">
                            {
                                fontsizes.map((size) => {
                                    return <option key={size} value={size}>{size}</option>
                                })
                            }
                        </Form.Select>
                        <Form.Select style={{display: 'inline-block'}} aria-label="Default select example">
                            {
                                fontweight.map((weight) => {
                                    return <option key={weight} value={weight}>{weight}</option>
                                })
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="titleForm.position">
                    <Form.Label column sm="2" >Position</Form.Label>
                    <Col sm="10">
                    <Form.Select style={{display: 'inline-block'}} aria-label="Default select example">
                            <option value="top">Top</option>
                            <option value="topright">Top-Right</option>
                            <option value="right">Right</option>
                            <option value="bottomright">Bottom-Right</option>
                            <option value="bottom">Bottom</option>
                            <option value="bottomleft">Bottom-Left</option>
                            <option value="left">Left</option>
                            <option value="topleft">Top-Left</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
          <h6>Legend</h6>
          </Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
  
  export default OptionsSettings;