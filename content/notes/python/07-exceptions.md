---
title: "7. Python 异常处理：捕获与抛出"
chapter_title: "Python 异常处理：捕获与抛出"
weight: 7

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["异常处理", "try", "raise"]
description: "Python 异常处理：捕获与抛出学习笔记。"
---

## 异常处理

### 基本语法链

try-except-else-finally

```py
try:
    # 可能出错的代码
    pass
except SomeException:
    # 处理特定异常
    pass
else:
    # 没有异常时执行
    pass
finally:
    # 无论是否异常都执行
    pass
```

### raise

主动抛出异常

```py
#基本用法
if age<0 or age > 150 :
    raise ValueError(f"年龄超出合理范围")

#重新抛出异常
try:
    # 一些操作
    raise ValueError("原始错误")
except ValueError as e:
    print(f"记录日志: {e}")
    raise  # 重新抛出相同的异常

#自定义异常
class InsufficientFundsError(Exception):
    """余额不足异常"""
    pass

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(f"余额不足：需要 {amount}，当前 {self.balance}")
        self.balance -= amount
        return amount

# 使用
account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"交易失败: {e}")
```
