---
title: "26summer-w1-C++特性"

date: 2025-07-05T11:10:00+08:00
lastmod: 2025-07-05T13:10:00+08:00

categories: ["C++"]
tags: ["异常", "动态存储空间", "类和对象", "递归", "STL"]
description: "C++特性回顾(异常、动态存储空间分配、类和对象、递归、测试与调试、STL)"

cover: /images/cover13.png
---

## 一、C++特性

### 1.1 异常

#### 1.1.1 抛出异常

异常表示程序出现的错误信息。

```C++
#抛出一个类型为char*的异常
int abc(int a,int b,int c)
    {
        if(a<=0||b<=0||c<=0)
            throw "All paremeters should be > 0";
        return a+b*c;
    }
```

#### 1.1.2 处理异常

一段代码抛出的异常由包含这段代码的try块来处理。紧跟在try块后的是catch块。  
每一个catch块都有一个参数，参数的类型决定了这个catch块要捕捉的异常类型。

```C++
catch(char *e){}
#捕捉的异常类型是char*
catch(...){}
#捕捉所有异常
```

捕捉一个类型为char \*的异常

```C++
int main()
{
    try{cout<<abc(2,0,4)>>endl;}
    catch (char*e)
        {
            cout<<"An exception has been thrown">>;
            return 1;
        }
    return 0;
}
# abc抛出异常，函数计算与try块停止。异常被catch捕捉，进入catch块
```

### 1.2 动态存储空间分配

#### 1.2.1 操作符new

```C++
# C++操作符new用来进行动态存储分配或运行时的存储分配，它的值是一个指针，指向所分配空间。
```

#### 1.2.2 一维数组

数组的大小在编译时是未知的，它随着函数调用的变化而变化，因此，对这些数组只能进行动态存储分配。

```C++
#创建一个长度为n的一维浮点型数组
float* x=new float[n];
#操作符new为n个浮点数分配了存储空间，并返回第一个浮点数空间的指针。
#对每个数组元素的访问可以用x[0],x[1]...x[n-1]的形式。
```

#### 1.2.3 操作符delete

动态分配的存储空间不再需要时应该把它释放，释放的空间可重新用来动态分配。
操作符delete用来释放由操作符new所分配的空间。

```C++
#下列语句用来释放分配给*y和一维数组x的空间
delete y;
delete []x;
```

#### 1.2.4 二维数组

用动态空间分配的方法构建二维数组

```C++
#include <iostream>
using namespace std;

void make2darray(int ** &x,int numbersofRow,int numbersofColumns)
{//创建二维数组
    //创建行指针
    x = new int* [numbersofRow];

    //为每一行分配空间
    for(int i=0;i<numbersofRow;i++){
        x[i]=new int [numbersofColumns];
    }
}

void delete2darray(int ** &x,int numberofRow)
{
    //删除行数组空间
    for(int i=0;i<numberofRow;i++)
        delete [] x[i];
    //删除行指针
    delete []x;
    x=NULL;//放置用户访问已被释放的空间
}

int main()
{
    int**x;
    int r=5,c=5;
    try{make2darray(x,r,c);}
    catch(bad_alloc)
    {
        cout<<"could not create x"<<endl;
        exit(1);
    }
    delete2darray(x,c);
}
```

### 1.3 自有数据类型

#### 1.3.1 类和对象

- 通过C++的类结构(class)来定义自有数据类型。
- 类的成员声明有两部分:公有(public)和私有(private)
- 公有部分所声明的是用来操作类对象的成员函数，它们对于类的用户是可见的，是用户与类对象进行交互的唯一手段
- 私有部分是所声明的是用户不可见的数据成员(简单变量、数组以及其他可赋值结构)和成员函数。
- 通过公有和私有部分，我们让用户只看到它们需要看到的部分。

```C++
class currency
{
    public:
    //构造函数
    currency(unsigned long theDollars=0,unsigned int theCents=0);
    //析构函数
    ~currency(){}
    void setValue(unsigned long,unsigned int);

    private:
    unsigned long dollars;
    unsigned int cents;
};
```

#### 1.3.2 操作符重载

当一个类中若干个成员函数与C++标准操作符类似。例如，add实施的是+操作.使用这些标准C++操作符比定义新的成员函数更自然。为了使用操作符，进行操作符重载，它可以扩大C++操作符的应用范围，使其操作新的数据类型或类。

#### 1.3.3 友元和保护性类成员

在一些应用程序中，我们必须赋予别的类或者函数直接访问该类私有成员的权利，这就需要把这些类或者函数声明为该类的友元。

```C++
class currency
{
    //friend语句总是紧跟在类标题语句之后
    friend ostream& operator<<(ostream&,const currency&);
    public:
}
```

一个类A从另一个类B派生，A是派生类(derived class)，b是基类(base ckss).

```C++
    // 基类（父类）
    class base
    {
        public:
        int a();
        protected:
        int b();
    }

    // 派生类（子类）
    class derived : public base
    {
        public:
        int c();
    }

    derived D;
    D.a();//继承base
    D.c();//derived自己的
```

### 1.4 递归函数

```C++
//求n的阶乘
int factorial(int n)
{
    if (n==1)
    return 1;
    else
    return n*factorial(n-1);

}

int main()
{
    int n=3;
    cout<<factorial(n)<<endl;
    return 0;
}
```

```C++
//斐波那契数列求和
int fibonacci(int n)
{
    if (n==0)
    return 0;
    else if (n==1)
    return 1;
    else
    return fibonacci(n-1)+fibonacci(n-2);


}

int main()
{
    int n=3;
    cout<<fibonacci(n)<<endl;
    return 0;
}
```

```C++
//阿克曼函数(Ackerman's Function)
long long ackermann(int m, int n) {
    if (m == 0) {
        return n + 1;
    } else if (n == 0) {
        return ackermann(m - 1, 1);
    } else {
        return ackermann(m - 1, ackermann(m, n - 1));
    }
}

int main() {
    // 测试小值
    cout << "A(0, 3) = " << ackermann(0, 3) << endl;    // 4
    cout << "A(1, 4) = " << ackermann(1, 4) << endl;    // 6
    cout << "A(2, 5) = " << ackermann(2, 5) << endl;    // 13
    cout << "A(3, 3) = " << ackermann(3, 3) << endl;    // 61
    // cout << "A(4, 1) = " << ackermann(4, 1) << endl; // 会非常慢！
    return 0;
}
```

```C++
//最大公约数(Greatest Common Divisor)
int GCD(int x,int y)
{
    if (y==0)
    return x;
    else
    return GCD(y,x%y);
}
```

### 1.5 标准模板库(STL)

C++标准模板库(STL)是一个容器，适配器，迭代器，函数对象和算法合集。有效使用STL，应用程序的设计会简单许多。

### 1.6 测试与调试

设计测试数据的技术：

- 黑盒法:黑盒法主要考察函数的功能而非实际代码，I/O分类和因果图。
- 白盒法:白盒法基于代码来设计测试数据。对一个测试集的基本要求是使得程序的每一条语句都至少执行一次，即实现语句覆盖。
