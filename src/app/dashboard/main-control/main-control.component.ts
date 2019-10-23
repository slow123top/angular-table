import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'main-control',
    templateUrl: './main-control.component.html',
    styleUrls: ['./main-control.component.scss']
})
export class MainControlComponent implements OnInit {

    // echarts数据
    public chartOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    // 列表数据
    listOfData = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    // 日期范围
    dateRange = [];

    //
    males = [];
    females = [];

    total = [];

    constructor(
        private router: Router
    ) {

    }

    ngOnInit(
    ) {
        for (let i = 0; i < 60; i++) {
            this.males.push({
                value: i,
                color: 'rgb(51, 153, 255)'
            });
        }

        for (let i = 0; i < 28; i++) {
            this.females.push({
                value: i,
                color: 'rgb(190, 107, 224)'
            });
        }

        this.total = [...this.males, ...this.females];
    }
}

