---
title: "4. C++ 递归：阶乘、斐波那契与最大公约数"
chapter_title: "C++ 递归：阶乘、斐波那契与最大公约数"
weight: 4

date: 2026-07-05T11:10:00+08:00
lastmod: 2026-07-05T13:10:00+08:00

categories: ["C++"]
tags: ["递归", "阶乘", "斐波那契", "Ackermann", "最大公约数"]
description: "C++ 递归：阶乘、斐波那契与最大公约数学习笔记。"
---

## 递归函数

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
