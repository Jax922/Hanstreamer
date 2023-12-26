import React, { useState, useMemo, useEffect, useRef } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact, useFocused, ReactEditor} from 'slate-react'
import { BoldOutlined, ItalicOutlined, DeleteOutlined, CheckOutlined} from '@ant-design/icons';
import { Button, ColorPicker, Row, Space, Input}  from 'antd';
import { set } from 'lodash';
import { Col } from 'react-bootstrap';

const { TextArea } = Input;


export default function TextEdit({index, zindex, color, fontSize, bold, italic, changeFont,deleteText, left, top, content, updateContent, updatePosition,  ...props}) {
    const containerRef = useRef();
    // const editor = useMemo(() => withReact(createEditor()), [])
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: left, y: top });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDrag, setIsDrag] = useState(false);
    const [innerContent, setInnerContent] = useState(content);

    // const [value, setValue] = useState([
    //     {
    //         type: 'paragraph',
    //         children: [{ text:  innerContent}],
    //     },
    // ])
    // const initialValue = [
    //     {
    //       type: 'paragraph',
    //       children: [{ text: content }],
    //     },
    // ]
    const fontSizeTable = {
        'h1': '48px',
        'h2': '36px',
        'h3': '24px',
        'h4': '18px',
        'h5': '14px',
        'h6': '12px',
    }
    const handleChange = (value) => {
        // const { selection } = editor;
        // setIsFocus(!!selection && Slate.Editor.isFocused(editor));
        // const val = value[0].children[0].text
        // const newValues = [...value]
        // newValues[0].children[0].text = val

        setInnerContent(value)
        updateContent(index, value)
    }
    const changeFontStyle = (type, value) => {
        changeFont(index, type, value)
        // setIsClick(true);
        setIsFocused(true);
    }
    const handleDelete = () => {
        deleteText(index)
        setIsFocused(true);
        // setIsClick(false);
    }
    const handleTextDragStart = (e) => {
        const rect = e.target.getBoundingClientRect();
        // e.dataTransfer.setData("text/plain", JSON.stringify({ x: e.clientX - rect.left, y: e.clientY - rect.top }));
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDrag(true);
    }
    const handleTextDragOver = (e) => {
        e.preventDefault();
    }
    const onDrop = (e) => {
        e.preventDefault();
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newX = e.clientX - containerRect.left - offset.x;
            const newY = e.clientY - containerRect.top - offset.y;
            setPosition({
                x: newX,
                y: newY
            });
            updatePosition(index, newX, newY)

        }
        setIsDrag(false);
    }
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        // if (!isClick) {
            setIsFocused(false);
        // }
        // setIsClick(false);
    }

    useEffect(() => {
        setInnerContent(content);
    }, [content]);

    useEffect(() => {
        setPosition({
            x: left,
            y: top
        });
    }, [left, top]);

    return (
        <div
            ref={containerRef}
            onDragOver={handleTextDragOver}
            onDrop={onDrop}
            style={{ width: '100%', height: '88%', position: 'absolute', left: '0px', top: '12%', 
                     border: isDrag ? '1px dashed black' : 'none',}}
        >
            <div
            draggable
            onDragStart={handleTextDragStart}
           
            style={{
                cursor: "move",
                zIndex: zindex,
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                padding: '5px',
                pointerEvents: 'auto',
                
            }}>

                    <div style={{
                        backgroundColor: 'white',
                        margin: 0, 
                        padding: 0,
                        opacity: isFocused ? 1 : 0,
                        marginBottom: '1px',
                        // pointerEvents: isFocused ? 'auto' : 'none',
                        
                    }}>
                        <Row align="middle">
                            <Col>
                                <Button onClick={(e)=>{
                                    e.preventDefault();
                                    changeFontStyle('bold', !bold)
                                }} type={bold === true ? 'primary' : 'normal'} icon={<BoldOutlined />}></Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>changeFontStyle('italic', !italic)} type={italic === true ? 'primary' : 'normal'} icon={<ItalicOutlined />} style={{marginLeft: '5px'}}></Button>
                            </Col>
                            <Col>
                                <ColorPicker onChange={(val, hex)=>changeFontStyle('color', hex)} defaultValue={color} style={{marginLeft: '5px'}} />
                            </Col>
                            <Col>
                                <Button onClick={()=>changeFontStyle('fontSize', 'h1')} type={fontSize === 'h1'? 'primary' : 'normal'} icon={<i class="bi bi-type-h1"></i>} style={{marginLeft: '5px'}} ></Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>changeFontStyle('fontSize', 'h2')} type={fontSize === 'h2'? 'primary' : 'normal'} icon={<i class="bi bi-type-h2"></i>}></Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>changeFontStyle('fontSize', 'h3')} type={fontSize === 'h3'? 'primary' : 'normal'} icon={<i class="bi bi-type-h3"></i>}></Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>changeFontStyle('fontSize', 'h4')}  type={fontSize === 'h4'? 'primary' : 'normal'} icon={<i class="bi bi-type-h4"></i>}></Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>changeFontStyle('fontSize', 'h5')} type={fontSize === 'h5'? 'primary' : 'normal'} icon={<i class="bi bi-type-h5"></i>}></Button>
                            </Col>                                
                            <Col>
                                <Button onClick={()=>changeFontStyle('fontSize', 'h6')} type={fontSize === 'h6'? 'primary' : 'normal'} icon={<i class="bi bi-type-h6"></i>}></Button>
                            </Col>
                            <Col>
                                <Button onClick={handleDelete} type='primary' danger icon={<DeleteOutlined />} style={{marginLeft: '5px'}}></Button>
                            </Col>
                        </Row>
                        
                        
                       
                        
                       
                        {/* <Button type='primary' icon={<CheckOutlined />}></Button> */}
                    </div>
                <TextArea value={innerContent} onChange={(e) => handleChange(e.target.value)} 
                    style={{
                        border: isFocused ? "1px solid #ccc" : "none",
                        borderRadius: "5px",
                        minWidth: "400px",
                        maxWidth: "800px",
                        padding: "0px 10px",
                        // margin: "10px",
                        cursor: "text",
                        fontWeight: bold === true ? 'bold' : 'normal',
                        fontStyle: italic === true ? 'italic' : 'normal',
                        color: color,
                        fontSize: fontSizeTable[fontSize] || '24px',
                        background: 'none',
                        overflow: isFocused ? 'auto' : 'hidden',
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoSize={{
                        minRows: 1,
                        maxRows: 2,
                    }}
                ></TextArea>
                {/* <Slate editor={editor} value={value} onChange={handleChange} initialValue={value}>
                <Editable 
                 onFocus={handleFocus}
                 onBlur={handleBlur}
                style={{
                    border: isFocused ? "1px solid #ccc" : "none",
                    borderRadius: "5px",
                    minWidth: "400px",
                    maxWidth: "800px",
                    padding: "0px 10px",
                    // margin: "10px",
                    cursor: "text",
                    fontWeight: bold === true ? 'bold' : 'normal',
                    fontStyle: italic === true ? 'italic' : 'normal',
                    color: color,
                    fontSize: fontSizeTable[fontSize] || '24px',
                }}/> */}
                {/* </Slate> */}
            </div>
        </div>
    )
}