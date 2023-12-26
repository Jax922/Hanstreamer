
import React, { useEffect, useState }from 'react';
import { useLocation } from 'react-router-dom';
import { PlaySquareOutlined, PlusOutlined, SearchOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, SaveOutlined } from '@ant-design/icons';
import {Avatar, Card, notification, Layout, Menu, theme, Col, Row, Button, Form, Select, Space, Divider, Alert} from 'antd';
import { Link, useHistory} from "react-router-dom";
import PageCard from './PageCard';
import PageDesign from './PageDesign';
import ChartType from './ChartType';
import { storage } from "../../firebase";
import { forEach, set } from 'lodash';
import MyLineChart from './MyChart';
import {
    defaultLineData,
    defaultBarData,
    defaultPieData,
    defaultScatterData,
    defaultRadarData,
    defaultHeatMapData,
    defaultSunburstData,
    defaultTreemapData,
    defaultFunnelData,
    default3DSurfaceData,
    default3DGlobeData,
    defaultTimelineBubbleOption,
} from "./defaultChartData";
import TextEdit from './TextEdit';
import chart2svg from './chart2svg';
import { database } from "../../firebase";
import OptionsSettings from './OptionsSettings';
import 'react-data-grid/lib/styles.css';


const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

export default function ChartDesign() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const slideName = queryParams.get('slide');
    const slideTitle = queryParams.get('title');

    const storageRef = storage.ref();
    const filePath = `slides/${userId}/${slideName}`;

    const [slide, setSlide] = useState(null);
    const [activePage, setActivePage] = useState({type: ""});
    const [selectedType, setSelectedType] = useState(undefined);
    const [textEdits, setTextEdits] = useState([]);
    const [textEditShow, setTextEditShow] = useState(true);

    notification.config({
        duration: 1,
        maxCount: 3,
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, msg, desc) => {
      api[type]({
        message: msg,
        description: desc,
      });
    };

    const chartTypeOptions = [
        
        {
          label: 'Bar Chart',
          value: 'bar',
          desc: 'Bar Chart',
          icon: './chartype/bar.png'
        },
        {
            label: 'Line Chart',
            value: 'line',
            desc: 'Line Chart',
            icon: './chartype/line.png'
        },
        {
            label: 'Pie Chart',
            value: 'pie',
            desc: 'Pie Chart',
            icon: './chartype/pie.png'
        },
        {
            label: 'Scatter Chart',
            value: 'scatter',
            desc: 'Scatter Chart',
            icon: './chartype/scatter.png'
        },
        {
            label: 'Radar Chart',
            value: 'radar',
            desc: 'Radar Chart',
            icon: './chartype/radar.png'
        },
        {
            label: 'Heatmap Chart',
            value: 'heatmap',
            desc: 'Heatmap Chart',
            icon: './chartype/heatmap.png'
        },
        {
            label: 'Sunburst Chart',
            value: 'sunburst',
            desc: 'Sunburst Chart',
            icon: './chartype/sunburst.png'
        },
        {
            label: 'Treemap Chart',
            value: 'treemap',
            desc: 'Treemap Chart',
            icon: './chartype/treemap.png'
        },
        {
            label: 'Funnel Chart',
            value: 'funnel',
            desc: 'Funnel Chart',
            icon: './chartype/funnel.png'
        },
        {
            label: '3D Globe Chart',
            value: '3dglobe',
            desc: '3D Globe Chart',
            icon: './chartype/3dglobe.png'
        },
        {
            label: '3D Surface Chart',
            value: '3dsurface',
            desc: '3D Surface Chart',
            icon: './chartype/3dsurface.png'
        },
        {
            label: 'Timeline Bubble Chart',
            value: 'timelinebubble',
            desc: 'Timeline Bubble Chart',
            icon: './chartype/scatter.png'
        },
    ]

    useEffect(() => {
        storageRef.child(filePath).getDownloadURL().then((url) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.pages.length === 0) {
                        const newPage = {
                            active: true,
                            type:'',
                            data:'',
                            settings: [],
                            img: '',
                            index: 0,
                            textEdits: [],
                        }
                        data.pages.push(newPage);
                    }
                    data.pages.forEach((page) => {
                        page.active = false;
                    });
                    data.pages[0].active = true;
                    setSlide(data);
                    setActivePage(data.pages[0]);
                    setSelectedType(data.pages[0].type);
                    if (data.pages[0].textEdits !== undefined) {
                        setTextEdits(data.pages[0].textEdits);
                    } else {
                        setTextEdits([]);
                    }
                })
                .catch(error => console.error("Error fetching chart data:", error));
        }).catch((error) => {
            console.error("Error fetching file:", error);
        });
    }, []);

    const handleNewPage = () => {
        const newPage = {
            active: true,
            type:'',
            data:'',
            img: '',
            settings: [],
            index: slide.pages.length,
            textEdits: [],
        }
        slide.pages.forEach((page) => {
            page.active = false;
        });
        const newPages = [...slide.pages, newPage];
        const newSlide = {...slide, pages: newPages};
        setSlide(newSlide);
        setActivePage(newPage);
        setSelectedType(newPage.type);
        setTextEdits([]);
    }

    const handlePageClick = (page) => {
        slide.pages.forEach((page) => {
            page.active = false;
        });
        page.active = true;
        const newSlide = {...slide};
        setSlide(newSlide);
        setActivePage(page);
        setSelectedType(page.type);
        if (page.textEdits !== undefined) {
            setTextEdits(page.textEdits);
        } else {
            setTextEdits([]);
        }
    }

    const handleDelPage = (page) => {
        if (slide.pages.length <= 1) return;
        const newPages = slide.pages.filter((p) => p.index !== page.index);
        newPages.forEach((page, index) => {
            page.index = index;
        });
        const newSlide = {...slide, pages: newPages};
        setSlide(newSlide);
        setActivePage(newPages[0]);
        setSelectedType(newPages[0].type);
        if (newPages[0].textEdits !== undefined) {
            setTextEdits(newPages[0].textEdits);
        } else {
            setTextEdits([]);
        }
    }

    // const handleChartTypeChange = (data) => {
    //     if (data.type === "line") {
    //         activePage.data = JSON.stringify(defaultLineData, null, 2);
    //     } else if (data.type === "bar") {
    //         activePage.data = JSON.stringify(defaultBarData, null, 2);
    //     } else if (data.type === "pie") {
    //         activePage.data = JSON.stringify(defaultPieData, null, 2);
    //     } else if (data.type === "scatter") {
    //         activePage.data = JSON.stringify(defaultScatterData, null, 2);
    //     } else if (data.type === "radar") {
    //         activePage.data = JSON.stringify(defaultRadarData, null, 2);
    //     } else {
    //         activePage.data = "{}";
    //     }

    //     activePage.type = data.type;
    //     activePage.img = chart2svg(activePage.data, 600, 400);
    //     setActivePage(activePage);
    //     setSelectedType(data.type);
    //     const newSlide = {...slide};
    //     setSlide(newSlide);
    // }

    const handleChartOptionsChange = (data) => {

    }

    const handleTemplateChartOptionsChange = (data) => {
        if (data === "line") {
            activePage.data = JSON.stringify(defaultLineData, null, 2);
        } else if (data === "bar") {
            activePage.data = JSON.stringify(defaultBarData, null, 2);
        } else if (data === "pie") {
            activePage.data = JSON.stringify(defaultPieData, null, 2);
        } else if (data === "scatter") {
            activePage.data = JSON.stringify(defaultScatterData, null, 2);
        } else if (data === "radar") {
            activePage.data = JSON.stringify(defaultRadarData, null, 2);
        } else if (data === "heatmap") {
            activePage.data = JSON.stringify(defaultHeatMapData, null, 2);
        } else if (data === "sunburst") {
            activePage.data = JSON.stringify(defaultSunburstData, null, 2);
        } else if (data === "treemap") {
            activePage.data = JSON.stringify(defaultTreemapData, null, 2);
        } else if (data === "funnel") {
            activePage.data = JSON.stringify(defaultFunnelData, null, 2);
        } else if (data === "3dsurface") {
            activePage.data = JSON.stringify(default3DSurfaceData, null, 2);
        } else if (data === "3dglobe") {
            activePage.data = JSON.stringify(default3DGlobeData, null, 2);
        } else if (data === "timelinebubble") {
            activePage.data = JSON.stringify(defaultTimelineBubbleOption, null, 2);
        }
        else {
            activePage.data = "{}";
        }

        activePage.type = data;
        activePage.img = chart2svg(activePage.data, 600, 400);
        setActivePage(activePage);
        setSelectedType(data);
        const newSlide = {...slide};
        setSlide(newSlide);
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleDataChange = (newData) => {
        activePage.data = newData;
        setActivePage(activePage);
        const newSlide = {...slide};
        setSlide(newSlide);
    }

    const handleSaveSlideData = () => {
        console.log("slide", slide)
        console.log("activePage", activePage)
        console.log("textEdits", textEdits)

        activePage.textEdits = textEdits;
        slide.pages.forEach((page) => {
            if (page.index === activePage.index) {
                page.textEdits = textEdits;
            }
        })

        storageRef.child(filePath).putString(JSON.stringify(slide)).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // update cover img
            console.log("slide", slide)
            database.slides
                .where("userId", "==", userId)
                .where("name", "==", slideName)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    doc.ref.update({ coverImg: activePage.img })
                      .then(() => {
                        console.log("Slide updated successfully")
                        openNotificationWithIcon('success', 'Slide updated successfully', '');
                    })
                      .catch(error => console.error("Error updating slide:", error));
                  });
                })
                .catch(error => console.error("Error finding slide:", error));
        }); 
    }

    const handleInsertText = () => {
        if (activePage.textEdits === undefined) {
            activePage.textEdits = [];
        }
        const text = {
            zindex: textEdits.length + 10,
            color: '#000000',
            fontSize: 'h3',
            bold: false,
            italic: false,
            top: 100,
            left: 250,
            content: 'Untitled Text'
        }
        // activePage.textEdits.push(text);
        // slide.pages.forEach((page) => {
        //     if (page.index === activePage.index) {
        //         page.textEdits = activePage.textEdits;
        //     }
        // });
        // setActivePage(activePage);
        // textEdits.push(text);
        // setTextEdits([...textEdits, text]);
        setTextEdits(prevTextEdits => {
            const newEdits = [...prevTextEdits, text];
            activePage.textEdits = newEdits;
            slide.pages.forEach((page) => {
                if (page.index === activePage.index) {
                    page.textEdits = activePage.textEdits;
                }
            });
            return newEdits;
        });
    }

    const handleChangeFont =(idx, type, val) => {
        const newEdits = [...textEdits];
        newEdits[idx][type] = val;
        activePage.textEdits = newEdits;
        slide.pages.forEach((page) => {
            if (page.index === activePage.index) {
                page.textEdits = newEdits;
            }
        });
        setTextEdits(newEdits);
    }

    const handleDeleteText = (idx) => {
        const newEdits = [...textEdits];
        newEdits.splice(idx, 1);
        activePage.textEdits = newEdits;
        slide.pages.forEach((page) => {
            if (page.index === activePage.index) {
                page.textEdits = newEdits;
            }
        });
        // setActivePage(activePage);
        setTextEdits(newEdits);
    }

    const handleTextEditContentChange = (idx, val) => {
        const newEdits = [...textEdits];
        console.log("newEdits", newEdits)
        console.log("idx", idx)
        newEdits[idx].content = val;
        activePage.textEdits = newEdits;
        slide.pages.forEach((page) => {
            if (page.index === activePage.index) {
                page.textEdits = newEdits;
            }
        });
        // activePage.textEdits = newEdits;
        setTextEdits(newEdits);
    }

    const handleTextEditPositionChange = (idx, x, y) => {
        const newEdits = [...textEdits];
        newEdits[idx].top = y;
        newEdits[idx].left = x;
        activePage.textEdits = newEdits;
        slide.pages.forEach((page) => {
            if (page.index === activePage.index) {
                page.textEdits = newEdits;
            }
        });
        setTextEdits(newEdits);
    }

    const handleTextEditShowOrClose = (show) => {
        setTextEditShow(show);
    }

    return (
        <div style={{width: '100%', height: '100vh', overflow: 'hidden'}}>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >   
                    <Row>
                        <Col flex={90}>
                            <img src="./logo.png" alt=""  width={40} className="design-logo"/>
                            <h3 className="design-title"> {slideTitle} </h3>
                            <Button style={{marginLeft: '100px'}} onClick={handleInsertText}>Insert Text</Button>
                        </Col>
                        <Col flex={1}>
                        <Link
                            to={`/slideshow?userId=${userId}&slide=${slideName}&title=${slideTitle}`}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        > 
                            <Button style={{marginRight: '10px'}} icon={<PlaySquareOutlined />}>
                                Slideshow
                            </Button>
                        </Link>
                        <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveSlideData}>
                            Save
                        </Button>
                        </Col>
                    </Row>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                <div
                    style={{
                        minHeight: 1400,
                        background: colorBgContainer,
                       
                    }}
                >
                    <Layout>
                        <Sider width={200} style={{paddingBottom: '100px', background: colorBgContainer, height: '85vh',
                                    overflowY: 'auto'}}>
                            {
                                slide && slide.pages.map((page, index) => {
                                    return <PageCard key={index} page={page} handleClick={handlePageClick} handleDelPage={handleDelPage} />
                                })
                            }
                            <Button
                                onClick={handleNewPage}
                                style={{
                                    marginLeft: '20%',
                                }}
                                icon={<PlusOutlined />}>
                                New Page
                            </Button>
                            
                        </Sider>
                        <Divider type='vertical' />
                        <Layout style={{ padding: '0 24px 24px', background: colorBgContainer }}>
                            <Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: '85vh',
                                    background: colorBgContainer,
                                    position: 'relative',
                                }}
                            >   
                                <PageDesign key={activePage.data} page={activePage} onDataChange={handleDataChange} 
                                            onTextEdit={handleTextEditShowOrClose}
                                />
                                {
                                    textEditShow && textEdits.map((textEdit, index) => {
                                        return <TextEdit
                                            index={index}
                                            changeFont={handleChangeFont}
                                            deleteText={handleDeleteText}
                                            key={`text_${index}`} zindex={textEdit.zindex}
                                            color={textEdit.color} fontSize={textEdit.fontSize} bold={textEdit.bold} italic={textEdit.italic}
                                            top={textEdit.top} left={textEdit.left} content={textEdit.content}
                                            updateContent={handleTextEditContentChange}
                                            updatePosition={handleTextEditPositionChange}
                                        />
                                    })
                                }
                            </Content>
                            <Divider type='vertical' />
                            <Sider width={300}
                                style={{
                                    background: colorBgContainer,
                                    height: '85vh',
                                    overflowY: 'auto',
                                    marginLeft: '10px',
                                    borderLeft: '1px solid #ccc',
                                    padding: 0,
                                }}
                            >
                                <div style={{
                                    position: 'relative',
                                    marginTop: 10,
                                    padding: 0,
                                }}>
                                {/* <ChartType page={activePage} key={activePage.type} type={activePage.type} chartTypeChange={handleChartTypeChange}/> */}
                                    
                                    <p style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold', lineHeight: '30px'}}><i style={{color: '#ff9933'}} class="bi bi-palette-fill"></i> {"   "} Chart Template</p>
                                    {/* <Form
                                        name="chartType"
                                        labelCol={{span:16}}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        style={{
                                            maxWidth: 200,
                                        }}
                                        autoComplete="off"
                                        initialValues={{ type: selectedType }}
                                        onValuesChange={handleChartTypeChange}
                                        key={selectedType}

                                    >
                                        <Form.Item
                                            label="Chart Type"
                                            name="type"
                                            >
                                            <Select
                                                // value={selectedType}
                                                // key={selectedType}
                                                showSearch
                                                style={{
                                                    width: 200,
                                                }}
                                                placeholder="Search to Select"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={chartTypeOptions}
                                                optionRender={(option) => (
                                                    <Space>
                                                    <span role="img" aria-label={option.data.label}>
                                                        {<img width={30} src={option.data.icon} />}
                                                    </span>
                                                    {option.data.desc}
                                                    </Space>
                                                )}
                                                // onChange={handleChartTypeChange}
                                            />
                                        </Form.Item>
                                        
                                    </Form> */}
                                    <Divider />
                                    <div style={{width: '200px', marginLeft: '40px'}}>
                                        {
                                            chartTypeOptions.map((option) => {
                                                return <Card
                                                    style={{
                                                        width: 200,
                                                        marginTop: 16,
                                                        
                                                    }}
                                                    className='template-chart-border'

                                                    onClick={()=>handleTemplateChartOptionsChange(option.value)}
                                                >
                                                    <Meta
                                                        avatar={<Avatar src={option.icon} />}
                                                        title={option.label}
                                                    />
                                                </Card>
                                            })
                                        }
                                    </div>
                                    
                                    {/* <OptionsSettings options={activePage.data} page={activePage} key={activePage.type} type={activePage.type} chartOptionsChange={handleChartOptionsChange}/> */}
                                </div>
                            </Sider>
                        </Layout>

                    </Layout>
                </div>
                </Content>
            </Layout>
            {contextHolder}                         
        </div>
    );

}
