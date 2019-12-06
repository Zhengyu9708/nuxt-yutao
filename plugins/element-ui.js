import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Icon } from 'vant';
Vue.use(Icon);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

import { Lazyload } from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload);

import { CountDown } from 'vant';//倒计时
Vue.use(CountDown);

import { Card } from 'vant';//购物车商品卡
Vue.use(Card);

import { AddressEdit } from 'vant';//收货地址
Vue.use(AddressEdit);

import { Field } from 'vant';//输入框
Vue.use(Field);

import { NumberKeyboard } from 'vant';//数字键盘输入
Vue.use(NumberKeyboard);

import { Button } from 'vant';
Vue.use(Button);

import { Dialog } from 'vant';//弹框
Vue.use(Dialog);

import { Skeleton } from 'vant';//显示头像
Vue.use(Skeleton);

import { Cell, CellGroup } from 'vant';//单元格
Vue.use(Cell).use(CellGroup);

import { Row, Col } from 'vant';//栅格
Vue.use(Row).use(Col);

import { Tag } from 'vant';//标签
Vue.use(Tag);

import { Popup } from 'vant';//底部弹出
Vue.use(Popup);

import { Sku } from 'vant';//商品规格
Vue.use(Sku);

import { Toast } from 'vant';//成功提示
Vue.use(Toast);

import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);