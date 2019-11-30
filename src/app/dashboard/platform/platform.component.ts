import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'platform',
    templateUrl: './platform.component.html',
    styleUrls: ['./platform.component.scss']
})
export class PlatformComponent {
    listData = [
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinfoYLhfo1S945BOLuFT96NRStYeYDFRviF5/avatar',
            title: '张飞关注了李逵',
            description: '06-01 11:34'
        },
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinfoxlXwHVwZkCQtl1Zyd1wrvF78b1rZkhfK/avatar',
            title: '关羽发布文章页面优化之服务器渲染',
            description: '06-01 11:34'
        },
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinfosvaY5tb7yfnSFTTimcjy3vuSG6RC28v2/avatar',
            title: '曹操回复了刘备如何火烧曹营',
            description: '06-01 11:34'
        },
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            title: '张飞关注了李逵',
            description: '06-01 11:34'
        },
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinforaP8NeQgYpmKgkpWlqZP7rfewbHiIzJY/avatar',
            title: '张飞关注了李逵',
            description: '06-01 11:34'
        },
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinfoQdhnYDF2VFOrQSTPR9963k8BbMjeqyTm/avatar',
            title: '张飞关注了李逵',
            description: '06-01 11:34'
        },
        {
            avatarAddress: 'https://dev-file.iviewui.com/userinfohRf8MIX3RrQHbT9k2aX05v1pTwl0owTh/avatar',
            title: '张飞关注了李逵',
            description: '06-01 11:34'
        }
    ];
    ngStyle = {
        'text-align': 'center'
    }
}

