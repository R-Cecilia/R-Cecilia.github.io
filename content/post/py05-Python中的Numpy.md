---
title: "py05-Numpy的介绍和使用"

date: 2025-05-02T11:12:00+08:00
lastmod: 2025-05-02T11:13:00+08:00

categories: ["Python"]
tags: ["Python", "Numpy"]
description: "Python中经典数据处理包Numpy的一些用法"
cover: /images/cover10.webp
---

# Python中的Numpy

## 1. 基本介绍

- Numpy (Numerical Python) 是 Python 语言的一个扩展程序库，主要用于处理大型多维数组和矩阵运算。
- 它是许多高级数据科学库（如 Matplotlib, Pandas, Scikit-learn）的基础构建块 。
- 其核心是 ndarray 对象—— 一种存储同质数据类型的高性能n维数组。

## 2. Numpy数组基础

### 2.1 数组的基本数据类型

- ➢ 数组有类型：np.uint、np.int、np.float 、np.bool 、np.complex 、np.str 、 np.complex、np.datetime
- ➢ 数组中的每个元素都存在且类型相同
- ➢ np.ndim，np.shape，np.size，
  np.dtype访问数组的维度，形状，
  元素个数，数据类型

```python
{
import numpy as np
a=np.array([[1,2,3],[4,5,6],[7,8,9]],dtype=np.float32)
print(f"维度是{a.ndim}")
print(f"形状是{a.shape}")
print(f"个数是{a.size}")
print(f"类型是{a.dtype}")
}
```

### 2.2 Numpy的基本操作-数组创建

#### 2.2.1 创建数组

```python
{
import numpy as np
np.array([1,2,3,4]) #用列表创建一个一维数组
np.array([[1,2,3],[4,5,6]])#用列表创建一个二维数组
np.zeros(shape=(2,3))#初始化一个shape大小的全零数组
np.ones(shape=(1,2))#初始化一个shape大小的全1数组
np.empty(shape=(3,3))#初始化一个shape大小的全空数组
b=np.random.randint(10,size=(3,3))#初始化一个范围从0到10的随机整数数组
print(b)
np.random.rand(2,3)#初始化一个数据范围从0到1的随机数组
np.linspace(1,10,10)#初始化一个从1开始到10结束共有10个元素的数组
np.arange(10,16,2)#初始化一个从10开始到16结束(不包含16)的间隔为2的数组
}
```

#### 2.2.2 数组的连接(numpy.concatenate)

```python
{
import numpy as np
A = np.zeros(shape=(2,3))
B = np.ones(shape=(4,3))

C=np.concatenate([A,B])

print(f"Result:\n{C}")
}
```

#### 2.2.3 数组的堆叠(np.vstack/hstack)

```python
{
import numpy as np
C = np.ones((2,2))
D = np.random.randint(10,size=(2,2))
#竖向堆叠(Vertical Stack)
V_S=np.vstack((C,D))
#横向堆叠(Horizontioal Stack)
H_S=np.hstack((C,D))
#深度堆叠(Depth Stack)
D_S=np.dstack((C,D))
print(f"Vertical Stack: \n{V_S}")
print(f"Horizentional Stack: \n{H_S}")
print(f"Depth Stack: \n{D_S}")

}
```

### 2.3 Numpy数组的访问

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

### 2.4 Numpy数组的基本操作-数组重构

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

### 2.5 Numpy数组的基本操作-数组分割

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

### 2.6 Numpy数组基本操作-数组计算

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
