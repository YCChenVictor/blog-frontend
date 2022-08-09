---
title: MySQL_1 (About TABLEs)
description: 'Insert data into TABLE:'
date: ''
categories: []
keywords: []
slug: ''
---

  

#### Insert data into TABLE:

INSERT INTO timeseries\_data\_stocks(name, ticker, introduction) VALUES('S&P\_500', '^GSPC'**, '**S&P 500 is a market-capitalization-weighted index of the 500 largest U.S. publicly traded companies by market value.')

INSERT INTO timeseries\_data\_stocks(name, ticker, introduction) VALUES('HANG\_SENG\_INDEX', '^HSI'**, '**The Hang Seng is a freefloat-adjusted market capitalization-weighted stock market index in Hong Kong.')

INSERT INTO timeseries\_data\_stocks(name, ticker, introduction) VALUES('TSEC\_weighted\_index', '^TWII'**, '**TSEC\_weighted\_index is capitalization-weighted index of all listed common shares traded on the Taiwan Stock Exchange.')

#### Setup relations between tables: (Use Foreign Key)

```
CREATE TABLE timeseries_data_prices(
```

```
customer_id INT,
```

```
amount DOUBLE,
```

```
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
```

```
);
```

#### Transfer Tables to other database: 

```
CREATE TABLE destination_db.my_table SELECT * FROM source_db.my_table;
```