---
title: "Python数据容器"

date: 2025-05-01T11:10:00+08:00
lastmod: 2025-05-01T11:10:00+08:00

categories: ["Python"]
tags: ["Python", "数据容器"]
description: "Python相关的列表、元组、字符串、集合和字典等数据容器"

cover: /images/cover4.webp
---

# Python数据容器

## 1. 列表(list)

```python
{
'''list的常用方法'''
my_list = [1, 2, 3, 4, 5]
#1 查询元素-index方法返回列表中第一个匹配项的索引，如果没有找到匹配项，则会引发 ValueError 异常。
print(my_list.index(3))  # 输出: 2
#print(my_list.index(6))  # 输出: ValueError: 6 is not in list

#2 修改元素-修改列表中某一项的值
my_list[1]=10
print(my_list[1])# 输出: 10

#3 插入元素-insert方法在指定位置插入一个元素 insert(index, element)
my_list.insert(1,5)
print(my_list) # 输出: [1, 5, 10, 3, 4, 5]


#4 追加元素-append方法在列表末尾添加单个元素
my_list.append(6)
print(my_list) # 输出: [1, 5, 10, 3, 4, 5, 6]

#5 追加多个元素-extend方法在列表末尾一次性追加另一个序列中的多个值
my_list.extend([7, 8, 9])
print(my_list) # 输出: [1, 5, 10, 3, 4, 5, 6, 7, 8, 9]

#6.1 删除元素-del+列表[下标索引]
del my_list[1]
print(my_list) # 输出: [1, 10, 3, 4, 5, 6, 7, 8, 9]

#6.2 删除元素-pop方法删除列表中指定位置的元素，并返回该元素的值，如果没有指定位置，则默认删除最后一个元素。
removed_element = my_list.pop(2)
print(removed_element) # 输出: 3
print(my_list) # 输出: [1, 10, 4, 5, 6, 7, 8, 9]

#6.3 删除元素-remove方法删除列表中第一个匹配项的值，如果没有找到匹配项，则会引发 ValueError 异常。
my_list.remove(10)
print(my_list) # 输出: [1, 4, 5, 6, 7, 8, 9]

#7 统计元素出现次数-count方法返回列表中某个元素出现的次数。
count = my_list.count(5)
print(count) # 输出: 1

#8 统计列表中有多少元素-len方法返回列表中元素的数量。
length = len(my_list)
print(length) # 输出: 7

#9 清空列表-clear方法删除列表中的所有元素，使列表变为空列表。
my_list.clear()
print(my_list) # 输出: []

#10 通过while和for循环遍历列表,实现对列表中每个元素的访问和操作。
my_list = [1, 2, 3, 4, 5]
i=0
while i<len(my_list): #循环终止条件是i不再小于列表长度
    print(my_list[i]) #对列表中的每个元素进行访问和操作
    i+=1
#或者
for i in my_list:
    print(my_lsit[i])

#11 sort() 函数用于对原列表进行排序，如果指定参数，则使用比较函数指定的比较函数。
my_list = [5, 2, 9, 1, 5, 6]
my_list.sort()
print(my_list) # 输出: [1, 2, 5, 5, 6, 9]
#key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
#reverse -- 排序规则，reverse = True 降序， reverse = False 升序（默认）

#12 reverse() 函数用于将列表中的元素反转。
my_list = [1, 2, 3, 4, 5]
my_list.reverse()
print(my_list) # 输出: [5, 4, 3, 2, 1]
}
```

## 2. 元组(tuple)

```python
{
    '''tuple的常用方法,定义后不可修改,用法与list类似'''
my_tuple = (1, 2, 3, 4, 5)#当元组中只有一个元素时，需要在元素后面添加逗号，例如：my_tuple = (1,)。
#1 查询元素-index方法返回元组中第一个匹配项的索引，如果没有找到匹配项，则会引发 ValueError 异常。
print(my_tuple.index(3))  # 输出: 2
#print(my_tuple.index(6))  # 输出: ValueError: 6 is not in tuple

#2 统计元素出现次数-count方法返回元组中某个元素出现的次数。
count = my_tuple.count(5)
print(count) # 输出: 1

#3 统计元组中有多少元素-len方法返回元组中元素的数量。
length = len(my_tuple)
print(length) # 输出: 5
'''
注意事项：
1.修改元组中的元素会引发 TypeError 异常，因为元组是不可变的。
my_tuple[1]=10 # 输出: TypeError: 'tuple' object does not support item assignment
2.当元组中有嵌套的可变对象（如列表）时，可以修改嵌套的可变对象，但不能修改元组本身。
'''
}
```

### 补充

list和tuple总结: 1.可以容纳多个数据。2.支持不同类型数据的混装。3.数据是有序储存的，可以通过下标索引访问。4.允许重复数据的存在。5.支持for循环。
6.tuple定义后不可修改，而list定义后可以修改。

## 3.字符串(string)

```python
{
    '''字符串的常见用法'''
my_str="Hello, World!"
#1 字符串可以和列表一样使用下标索引访问字符串中的每个字符。
print(my_str[0]) # 输出: H
print(my_str[7]) # 输出: W
#2 字符串是一个不可变的序列类型，定义后不能修改字符串中的字符。
#my_str[0]="h" # 输出: TypeError: 'str' object does not support item assignment

#3.1 查询字符串中某个字符或子字符串的位置-index方法返回字符串中第一个匹配项的索引，如果没有找到匹配项，则会引发 ValueError 异常。
print(my_str.index("o")) # 输出: 4

#3.2 find方法返回字符串中第一个匹配项的索引，如果没有找到匹配项，则返回 -1。
print(my_str.find("o")) # 输出: 4

#4 replace方法返回一个新的字符串，其中所有匹配项都被替换为指定的字符串。
new_str = my_str.replace("World", "Python")#注意：replace方法不会修改原字符串，而是返回一个新的字符串。
print(new_str) # 输出: Hello, Python!

#5 split方法将字符串分割成一个列表，默认以空格为分隔符。
my_str2 = "Hello, World! Welcome to Python."
split_str = my_str2.split() #默认以空格为分隔符
print(split_str) # 输出: ['Hello,', 'World!', 'Welcome', 'to', 'Python.']

#6 strip方法返回一个新的字符串，其中删除了字符串开头和结尾的指定字符（默认为空格）。
my_str3 = "   Hello, World!   "
stripped_str = my_str3.strip()
#默认删除字符串开头和结尾的空格,如果要删除其他字符，可以在strip方法中指定。如果是123abc123，则可以使用my_str3.strip("123")来删除字符串开头和结尾的数字1、2、3。
#lstrip方法删除字符串开头的指定字符，rstrip方法删除字符串结尾的指定字符。
print(stripped_str) # 输出: Hello, World!

#7 count方法返回字符串中某个字符或子字符串出现的次数。
count = my_str.count("o")
print(count) # 输出: 2

#8 len方法返回字符串中字符的数量。
length = len(my_str)
print(length) # 输出: 13

#9 upper and lower方法分别返回一个新的字符串，其中所有字符都转换为大写或小写。
upper_str = my_str.upper()
lower_str = my_str.lower()
print(upper_str) # 输出: HELLO, WORLD!
print(lower_str) # 输出: hello, world!

#10 join方法将一个可迭代对象中的字符串连接成一个新的字符串，使用指定的分隔符。
my_list = ["Hello", "World", "Python"]
joined_str = " ".join(my_list) #使用空格作为分隔符连接列表中的字符串
print(joined_str) # 输出: Hello World Python

#11 strip方法返回一个新的字符串，其中删除了字符串开头和结尾的指定字符（默认为空格）。
my_str4 = "   Hello, World!   "
stripped_str2 = my_str4.strip()
print(stripped_str2) # 输出: Hello, World!

'''
string总结:
1.只可以储存字符串。
2.长度任意，取决于内存大小。
3.字符串是有序储存的，可以通过下标索引访问。
4.允许重复字符串的存在。
5.内容不可以修改。
6.支持for循环。
'''
}
```

## 4. 集合(set)

```python
{
    '''集合的常见用法'''
#1 定义集合-使用花括号{}或set()函数定义集合，集合中的元素是无序的、不可重复的。
my_set = {1, 2, 3, 4, 5}

#2 添加元素-add方法在集合中添加一个元素，如果元素已经存在，则不会添加。
my_set.add(6)
print(my_set) # 输出: {1, 2, 3, 4, 5, 6}

#3 删除元素-remove方法在集合中删除一个元素，如果元素不存在，则会引发 KeyError 异常。
my_set.remove(3)
print(my_set) # 输出: {1, 2, 4, 5, 6}

#4 pop方法在集合中删除一个随机元素，并返回该元素的值，如果集合为空，则会引发 KeyError 异常。
removed_element = my_set.pop()
print(removed_element) # 输出: 1（随机删除的元素）

#5 clear方法删除集合中的所有元素，使集合变为空集合。
my_set.clear()
print(my_set) # 输出: set()

#6 difference方法返回一个新的集合，包含在第一个集合中但不在第二个集合中的元素。
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
difference_set = set1.difference(set2)
print(difference_set) # 输出: {1, 2, 3}

#7 difference_update方法在第一个集合中删除与第二个集合中相同的元素。
set1.difference_update(set2)
print(set1) # 输出: {1, 2, 3}\

#8 union方法返回一个新的集合，包含在第一个集合和第二个集合中的所有元素。
set1 = {1, 2, 3}
set2 = {4, 5, 6}
union_set = set1.union(set2)
print(union_set) # 输出: {1, 2, 3, 4, 5, 6}

#9 len方法返回集合中元素的数量。
set1 = {1, 2, 3}
length = len(set1)
print(length) # 输出: 3

#10 集合的计算-集合支持数学上的集合运算，如交集、并集、差集等。
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
intersection_set = set1.intersection(set2)  # 交集
union_set = set1.union(set2)  # 并集
difference_set = set1.difference(set2)  # 差集
print(intersection_set) # 输出: {4, 5}
print(union_set) # 输出: {1, 2, 3, 4, 5, 6, 7, 8}
print(difference_set) # 输出: {1, 2, 3}


'''
集合总结:
1.可容纳多个数据。
2.支持不同类型数据的混装。
3.数据是无序储存的，不能通过下标索引访问。
4.不允许重复数据的存在。
5.可以修改。
6.支持for循环。
'''
}
```

## 5. 字典(dict)

```python
{
    '''字典的常见用法'''
#1 定义字典-使用花括号{}定义字典，字典中的元素是无序的、以键值对的形式存储的。(字典是基于Key-Value的映射关系来存储数据的)
my_dict = {"name": "Alice", "age": 30, "city": "New York"}
my_dict2 = dict(name="Bob", age=25, city="Los Angeles") #使用dict()函数定义字典
#空字典my_dict={} or my_dict=dict()

#2.1 访问元素-通过键访问字典中的值。
print(my_dict["name"]) # 输出: Alice
'''注意事项
1.Key和Value可以是任意数据类型，但Key必须是不可变类型（如字符串、数字、元组），Value可以是任意类型。
2.字典内Key是唯一的，不能重复。如果定义字典时使用了重复的Key，后面的值会覆盖前面的值。
3.字典不用下标索引访问，而是通过Key来访问对应的Value。'''

#2.2 get方法通过键访问字典中的值，如果键不存在，则返回指定的默认值（默认为None）。
print(my_dict.get("name")) # 输出: Alice

#3 修改元素-通过键修改字典中某一项的值。
my_dict["age"] = 31
print(my_dict["age"]) # 输出: 31

#4.1 添加元素-通过键添加一个新的键值对。
my_dict["country"] = "USA"
print(my_dict) # 输出: {'name': 'Alice', 'age': 31, 'city': 'New York', 'country': 'USA'}

#4.2 update方法通过另一个字典或可迭代对象中的键值对来更新当前字典。
my_dict.update({"name": "Charlie", "age": 28})
print(my_dict) # 输出: {'name': 'Charlie', 'age': 28, 'city': 'New York', 'country': 'USA'}

#4.3 setdefault方法返回指定键的值，如果键不存在，则将该键与指定的默认值添加到字典中。
my_dict.setdefault("hobby", "reading")
print(my_dict) # 输出: {'name': 'Charlie', 'age': 28, 'city': 'New York', 'country': 'USA', 'hobby': 'reading'}

#5 删除元素-del+字典[Key] or pop方法通过键删除字典中的一个键值对，并返回该键对应的值。
removed_value = my_dict.pop("city")
print(removed_value) # 输出: New York

#6 clear方法删除字典中的所有键值对，使字典变为空字典。
my_dict.clear()
print(my_dict) # 输出: {}

#7.1 keys方法返回一个包含字典中所有键的视图对象。
my_dict = {"name": "Alice", "age": 30, "city": "New York"}
keys = my_dict.keys()
print(keys) # 输出: dict_keys(['name', 'age', 'city'])
print(type(keys)) # 输出: <class 'dict_keys'>
#keys的作用：通过遍历key从而遍历Value

#7.2 values方法返回一个包含字典中所有值的视图对象。
values = my_dict.values()
print(values) # 输出: dict_values(['Alice', 30, 'New York'])

#7.3 items方法返回一个包含字典中所有键值对的视图对象，每个键值对以元组的形式表示。
items = my_dict.items()
print(items) # 输出: dict_items([('name', 'Alice'), ('age', 30), ('city', 'New York')])

#8 len方法返回字典中键值对的数量。
length = len(my_dict)
print(length) # 输出: 3

#9 in运算符检查字典中是否存在指定的键。
print("name" in my_dict) # 输出: True
print("country" in my_dict) # 输出: False

'''字典总结:
1.可以容纳多个数据。
2.支持不同类型数据的混装。
3.每一份数据是Key-Value对形式存储的，通过Key访问对应的Value。
4.Key必须是不可变类型且唯一，Value可以是任意类型且允许重复。
5.不支持下标索引访问，可以修改。(增加、更新和删除键值对)
6.支持for循环，但不支持while循环。
'''
}
```

## 6. 切片

```python
{
   '''数据容器的切片'''
#语法：序列[起始索引:结束索引:步长]，其中起始索引默认为0，结束索引默认为序列的长度，步长默认为1。
#表示从起始索引开始，按照步长的方式访问序列中的元素，直到结束索引之前的元素。（不包含结束索引的元素）
my_list = [1, 2, 3, 4, 5]
sliced_list = my_list[1:4] #切片操作返回一个新的列表，包含从索引1到索引3的元素（不包含索引4的元素）。
print(sliced_list) # 输出: [2, 3, 4]
# 补充：字符串反转:my_str = "Hello, World!"
reversed_str = my_str[::-1] #使用切片操作来反转字符串，其中起始索引和结束索引都省略，步长为-1，表示从字符串的末尾开始以相反的顺序访问字符串中的字符。
print(reversed_str) # 输出: !dlroW ,olleH
     }
```
