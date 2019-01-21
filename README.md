## 坚果手机官网效果

参考链接：http://www.smartisan.com/jianguo/#/overview

观察我们可以发在Y 轴移动鼠标图片没有什么变化，在X轴方向移动鼠标图片会移动==(y轴的值会发生变化)，并且移动到某一坐标点，只有五张图片会发生变化，也就是说受影响的范围是五张图片的大小。

当鼠标移动到某一点时计算出坐标点的(x,y)，我们可以求出每张图片中心点的位置（每张图片的offsetLeft）,图片的中心点的位置距离坐标点有一定的差值。

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_1.png)

当图片离鼠标垫越近，其差值越小，当图片离鼠标垫越远，其差值越大

假设K=差值/受影响的图片的宽度

K=Y轴的值

当差值越大，K值也就越大，那么给定Y轴的值也就越大，那么偏移的距离就越大，图片的可显示区域越小。

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_2.png)

当鼠标移动到某一个位置时：我们要获取的是当前的img所处的位置和它的定位父级`<li>`标签的高度h,利h=aImg[j].offsetTop获取不到这个高度。

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_3.png)

现在换一种思想：利用`getBoundingClientRect()`方法

我们可以获取到每一张图片`aImg[j]`距离屏幕最上面的距离h1，我们还可以获取到它的定位父级（li）距离屏幕最上面的距离h2

那么,很明显 `h=h1-h2`。

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_4.png)

将这个距离H转化为百分比的形式

当鼠标点击某张图片之后，这张图片就会在屏幕中间

首先根据可视区域的宽度可以将中心点算出来K1，也可以把图片到屏幕最左边的距离算出来K2，这样就可以计算出图片到中心点的距离K=K2-K1

我们可以将整个UL的值走相对应的距离K，直到图片走到中心点的位置

移动的距离是（负值）

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_5.png)

最左边的图片和最右边的图片走的距离

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_6.png)

移动的距离是（正值）

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_7.png)
 
要扩大三倍，就乘以三倍的距离即可

![ ](https://www.cnblogs.com/images/cnblogs_com/cliy-10/1297094/o_8.png)
