import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { div } from 'stardust-core/dist/specification/construct';
import { Button, Modal, Alert, Progress } from 'antd'
import { ClearOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';

const CodeDisplay = ({code, onDataChange, ...props}) => {
    const editorRef = useRef(null);

    const [value, setValue] = useState(code);
    const [clearModal, setClearModal] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [alertText, setAlertText] = useState("");

    const handleCodeChange = (newValue, viewUpdate) => {
        try {
            const parsedData = JSON.parse(newValue);
            setAlertShow(false);
            setAlertText("");
        } catch (error) {
            
        }
        setValue(newValue);
    }

    const clearDataString = "{}"


    const handleUpdateCode = () => {
        try {
            const parsedData = JSON.parse(value);
            onDataChange(value);
        } catch (error) {
            setAlertText(error.message);
            setAlertShow(true);
        }
    }

    const confirmClearData = () => {
        setValue(clearDataString);
        setClearModal(false);
        onDataChange(clearDataString);
    }
    const handleClearData = () => {
        setClearModal(true);
    }
    
    const handleAlertClose = () => {
        setAlertShow(false);
        setAlertText("");
    }


    return (
        <div>
            <div style={{marginBottom: '10px', textAlign: 'left'}}>
                {
                    alertShow &&
                    <span style={{color: 'red'}}>
                        Data Error: &nbsp;
                        <Progress size={[24, 24]} type="circle" percent={100} status="exception" />
                    </span>
                }
                {
                    !alertShow &&
                    <span style={{color: 'green'}}>
                        Data Valid: &nbsp;
                        <Progress size={[24, 24]} type="circle" percent={100} />
                    </span>
                }
                <Button style={{marginLeft: '10px'}} icon={<ClearOutlined />} onClick={handleClearData}>Clear</Button>
                <Button style={{marginLeft: '10px'}} type="primary" icon={<PlayCircleOutlined />} onClick={handleUpdateCode}>Run</Button>
            </div>
            
            <CodeMirror
                ref={editorRef}
                value={value} 
                height="60vh" 
                extensions={[javascript({ jsx: true })]}
                options={{
                    mode: 'application/json',
                    theme: 'material',
                    lineNumbers: true,
                    gutters: ['errors'],
                }}
                onChange={handleCodeChange}
            />
             <Modal
                title="❗❗❗Clear Data Confirm"
                open={clearModal}
                onOk={confirmClearData}
                okText="Yes"
                cancelText="No"
                onCancel={() => {setClearModal(false)}}
            >
                <p>{"Are sure to clear data ?"}</p>
            </Modal>
            {   
                alertShow && alertText !== "" &&
                <Alert
                    style={{position: 'fixed', bottom: 0, right: 10, width: '30%', zIndex: 1000}}
                    message="Data Error:"
                    description = {alertText}
                    type="error"
                    closable
                    onClose={handleAlertClose}
                />
            }
        </div>     
        
    )
}

export default CodeDisplay;