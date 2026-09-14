---
title: "26fall-w1-Python基础"

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["基本数据类型", "四种数据容器", "基本逻辑语句", "字符串", "函数"]
description: "Python基础"

cover: /images/cover2.webp
---

# Python基础

## 1 基本数据类型、类型转换和输入输出

### 1.1 基本数据类型

int 整型
float 浮点型
str 字符串
bool 布尔型

### 1.2 类型转换

关键字+()
int("1") # 1
float(1) # 1.0
str(105) # "105"
bool(0) # Flase

### 1.3 print和input

print()可以有多个参数，自动用空格分隔，以换行结束
print("a","b","c") # a b c
print("a","b","c",sep="-") # a-b-c
print("Hello",end="!") # Hello!

格式化输出print-f

```py
name= "Tom"
score=95.5
print(f"My name is {name},My score is {score}")
print(f"My score is {score:.1f}")
```

input接受用户输入，其返回值一定是字符串，故如果需要用到非字符串数据类型，需要进行数据转换
height=float(input("Enter your height"))

## 2 条件判断语句if/elif/else

if 条件1:
pass # 条件1为True
elif 条件2:
pass # 条件2为True且条件1为Flase
else 条件3:
pass # 条件1和条件2为Flase

## 3 循环判断语句for/while/range

### 3.1 for循环

for 变量 in 可迭代对象: #循环体
pass

### 3.2 range

range()生成数字序列
range(start,stop,step) #起始、终点、步长（起始和步长可选）
range(5) # 0 1 2 3 4
range(2,6) # 2 3 4 5
range(5,0,-1) # 5 4 3 2 1

### 3.3 while

while 条件: #循环体
break # 跳出循环
conitnue # 进入下一次循环
else # 循环均不满足的时候执行

```py
numbers=[1,2,3,4,5]
for i in numbers:
    if i==6:
        print("找到了")
        break
else:
    print("未找到")
```

## 4 数据容器

### 4.1 列表list

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

### 4.2 元组tuple

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

### 4.3 字典dict

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

### 4.4 集合set

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

## 5 函数

### 5.1参数类型

```py
# 位置参数(必须参数)
def greet(name,age):
    pass

#默认参数
def greet(name,age=25):
    pass
greet("R",20)
# 注意：默认参数必须在非默认参数之后

#关键字参数
#使用关键字参数时。顺序可以改变
def greet(name,age=25):
    pass
greet(age=20,name="R")

#混合使用
greet("R",age=15)
#混合使用时，位置参数必须在关键字参数之前

#可变参数*args
#*args可以接受任意数量的参数
def all_sum(*args): #args是一个元组
    sum=0
    for num in args:
        sum+=num
    return sum

#关键字可变参数**kargs
def print_info(**kargs): #kargs是一个字典
    for key,value in kargs:
        print(f"{key}:{value}")

#参数混合使用
def complex_function(a, b, *args, c=10, d=20, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"c={c}, d={d}")
    print(f"kwargs={kwargs}")

complex_function(1, 2, 3, 4, 5, c=100, e=200, f=300)
# a=1, b=2
# args=(3, 4, 5)
# c=100, d=20
# kwargs={'e': 200, 'f': 300}
```

## 5.2 返回值

```py
#单个返回值
def square(x):
    result=x**2
    return result

#多个返回值
def get_min_max(numbers):
    return min(numbers), max(numbers)

min_num, max_num = get_min_max([5, 2, 8, 1, 9])
print(f"最小: {min_num}, 最大: {max_num}")  # 最小: 1, 最大: 9

result = get_min_max([5, 2, 8, 1, 9]) # 也可以接收为元组
print(result)  # (1, 9)

#无返回值,默认返回None
#可以提前返回
```

## 5.3 作用域

局部变量、全局变量、global声明全局变量、nonlocal嵌套函数中使用

## 5.4 Lambda函数

```py
lambda 参数 : 表达式

numbers = [3, 1, 4, 1, 5, 9, 2]
sorted_numbers = sorted(numbers, key=lambda x: -x)
print(sorted_numbers)  # [9, 5, 4, 3, 2, 1, 1]
```

## 5.5 函数的高级特性

### 5.5.1 递归函数

```py
#举例:计算阶乘

def factorial(x):
    if(x<=1)
        return 1
    return factorial(x-1)*x
```

### 5.5.2 装饰器(Decorator)

装饰器本质上是一个函数，它接收一个函数作为参数，并返回一个新的函数。给函数增加新功能，但不修改原函数的代码。

```py
import time

def timer_decorator(func):
    """计时装饰器"""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 耗时: {end - start:.4f}秒")
        return result
    return wrapper

@timer_decorator
def slow_function():
    time.sleep(1)
    return "完成"

result = slow_function()
# slow_function 耗时: 1.0001秒
print(result)  # 完成
```

### 5.5.3 文档字符串(Docstring)

函数的描述文档

```py
def calculate_area(length, width):
    """
    计算矩形的面积。

    参数:
        length (float): 矩形长度
        width (float): 矩形宽度

    返回:
        float: 矩形面积
    """
    return length * width

# 查看文档
print(calculate_area.__doc__)
help(calculate_area)
```

## 6 字符串

不可变，可迭代，有序

### 6.1 split()

分割字符串
无参-默认按空格分割
单参-以传入的作为分割点
双参-传入分割次数

```py
# 处理用户输入
user_input = input("请输入多个数字，用空格分隔: ")
numbers = [int(x) for x in user_input.split()]
print(f"数字列表: {numbers}")
print(f"总和: {sum(numbers)}")

# 解析日志
log = "2024-01-15 10:30:45 ERROR Database connection failed"
parts = log.split(" ", 3)
date = parts[0]
time = parts[1]
level = parts[2]
message = parts[3]
print(f"日期: {date}, 时间: {time}")
print(f"级别: {level}")
print(f"消息: {message}")
```

### 6.2 join()

join() 将可迭代对象（列表、元组等）中的字符串元素连接成一个字符串。

```py
# 生成 CSV 行
data = ["Alice", "25", "Beijing", "Engineer"]
csv_line = ",".join(data)
print(csv_line)  # Alice,25,Beijing,Engineer

# 生成 HTML 列表
items = ["苹果", "香蕉", "橙子"]
html = "<ul>" + "".join(f"<li>{item}</li>" for item in items) + "</ul>"
print(html)
# <ul><li>苹果</li><li>香蕉</li><li>橙子</li></ul>

# 文件路径拼接
path_parts = ["home", "user", "documents", "file.txt"]
path = "/".join(path_parts)
print(path)  # home/user/documents/file.txt
```

### 6.3 strip()

strip() 去除字符串两端的空白字符（或指定字符）.

```py
字符串.strip(字符)
字符串.lstrip(字符)  # 只去除左边
字符串.rstrip(字符)  # 只去除右边
# 默认去除空格、制表符、换行符

# 清理用户输入
username = input("请输入用户名: ").strip()
if username:
    print(f"欢迎，{username}!")
else:
    print("用户名不能为空")

# 处理文件读取
with open("data.txt") as f:
    for line in f:
        line = line.strip()  # 去除换行符
        if line:  # 跳过空行
            print(line)
```

### 6.4 replace()

replace() - 替换字符串

```PY
text = "  Hello, World!  "
# 多个操作链式调用
result = text.strip().replace("World", "Python").replace("Hello", "Hi")
print(result)  # Hi, Python!

# 实际应用：清理文本
def clean_text(text):
    """清理文本"""
    return (text.strip()
                .replace("\n", " ")
                .replace("\t", " ")
                .replace("  ", " "))  # 注意：这只替换一次双空格

text = "  Hello\n\tWorld  Python  "
cleaned = clean_text(text)
print(cleaned)
```

### 6.5 find()

find() 返回子字符串第一次出现的索引，找不到返回 -1。

```py
# 检查文件扩展名
filename = "document.pdf"
if filename.find(".pdf") != -1:
    print("这是PDF文件")
else:
    print("不是PDF文件")

# 更Pythonic的方式
if filename.endswith(".pdf"):
    print("这是PDF文件")

# 提取邮箱用户名
email = "alice@example.com"
at_pos = email.find("@")
if at_pos != -1:
    username = email[:at_pos]
    domain = email[at_pos+1:]
    print(f"用户名: {username}, 域名: {domain}")
```

### 6.6 example

```py
# 解析CSV行
def parse_csv_line(line):
    """解析CSV行"""
    return [field.strip() for field in line.split(",")]

csv_data = "Alice, 25, Beijing, Engineer"
fields = parse_csv_line(csv_data)
print(fields)  # ['Alice', '25', 'Beijing', 'Engineer']

# 生成CSV行
def to_csv_line(fields):
    """生成CSV行"""
    return ",".join(str(field) for field in fields)

data = ["Bob", 30, "Shanghai", "Doctor"]
csv_line = to_csv_line(data)
print(csv_line)  # Bob,30,Shanghai,Doctor
```
