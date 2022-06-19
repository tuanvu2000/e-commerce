import React from 'react'
import { Column } from '@ant-design/plots'

const Chart = () => {
    const data = [
        {
            type: "Tháng 1",
            sales: 38,
        },
        {
            type: "Tháng 2",
            sales: 52,
        },
        {
            type: "Tháng 3",
            sales: 24,
        },
        {
            type: "Tháng 4",
            sales: 13,
        },
        {
            type: "Tháng 5",
            sales: 57,
        },
        {
            type: "Tháng 6",
            sales: 31,
        },
    ]
    const config = {
        data,
        xField: "type",
        yField: "sales",
        label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: "#000",
                opacity: 0.8,
                fontWeight: 600,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Tháng",
            },
            sales: {
                alias: "Số đơn hàng",
            },
        }
    }
    
    return <Column {...config} />
}

export default Chart