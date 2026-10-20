---
title: "10. NumPy 数组：索引、形状与运算"
chapter_title: "NumPy 数组：索引、形状与运算"
weight: 10

date: 2026-05-02T11:12:00+08:00
lastmod: 2026-05-02T11:13:00+08:00

categories: ["Python"]
tags: ["NumPy", "索引与切片", "reshape", "广播"]
description: "NumPy 数组：索引、形状与运算学习笔记。"
---

## Numpy数组的访问

- ➢ 与标准 Python 列表访问方式类似，使用方括号 []，如x[0,:]
- ➢ 索引从 0 开始
- ➢ 多维索引: 使用逗号分隔的元组 (tuple)，如 [row, col]

```python
{
import numpy as np
A=np.array([[1,2,3],[4,5,6]])
# 1.访问特定元素
print(x[0,0]) #输出1
print(x[0,-1]) #输出3

# 2.访问整行或整列
print([0,:]) #输出第一行所有元素
print([:,0]) #输出第一列所有元素

# 3.访问子数组——一维数组切片
B=np.array([1,2,3,4,5])
print(x[2,4,1])
'''
➢ 沿用标准 Python 列表的切片操作：
x[start:stop:step]
➢ 参数说明：
start: 起始索引（包含）：默认为 0
stop: 结束索引（不包含）：默认为数组长度
step: 步长：默认为 1

'''

# 4.访问子数组二维数组切片——多维数组切片
x=np.array([[1,2,3],[4,5,6],[7,8,9]])
#4.1 取子矩阵
print(x[:2,:2])
#4.2 取逆序矩阵
print(x[::-1,::-1])
#4.3 降维访问
print(x[:,0]) #--> [1,4,7]
}
```

## Numpy数组的基本操作-数组重构

```python
{
import numpy as np
#1.使用reshape函数:改变数组维度，保持元素数量不变。
array=np.array([1,2,3,4,5,6])
array.reshape((2,3))#重构为2行3列
#2.使用np.newaxis增加一个维度
array=np.array([1,2,3,4,5,6])
col_vec=[:,np.newaxis]
'''
np.newaxis 放在哪个位置，就会给哪个位置增加维度
x[:, np.newaxis] ，放在后面，会给列上增加维度
x[np.newaxis, :] ，放在前面，会给行上增加维度
'''
}
```

## Numpy数组的基本操作-数组分割

```python
{
import numpy as np
#使用 np.split 进行通用分割
x=np.arange(10,90,10)
np.split(2,5)#在索引2和5之前进行分割
#使用 np.vsplit 进行垂直分割
m=np.arange(16).reshape(4,4)
upper,lower=np.vspilt(m,[2])
}
```

## Numpy数组基本操作-数组计算

- Numpy 的基础算术运算（加减乘除）是针对数组中每一个元素分别进行的。
- 使用逻辑运算符（如 >, <, ==）对数组进行比较时，会返回一个形状相同的布尔类型数组
- 使用 +=, \*=, /= 等操作符时，Numpy 会直接修改原数组的内容，而不会创建新的数组副本。
- 通用函数是 numpy 中的一类特殊函数，旨在对数组中的元素逐一进行操作，同时支持高效的向量化计算。具体的各种等效通用函数参见[Numpy官方文档](https://numpy.com.cn/doc/stable/reference/ufuncs.html)
- **指定维度的聚合(Axes)**
  axis 参数的作用：控制 Numpy 沿哪个轴进行操作。通常，指定的轴会被“压缩”消失，除非使用 keepdims=True
  ➢ axis=0: 沿着 “行”维度（纵向）操作，计算每列的统计值（针对二维数组，计算的是每列的统计值）
  ➢ axis=1: 沿着“列”维度（横向）操作，计算每行的统计值（针对二维数组，计算的是每行的统计值）
- **广播(Boardcasting Operation)**

```python
{
import numpy as np
'''
广播是 numpy 中处理数组运算的一种机制，用于处理不同形状的数组之间的运算。
它可以让形状不同的数组在特定规则下对齐，从而实现高效的矢量化计算，而无需显式地复制数据。
'''
a=np.array([1,2,3])
b=np.array([[10],[20],[30]])
c=a+b
print(f"Result: \n{c}")
}
```
