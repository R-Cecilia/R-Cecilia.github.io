---
title: "9. NumPy 数组：类型、创建与组合"
chapter_title: "NumPy 数组：类型、创建与组合"
weight: 9

date: 2026-05-02T11:12:00+08:00
lastmod: 2026-05-02T11:13:00+08:00

categories: ["Python"]
tags: ["NumPy", "数组创建", "连接", "堆叠"]
description: "NumPy 数组：类型、创建与组合学习笔记。"
url: "/post/py05-python中的numpy/"
---

## 基本介绍

- Numpy (Numerical Python) 是 Python 语言的一个扩展程序库，主要用于处理大型多维数组和矩阵运算。
- 它是许多高级数据科学库（如 Matplotlib, Pandas, Scikit-learn）的基础构建块 。
- 其核心是 ndarray 对象—— 一种存储同质数据类型的高性能n维数组。

## Numpy数组基础

### 数组的基本数据类型

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

### Numpy的基本操作-数组创建

#### 创建数组

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

#### 数组的连接(numpy.concatenate)

```python
{
import numpy as np
A = np.zeros(shape=(2,3))
B = np.ones(shape=(4,3))

C=np.concatenate([A,B])

print(f"Result:\n{C}")
}
```

#### 数组的堆叠(np.vstack/hstack)

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
