# Title

## Purpose

The internet is a system to connect all computers globally, mainly using internet protocol suite to communicate with all the objects in the network.

## Concept

### internet protocol suite

* foundation
  * Transmission Control Protocol (TCP)
  * Internet Protocol (IP)

A simple structure of TCP/IP is as follow:

![stack](assets/img/TCP_IP)

* Link layer: a computer (sender) want to send data to another computer (receiver), the sender will send electromagnetic signals. These signals walk through wired or wireless connections from sender to receiver.
* Network layer (IP): Once the number of computers grow, we need to specify the address to identify which one is receiver. The address for identification is IP address. We called all the computer in this network **nodes**.

Now the network looks like
![stack](assets/img/internet_network)

* Transport layer (TCP): In the network plot above, if a sender wants to send signal to another computer, there are many path for signal to walk.
* **Packet Switching**: The concept of packet switching is that it **breaks down the data** into small pieces and transfer these pieces with any possible routes to the destination and reassemble these pieces to show the complete data to the users at the destination.

At the moment when the data is going to be sent, the available routes may be as follow:
![stack](assets/img/network_routes)

1. If there is arrows between nodes, then there is connection between the two computers and we call it the **path**.
2. The number near the arrow is the cost to send a unit of data from sender to receiver.

Based on these two concepts, we can define algorithms such as walk through minimum path and walk through minimum cost.

**TCP is used to make sure the packets are truly transported:**

1. sender want to send data to receiver
2. the data being decomposed into packets
3. algorithm pops up to determine how packets being sent
4. the packets walk through the routes in networks and being reassembled at destination
5. if the receiver did not receive the data, then tell sender to send again.

### Application Layer

After the data arrives at destination, the receiver use Hypertext Transfer Protocol, abbreviated to [HTTP]({{site.baseurl}}/internet/2021/04/09/http.html), to translate the data from sender and then the page will show up on the receiver’s browsers.

### Networking Metrics

* Bandwidth:
  * Purpose: Determines the maximum data transfer rate of a network connection.
  * Concept: Measures the capacity of a network to transmit data, typically expressed in bits per second (bps).
  * Example: A network connection with a bandwidth of 100 Mbps can transfer up to 100 megabits of data per second.
* Latency:
  * Purpose: Measures the time it takes for data packets to travel from source to destination.
  * Concept: Represented in milliseconds (ms), it indicates the delay or responsiveness of the network.
  * Example: A network with a latency of 50 ms means it takes 50 milliseconds for data to travel from one point to another.
* Packet Loss:
  * Purpose: Indicates the percentage of packets that fail to reach their destination.
  * Concept: Caused by various factors like network congestion or faulty equipment.
  * Example: If 5 out of 100 packets fail to reach their destination, the packet loss rate is 5%.
* Jitter:
  * Purpose: Measures the variation in latency over time.
  * Concept: High jitter can lead to inconsistent or poor-quality audio and video streams.
  * Example: If one packet experiences a delay of 30 ms and the next 50 ms, the jitter is 20 ms.
* Throughput:
  * Purpose: Indicates the actual data transfer rate over a network.
  * Concept: Measured in bits per second (bps).
  * Example: A network with a throughput of 50 Mbps can transfer 50 megabits of data per second.
* Round-trip time (RTT):
  * Purpose: Measures the time for a packet to travel from source to destination and back.
  * Concept: Often used in network diagnostics.
  * Example: If the RTT is 100 ms, it takes 50 ms for the packet to reach the destination and another 50 ms to return.
* Network Availability:
  * Purpose: Represents the percentage of time a network is operational and accessible.
  * Concept: Critical for measuring network reliability and downtime.
  * Example: A network with 99% availability is operational for 99% of the time.
* Network Utilization:
  * Purpose: Measures the percentage of available network resources being used.
  * Concept: Indicates network efficiency and potential bottlenecks.
  * Example: If 50% of network resources are being utilized, the network utilization is 50%.
* Error Rate:
  * Purpose: Measures the frequency of errors or corrupted data packets.
  * Concept: High error rates can indicate network issues or transmission medium problems.
  * Example: If 10 out of 100 packets are corrupted, the error rate is 10%.
* Quality of Service (QoS):
  * Purpose: Ensures that critical applications receive necessary resources and bandwidth for optimal performance.
  * Concept: Prioritizes certain types of traffic over others.
  * Example: Video conferencing traffic might be given higher priority than file downloads to ensure smooth communication.

## Reference

[Internet - Wikipedia](https://en.wikipedia.org/wiki/Internet)
[Transmission Control Protocol - Wikipedia](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
[The Internet protocol suite (article) | Khan Academy](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:the-internet-protocol-suite/a/the-internet-protocols)

[**What is Packet Switching? Definition & FAQs | Avi Networks**  
_Back to Technical Glossary Packet Switching transmits data across digital networks by breaking it down into blocks or…_avinetworks.com](https://avinetworks.com/glossary/packet-switching/ "https://avinetworks.com/glossary/packet-switching/")[](https://avinetworks.com/glossary/packet-switching/)

[http://www2.cs.uidaho.edu/~krings/CS420/Notes-F16/420-16-18-DCC10-Chap-19.pdf](http://www2.cs.uidaho.edu/~krings/CS420/Notes-F16/420-16-18-DCC10-Chap-19.pdf)

[https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/hypertext-transfer-protocol-http](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/hypertext-transfer-protocol-http)