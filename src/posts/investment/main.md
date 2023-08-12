# Title

## Purpose

Learning about investment is crucial for individuals to effectively grow their wealth and secure their financial future.

## Concept

DCF (Discounted Cash Flow) is a financial valuation method used to determine the present value of an investment's future cash flows.

$$DCF = C_0 + C_1/(1+r_1) + C_2/(1+r_2)^2 + ... + C_n/(1+r_n)^n + ...$$

where

* $$r_i$$ is the rate of return of the US treasury bound (non-risk return)
* $$C_i$$ is the certain amount of net cash inflow (cash inflow - cash outflow) on period i

The expected investment returns can be calculated as

$$E(DCF) = E(C_0) + E(C_1)/(1+r_1) + E(C_2)/(1+r_2)^2 + ... + E(C_n)/(1+r_n)^n + ...$$

Here I move the risk in net cash inflow, letting me keep using the non-risk rate of return as discount rate; for example, on period 1, I have 20% to have 100, 60% to have 150, and 20% to have 200, then E(C_1) = 150 rather than some certain value such as 160 and increase the discount rate; for example, 6%, to consider the risk. That is,

$$E(DCF) = C_0 + C_1/(1+r_1+g_1) + C_2/(1+r_2+g_2)^2 + ... + E(C_n)/(1+r_n+g_n)^n + ...$$

or

$$E(DCF) = C_0 + C_1/(1+r_1)(1+g_1) + C_2/(1+r_2)(1+g_2)^2 + ... + E(C_n)/(1+r_n)(1+g_n)^n + ...$$

### Wealth disparities

Given DCF, there must be different DCF outcomes on different people. The problem lands on

* whether expected cash inflow is reasonable
* whether expected cash outflow is reasonable

The concept of pareto efficiency explains clearly that if the cash flow will not cause damage to other's cash flow, then it is reasonable.
