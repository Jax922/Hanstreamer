
import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {Card, Row, Col, Image, Select, Form, Space} from 'antd'




export default function ChartType({ page, type, chartTypeChange, ...props }) {


    const chartTypeOptions = [
        
        {
          label: 'Bar Chart',
          value: 'bar',
          emoji: '📊',
          desc: 'Bar Chart',
        },
        {
            label: 'Line Chart',
            value: 'line',
            emoji: '📈',
            desc: 'Line Chart',
        },
    ]
    const onChange = (value) => {
        console.log(`selected ${value}`);
        chartTypeChange(value);
    };

    const [selectedType, setSelectedType] = useState(type);

    useEffect(() => {
        setSelectedType(type);
    }, [type]);


    return (
        <div
            style={{
                textAlign: 'top',
                position: 'relative',
                marginTop: 10,
                width: 200,
                textAlign: 'center',
            }}
        >   
            <Form
                name="chartType"
                labelCol={{span:16}}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 400,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"

            >
                <Form.Item
                    label="Chart Type"
                    name="type"
                    >
                    <Select
                        value={selectedType}
                        key={selectedType}
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
                                {option.data.emoji}
                              </span>
                              {option.data.desc}
                            </Space>
                        )}
                        onChange={onChange}
                    />
                </Form.Item>

            </Form>
            
        </div>
    )
}