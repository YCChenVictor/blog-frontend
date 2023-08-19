# Title

## Purpose

Testing in software development is crucial to identify and rectify defects, ensuring the quality and reliability of the final product.

## Concept

### Random Crushes

The random crushes may be caused by

* Share instance: Causes the test runs on wrong instance and randomly get wrong result
* Caches: Causes the test to read old values instead of the amended one
* Not unit enough: The test actually needs to following certain steps to get the desired result, which means it may break with random order tests
* Race conditions: When multiple processes change variable values at the same time, without correct order, it causes different results, causing random crush
* Memory leaks: When memory management system did not release unused resources, it may cause test system to break, causing random crush
* Compatibility issues: For example, it works on chrome but never works on IE
* Insufficient error handling: Sometimes, we did not write method to handle errors and under certain circumstances, errors occur. Because we did not handle errors, we cannot identify them and the test crushes.
