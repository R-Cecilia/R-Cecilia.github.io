---
title: "2. Python 容器：列表、元组、字典与集合"
chapter_title: "Python 容器：列表、元组、字典与集合"
weight: 2

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["列表", "元组", "字典", "集合"]
description: "Python 容器：列表、元组、字典与集合学习笔记。"
---

## 数据容器

### 列表list

list 表示[] 可存储不同类型的数据

```py
list1=[0,1,2,3,4,5]

#查
#索引访问
print(list1[0]) #第一个
print(list1[-1]) #最后一个
#索引范围访问
print(list1[1:3]) # [1,2]
print(list1[:4]) # [0,1,2,3]
print(list1[3:]) # [3,4,5]
print(list1[::2]) # [0,2,4]
print[list(-3:)] # [3,4,5]

#增
list1=[0,1,2,3,4,5]
#append()
list1.append(6) #末尾＋6
#insert
list1.insert(1,6) #索引1的位置增加一个元素6
#extend
list1.extend(6,7) #末尾增加多个元素
#运算符 +
fruits=["apple","pear"]
all_fruits=fruits+"grape"
print(all_fruits) #["apple","pear","grape"]

#删
list1=[0,1,2,3,4,5,6]
# remove 删第一个匹配元素
list1.remove(1) # [0,2,3,4,5,6]
# pop 删相关索引，同时返回删除的元素
removed=list1.pop(3) # removed=4 [0,2,3,5,6]
# del 删除指定索引元素或者整个列表
del list1[0] #[2,3,5,6]
# clear 清空列表
list1.clear() #[]

#改
list1=[1,2,3,4,5]
#按索引改
list1[0]=0 # 0,2,3,4,5
#按切片改
list1[1:3]=[20,30] # 0,20,30,4,5
#更改整个列表
list1=[10,20,30] # 10,20,30

# 一些进阶用法
# sort排序，默认升序
numbers=[9,8,7,6,4,3,1,0]
numbers.sort() # 0,1,3,4,5,6,7,8,9
#参数reverse=True时降序排列

#关于参数key:key 参数的作用是：告诉 sort() 按照什么标准来排序。
# sort 会：
# 1. 对每个元素应用 key 函数
# 2. 得到每个元素的"排序键值"
# 3. 根据这些键值进行排序

#sorted改新列表
original=[3,1,2]
new=sorted(original) #[1,2,3]

#reverse反转列表
original.reverse() #[2,1,3]
```

### 元组tuple

元组不可变，有序集合 用()表示

```py
person = ("Alice", 25, "Beijing", "Engineer")

# 访问元素（同列表）
print(person[0])     # Alice
print(person[-1])    # Engineer

# 切片（同列表）
print(person[1:3])   # (25, 'Beijing')

# 查找
print(person.index(25))   # 1
print(person.count("Alice"))  # 1

# 解包（unpacking）
name, age, city, job = person
print(name)  # Alice
print(age)   # 25
print(city)  # Beijing
print(job)   # Engineer

# 部分解包
first, *rest = person
print(first)  # Alice
print(rest)   # [25, 'Beijing', 'Engineer']
```

### 字典dict

dict key ：value {}

```py
#创建
empty={}
empty=dict()
#直接创建
person1={"Name": "X"}
#dict创建
person2=dict(Name="X")
#元组列表创建
person3=dict([("name","X"),("age",21)])
#使用zip()
key=["a","b","c"]
value=[1,2,3]
dict1=dict(zip(key,value))

#查
dict1={"name":"R","age":20,"country":"China"}
#通过Key访问
print(dict1["name"])
#get(key不存在的时候返回None)
print(dict1.get("age"))
print(dict1.get("region","Unknown")) #不存在时返回Unknown默认值

#获取所有的Key,Value,Key:Value
dict1.key()
dict1.value()
dict1.items()

#增
#直接赋值
dict1["city"]="Beijing"
#setfault():key不存在时返回默认值
email=dict1.setdefault("email":"123456@example.com")
#update批量更新或添加
dict1.update({"name":"X","age":21})

#改
#直接赋值
#update()修改

#删
#pop删除指定键值对
age=dict1.pop("age")
#popitem删除最后一个键值对
last_item=dict1.popitem()
#del 删除指定key-value
del dict1["name"]
#clear清空dict
dict1.clear()
```

### 集合set

无序，不重复 {} set() 空{}是dict

```py
#一些应用场景
#去重
numbers=[1,2,3,3,4,4,4,5,5,6,7,8,8]
unique_numbers=list(set(numbers)) #[1,2,3,4,5,6,7,8]
#列表交集
list1=[1,2,3,4]
list2=[3,4,5,6]
common=list(set(list1) & set(list2)) #[3,4]
```
