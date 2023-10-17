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

#### reasoning

Wealth disparities, within the framework of Discounted Cash Flow (DCF) analysis, are a natural consequence of the diverse financial circumstances and investment strategies that individuals employ. DCF analysis involves estimating the present value of an investment's future cash flows, which can differ significantly from one person to another based on their unique financial situations and risk tolerance. These variations in expected cash inflow and outflow lead to wealth disparities, as different individuals may have distinct projections for their investment returns.

The concept of pareto efficiency provides a valuable lens through which to evaluate these wealth disparities. It asserts that an investment's cash flow is reasonable if it doesn't harm or negatively affect the financial well-being of others. In other words, as long as an individual's investment decisions do not impede the financial prospects of someone else, they can be considered reasonable. This principle acknowledges the inherent diversity in financial choices and investments, allowing individuals the freedom to pursue strategies that align with their goals and preferences.

Furthermore, wealth disparities can also be attributed to differences in risk tolerance and the sources of income for various individuals. Some may be willing to take on higher risks in pursuit of potentially greater returns, while others prioritize stability and lower-risk investments. This variation in risk profiles adds another layer of complexity to wealth disparities, as individuals make choices aligned with their comfort levels and financial objectives.

In conclusion, wealth disparities are reasonable within the context of DCF analysis, as they stem from the individuality of financial circumstances, risk preferences, and investment strategies. The principle of pareto efficiency affirms the reasonableness of these disparities, emphasizing that investment choices should not harm the financial well-being of others. The diversity in risk tolerance and income sources further contributes to the natural variability in wealth accumulation and investment outcomes.
